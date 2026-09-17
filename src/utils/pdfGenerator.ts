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
 * Loads an image, applies rotation and compression, and returns a data URL and its rotated dimensions.
 */
async function processImageCanvas(
  item: ImageFileItem,
  quality: number
): Promise<{ dataUrl: string; width: number; height: number; format: 'JPEG' | 'PNG' }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }

      const rot = (item.rotation || 0) % 360;
      const isRotated90or270 = rot === 90 || rot === 270;

      const targetWidth = isRotated90or270 ? img.naturalHeight : img.naturalWidth;
      const targetHeight = isRotated90or270 ? img.naturalWidth : img.naturalHeight;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      ctx.restore();

      const format = item.file.type === 'image/png' ? 'PNG' : 'JPEG';
      const outputType = format === 'PNG' ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(outputType, quality);

      resolve({
        dataUrl,
        width: targetWidth,
        height: targetHeight,
        format
      });
    };
    img.onerror = (e) => reject(e);
    img.src = item.previewUrl;
  });
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
    doc.saveGraphicsState();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    doc.setTextColor(220, 38, 38); // Red brand accent
    const gState = new (doc as unknown as { GState: new (opts: { opacity: number }) => unknown }).GState({
      opacity: settings.watermarkOpacity || 0.15
    });
    doc.setGState(gState);

    // Diagonal watermark in center
    doc.text(watermark, pageWidth / 2, pageHeight / 2, {
      align: 'center',
      angle: 45
    });
    doc.restoreGraphicsState();
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
