import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { ConversionSettings, ImageFileItem, MarginType, Orientation, PageSize } from '../types';

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const PAGE_DIMENSIONS_MM: Record<Exclude<PageSize, 'fit'>, { width: number; height: number }> = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 },
  legal: { width: 215.9, height: 355.6 },
  executive: { width: 184.1, height: 266.7 }
};

const MARGIN_VALUES_MM: Record<MarginType, number> = {
  none: 0,
  small: 5,
  medium: 12,
  large: 20
};

/**
 * Helper to read a File as a base64 Data URL
 */
function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error(`FileReader error on "${file.name}"`));
      reader.onabort = () => reject(new Error(`FileReader aborted on "${file.name}"`));
      reader.readAsDataURL(file);
    } catch (e) {
      reject(e);
    }
  });
}

interface LoadedImageResult {
  source: CanvasImageSource;
  width: number;
  height: number;
  cleanup?: () => void;
}

function loadHtmlImage(url: string): Promise<LoadedImageResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (url.startsWith('http://') || url.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      resolve({
        source: img,
        width: img.naturalWidth || img.width || 800,
        height: img.naturalHeight || img.height || 600
      });
    };
    img.onerror = (e) => {
      reject(new Error(`Failed to load image element from source: ${typeof e === 'string' ? e : 'network or format error'}`));
    };
    img.src = url;
  });
}

async function loadImageSource(item: ImageFileItem): Promise<LoadedImageResult> {
  const fileBlob = item.blob || item.file;

  // Strategy 1: Native createImageBitmap (fastest, most robust for Android camera JPGs / mobile file tokens)
  if (typeof window !== 'undefined' && typeof window.createImageBitmap === 'function' && fileBlob) {
    try {
      const bitmap = await createImageBitmap(fileBlob);
      if (bitmap && bitmap.width > 0 && bitmap.height > 0) {
        return {
          source: bitmap,
          width: bitmap.width,
          height: bitmap.height,
          cleanup: () => {
            try {
              bitmap.close();
            } catch {
              // ignore
            }
          }
        };
      }
    } catch {
      // Fall through to next strategy
    }
  }

  // Strategy 2: In-memory ArrayBuffer -> Fresh Blob URL
  if (item.file) {
    try {
      const arrayBuffer = await item.file.arrayBuffer();
      if (arrayBuffer && arrayBuffer.byteLength > 0) {
        const freshBlob = new Blob([arrayBuffer], { type: item.file.type || 'image/jpeg' });
        const freshUrl = URL.createObjectURL(freshBlob);
        try {
          const loaded = await loadHtmlImage(freshUrl);
          return {
            ...loaded,
            cleanup: () => {
              try {
                URL.revokeObjectURL(freshUrl);
              } catch {
                // ignore
              }
            }
          };
        } catch {
          URL.revokeObjectURL(freshUrl);
        }
      }
    } catch {
      // Fall through
    }
  }

  // Strategy 3: Existing previewUrl or dataUrl
  const existingUrl = item.dataUrl || item.previewUrl;
  if (existingUrl) {
    try {
      const loaded = await loadHtmlImage(existingUrl);
      return loaded;
    } catch {
      // Fall through
    }
  }

  // Strategy 4: FileReader base64
  if (item.file) {
    try {
      const dataUrl = await readFileAsDataUrl(item.file);
      const loaded = await loadHtmlImage(dataUrl);
      return loaded;
    } catch {
      // Fall through
    }
  }

  throw new Error(`Failed to decode image "${item.name}".`);
}

/**
 * Loads an image, applies rotation and compression, and returns a data URL and its rotated dimensions.
 */
async function processImageCanvas(
  item: ImageFileItem,
  quality: number
): Promise<{ dataUrl: string; width: number; height: number; format: 'JPEG' | 'PNG' }> {
  let loaded: LoadedImageResult | null = null;

  try {
    loaded = await loadImageSource(item);
  } catch (err) {
    console.warn(`Could not load image source for "${item.name}":`, err);
    // Render fallback canvas card so conversion does not fail completely
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#F3F4F6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#4B5563';
      ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.name || 'Image File', canvas.width / 2, canvas.height / 2 - 20);
      ctx.font = '22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#9CA3AF';
      ctx.fillText('(Rendered from file item)', canvas.width / 2, canvas.height / 2 + 30);
    }
    return {
      dataUrl: canvas.toDataURL('image/jpeg', 0.8),
      width: 1200,
      height: 900,
      format: 'JPEG'
    };
  }

  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas 2D context is not supported or unavailable.');
    }

    const rot = ((item.rotation || 0) % 360 + 360) % 360;
    const isRotated90or270 = rot === 90 || rot === 270;

    const naturalWidth = loaded.width;
    const naturalHeight = loaded.height;

    const targetWidth = isRotated90or270 ? naturalHeight : naturalWidth;
    const targetHeight = isRotated90or270 ? naturalWidth : naturalHeight;

    canvas.width = Math.max(targetWidth, 1);
    canvas.height = Math.max(targetHeight, 1);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.drawImage(loaded.source, -naturalWidth / 2, -naturalHeight / 2);
    ctx.restore();

    const isPng = item.file?.type === 'image/png' || item.name.toLowerCase().endsWith('.png');
    const format = isPng ? 'PNG' : 'JPEG';
    const outputType = isPng ? 'image/png' : 'image/jpeg';
    const dataUrl = canvas.toDataURL(outputType, quality);

    return {
      dataUrl,
      width: targetWidth,
      height: targetHeight,
      format
    };
  } finally {
    if (loaded && loaded.cleanup) {
      loaded.cleanup();
    }
  }
}

function calculateDimensions(
  imgWidth: number,
  imgHeight: number,
  pageSize: PageSize,
  orientation: Orientation,
  marginType: MarginType
): {
  pageWidth: number;
  pageHeight: number;
  renderX: number;
  renderY: number;
  renderWidth: number;
  renderHeight: number;
  orientationUsed: 'p' | 'l';
} {
  const margin = MARGIN_VALUES_MM[marginType];

  if (pageSize === 'fit') {
    // Determine page dimensions based purely on image aspect ratio
    const maxDimension = 297; // standard A4 max mm
    let pWidth: number;
    let pHeight: number;

    if (imgWidth >= imgHeight) {
      pWidth = maxDimension;
      pHeight = (imgHeight / imgWidth) * maxDimension;
    } else {
      pHeight = maxDimension;
      pWidth = (imgWidth / imgHeight) * maxDimension;
    }

    const availableWidth = pWidth - margin * 2;
    const availableHeight = pHeight - margin * 2;

    return {
      pageWidth: pWidth,
      pageHeight: pHeight,
      renderX: margin,
      renderY: margin,
      renderWidth: Math.max(availableWidth, 10),
      renderHeight: Math.max(availableHeight, 10),
      orientationUsed: pWidth > pHeight ? 'l' : 'p'
    };
  }

  const baseDim = PAGE_DIMENSIONS_MM[pageSize] || PAGE_DIMENSIONS_MM.a4;
  let isLandscape = false;

  if (orientation === 'auto') {
    isLandscape = imgWidth > imgHeight;
  } else if (orientation === 'landscape') {
    isLandscape = true;
  } else {
    isLandscape = false;
  }

  const pWidth = isLandscape ? Math.max(baseDim.width, baseDim.height) : Math.min(baseDim.width, baseDim.height);
  const pHeight = isLandscape ? Math.min(baseDim.width, baseDim.height) : Math.max(baseDim.width, baseDim.height);

  const availableWidth = pWidth - margin * 2;
  const availableHeight = pHeight - margin * 2;

  // Scale image proportionally to fit available space
  const imgRatio = imgWidth / imgHeight;
  const pageRatio = availableWidth / availableHeight;

  let renderWidth = availableWidth;
  let renderHeight = availableHeight;

  if (imgRatio > pageRatio) {
    // Image is wider than available container
    renderWidth = availableWidth;
    renderHeight = availableWidth / imgRatio;
  } else {
    // Image is taller than available container
    renderHeight = availableHeight;
    renderWidth = availableHeight * imgRatio;
  }

  // Center the image within available margin box
  const renderX = margin + (availableWidth - renderWidth) / 2;
  const renderY = margin + (availableHeight - renderHeight) / 2;

  return {
    pageWidth: pWidth,
    pageHeight: pHeight,
    renderX,
    renderY,
    renderWidth,
    renderHeight,
    orientationUsed: isLandscape ? 'l' : 'p'
  };
}

function applyWatermarkAndPageNumber(
  doc: jsPDF,
  pageIndex: number,
  totalPages: number,
  pageWidth: number,
  pageHeight: number,
  settings: ConversionSettings
) {
  // Page numbers
  if (settings.addPageNumbers) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139); // Slate color

    const pageText = `Page ${pageIndex} of ${totalPages}`;
    if (settings.numberingPosition === 'bottom-center') {
      doc.text(pageText, pageWidth / 2, pageHeight - 5, { align: 'center' });
    } else if (settings.numberingPosition === 'bottom-right') {
      doc.text(pageText, pageWidth - 10, pageHeight - 5, { align: 'right' });
    } else if (settings.numberingPosition === 'top-right') {
      doc.text(pageText, pageWidth - 10, 8, { align: 'right' });
    }
  }

  // Watermark
  if (settings.watermarkText.trim()) {
    const watermark = settings.watermarkText.trim();
    try {
      doc.saveGraphicsState();
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(36);
      doc.setTextColor(220, 38, 38); // Red brand accent

      const GStateClass = (doc as unknown as { GState?: new (opts: { opacity: number }) => unknown }).GState || (jsPDF as unknown as { GState?: new (opts: { opacity: number }) => unknown }).GState;
      if (GStateClass) {
        const gState = new GStateClass({
          opacity: settings.watermarkOpacity || 0.15
        });
        doc.setGState(gState);
      }

      // Diagonal watermark in center
      doc.text(watermark, pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 45
      });
      doc.restoreGraphicsState();
    } catch {
      // Fallback watermark if graphics state is not supported
      try {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(32);
        doc.setTextColor(230, 160, 160);
        doc.text(watermark, pageWidth / 2, pageHeight / 2, {
          align: 'center',
          angle: 45
        });
      } catch {
        // Continue silently if text fails
      }
    }
  }
}

/**
 * Generates either a single multi-page PDF or an archive with individual PDFs.
 */
export async function convertImagesToPdf(
  items: ImageFileItem[],
  settings: ConversionSettings,
  onProgress?: (progress: number, stepText: string) => void
): Promise<{
  blob: Blob;
  fileName: string;
  blobUrl: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  pageCount: number;
  isZip: boolean;
}> {
  if (!items || items.length === 0) {
    throw new Error('No images provided for conversion.');
  }

  const total = items.length;

  if (settings.outputMode === 'single') {
    onProgress?.(10, 'Initializing PDF canvas...');
    let doc: jsPDF | null = null;

    for (let i = 0; i < total; i++) {
      const item = items[i];
      const progressPercent = Math.round(15 + ((i + 1) / total) * 75);
      onProgress?.(progressPercent, `Processing image ${i + 1} of ${total}...`);

      const processed = await processImageCanvas(item, settings.imageQuality);
      const pageSize = item.customPageSize || settings.pageSize;
      const orientation = item.customOrientation || settings.orientation;
      const margin = item.customMargin || settings.margin;

      const dim = calculateDimensions(
        processed.width,
        processed.height,
        pageSize,
        orientation,
        margin
      );

      if (i === 0) {
        doc = new jsPDF({
          orientation: dim.orientationUsed,
          unit: 'mm',
          format: [dim.pageWidth, dim.pageHeight]
        });
      } else {
        doc!.addPage([dim.pageWidth, dim.pageHeight], dim.orientationUsed);
      }

      doc!.addImage(
        processed.dataUrl,
        processed.format,
        dim.renderX,
        dim.renderY,
        dim.renderWidth,
        dim.renderHeight,
        undefined,
        'FAST'
      );
    }

    if (!doc) {
      throw new Error('Failed to create PDF document.');
    }

    // Apply watermarks and page numbers to all pages
    const numPages = doc.getNumberOfPages();
    for (let p = 1; p <= numPages; p++) {
      doc.setPage(p);
      const pWidth = doc.internal.pageSize.getWidth();
      const pHeight = doc.internal.pageSize.getHeight();
      applyWatermarkAndPageNumber(doc, p, numPages, pWidth, pHeight, settings);
    }

    onProgress?.(95, 'Finalizing PDF buffer...');
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const fileName = `J_to_P_Document_${new Date().toISOString().slice(0, 10)}.pdf`;

    onProgress?.(100, 'Conversion Complete!');

    return {
      blob: pdfBlob,
      fileName,
      blobUrl,
      fileSizeBytes: pdfBlob.size,
      fileSizeFormatted: formatBytes(pdfBlob.size),
      pageCount: total,
      isZip: false
    };
  } else {
    // Multiple Individual PDFs bundled into a ZIP
    onProgress?.(10, 'Initializing ZIP batch archive...');
    const zip = new JSZip();

    for (let i = 0; i < total; i++) {
      const item = items[i];
      const progressPercent = Math.round(15 + ((i + 1) / total) * 70);
      onProgress?.(progressPercent, `Converting image ${i + 1} of ${total} to individual PDF...`);

      const processed = await processImageCanvas(item, settings.imageQuality);
      const pageSize = item.customPageSize || settings.pageSize;
      const orientation = item.customOrientation || settings.orientation;
      const margin = item.customMargin || settings.margin;

      const dim = calculateDimensions(
        processed.width,
        processed.height,
        pageSize,
        orientation,
        margin
      );

      const singleDoc = new jsPDF({
        orientation: dim.orientationUsed,
        unit: 'mm',
        format: [dim.pageWidth, dim.pageHeight]
      });

      singleDoc.addImage(
        processed.dataUrl,
        processed.format,
        dim.renderX,
        dim.renderY,
        dim.renderWidth,
        dim.renderHeight,
        undefined,
        'FAST'
      );

      applyWatermarkAndPageNumber(singleDoc, 1, 1, dim.pageWidth, dim.pageHeight, settings);

      const itemPdfBlob = singleDoc.output('blob');
      const cleanBaseName = item.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
      zip.file(`${cleanBaseName}.pdf`, itemPdfBlob);
    }

    onProgress?.(90, 'Packaging ZIP archive...');
    const zipBlob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
      onProgress?.(90 + Math.round(metadata.percent * 0.1), 'Compressing ZIP archive...');
    });

    const blobUrl = URL.createObjectURL(zipBlob);
    const fileName = `J_to_P_Batch_PDFs_${new Date().toISOString().slice(0, 10)}.zip`;

    onProgress?.(100, 'Batch Archive Ready!');

    return {
      blob: zipBlob,
      fileName,
      blobUrl,
      fileSizeBytes: zipBlob.size,
      fileSizeFormatted: formatBytes(zipBlob.size),
      pageCount: total,
      isZip: true
    };
  }
}
