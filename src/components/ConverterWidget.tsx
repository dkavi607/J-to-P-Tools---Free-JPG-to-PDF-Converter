import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UploadCloud,
  FileImage,
  RefreshCw,
  Download,
  Trash2,
  Plus,
  Eye,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import {
  ConversionResult,
  ConversionSettings,
  ImageFileItem,
  Language
} from '../types';
import { getTranslation } from '../i18n/translations';
import { formatBytes, convertImagesToPdf } from '../utils/pdfGenerator';
import { ImageCard } from './ImageCard';
import { SettingsPanel } from './SettingsPanel';
import { PdfPreviewModal } from './PdfPreviewModal';

const DEFAULT_SETTINGS: ConversionSettings = {
  pageSize: 'a4',
  orientation: 'auto',
  margin: 'small',
  imageQuality: 0.85,
  outputMode: 'single',
  addPageNumbers: false,
  numberingPosition: 'bottom-center',
  watermarkText: '',
  watermarkOpacity: 0.15
};

interface ConverterWidgetProps {
  lang: Language;
}

export const ConverterWidget: React.FC<ConverterWidgetProps> = ({ lang }) => {
  const t = getTranslation(lang);
  const [items, setItems] = useState<ImageFileItem[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>(() => {
    try {
      const saved = localStorage.getItem('jtop_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const draggedItemIndex = useRef<number | null>(null);

  // Save user preferences
  useEffect(() => {
    try {
      localStorage.setItem('jtop_settings', JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Keyboard shortcut support (Ctrl+O to open, Ctrl+Enter to convert)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        fileInputRef.current?.click();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (items.length > 0 && !isConverting) {
          handleConvert();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, isConverting, settings]);

  const processUploadedFiles = async (files: FileList | File[]) => {
    setErrorMessage(null);
    const validFiles: File[] = [];
    let oversizedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.type.startsWith('image/')) {
        if (f.size > 25 * 1024 * 1024) {
          oversizedCount++;
        }
        validFiles.push(f);
      }
    }

    if (validFiles.length === 0) {
      setErrorMessage('Please upload valid image files (JPG, JPEG, PNG, WEBP, BMP).');
      return;
    }

    if (oversizedCount > 0) {
      setErrorMessage(`Warning: ${oversizedCount} image(s) exceed 25MB. Conversion might take a few extra moments.`);
    }

    const newItems: ImageFileItem[] = [];

    for (const file of validFiles) {
      const previewUrl = URL.createObjectURL(file);
      const dimensions = await getImageDimensions(previewUrl);

      newItems.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        sizeFormatted: formatBytes(file.size),
        type: file.type,
        previewUrl,
        width: dimensions.width,
        height: dimensions.height,
        rotation: 0
      });
    }

    setItems((prev) => [...prev, ...newItems]);
    // reset previous conversion result when adding new files
    setConversionResult(null);
  };

  const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth || 800, height: img.naturalHeight || 600 });
      };
      img.onerror = () => {
        resolve({ width: 800, height: 600 });
      };
      img.src = url;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFiles(e.target.files);
    }
    // reset input value so re-selecting identical file fires onChange
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Reordering & Manipulations
  const handleRemoveImage = (id: string) => {
    setItems((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      const removed = prev.find((item) => item.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return filtered;
    });
    setConversionResult(null);
  };

  const handleRotateImage = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rotation: (item.rotation + 90) % 360 } : item
      )
    );
    setConversionResult(null);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setItems((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[index - 1];
      next[index - 1] = temp;
      return next;
    });
    setConversionResult(null);
  };

  const handleMoveDown = (index: number) => {
    if (index >= items.length - 1) return;
    setItems((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[index + 1];
      next[index + 1] = temp;
      return next;
    });
    setConversionResult(null);
  };

  const handleCardDragStart = (e: React.DragEvent, index: number) => {
    draggedItemIndex.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCardDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleCardDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedItemIndex.current === null || draggedItemIndex.current === targetIndex) return;

    setItems((prev) => {
      const next = [...prev];
      const [movedItem] = next.splice(draggedItemIndex.current!, 1);
      next.splice(targetIndex, 0, movedItem);
      return next;
    });
    draggedItemIndex.current = null;
    setConversionResult(null);
  };

  const handleClearAll = () => {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    if (conversionResult) URL.revokeObjectURL(conversionResult.blobUrl);
    setItems([]);
    setConversionResult(null);
    setErrorMessage(null);
  };

  const handleConvert = async () => {
    if (items.length === 0) return;

    setIsConverting(true);
    setProgress(5);
    setProgressStatus('Preparing images...');
    setErrorMessage(null);

    try {
      const result = await convertImagesToPdf(items, settings, (p, status) => {
        setProgress(p);
        setProgressStatus(status);
      });

      setConversionResult(result);
      setIsConverting(false);

      // Trigger celebratory confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#EF4444', '#8B5CF6', '#F87171']
      });
    } catch (err: unknown) {
      console.error(err);
      setIsConverting(false);
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred during conversion.');
    }
  };

  const handleDownload = () => {
    if (!conversionResult) return;
    const a = document.createElement('a');
    a.href = conversionResult.blobUrl;
    a.download = conversionResult.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const totalInputSize = items.reduce((acc, curr) => acc + curr.size, 0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 my-4 sm:my-8">
      
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/jpg,image/png,image/webp,image/bmp"
        onChange={handleFileInputChange}
        className="hidden"
        id="file-upload-input"
      />

      {/* Main Container Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-200">
        
        {/* Error / Warning Alert Banner */}
        {errorMessage && (
          <div className="flex items-center gap-2.5 p-4 bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span className="flex-1">{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-amber-700 hover:text-amber-900 dark:text-amber-400 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* State 1: Dropzone when no images uploaded */}
        {items.length === 0 ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-8 sm:p-14 m-4 sm:m-6 rounded-2xl cursor-pointer transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[300px] sm:min-h-[360px] ${
              isDragging
                ? 'dashed-dropzone-active bg-red-50/50 dark:bg-red-950/20 scale-[0.99]'
                : 'dashed-dropzone hover:bg-violet-50/40 dark:hover:bg-violet-950/20'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {t.dropTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 font-normal">
              {t.dropSubtitle}
            </p>

            <button
              type="button"
              className="px-6 py-3 rounded-xl brand-gradient text-white text-sm sm:text-base font-bold shadow-md hover:brand-gradient-hover hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <FileImage className="w-4 h-4" />
              <span>{t.browseBtn}</span>
            </button>

            <div className="mt-8 flex items-center gap-4 text-xs text-slate-400 font-medium">
              <span>⚡ Fast Local Processing</span>
              <span>•</span>
              <span>🔒 Zero Uploads</span>
              <span>•</span>
              <span>💯 High-DPI Quality</span>
            </div>
          </div>
        ) : (
          /* State 2: Images uploaded - Thumbnails + Settings + Actions */
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {items.length} {items.length === 1 ? 'Image Selected' : 'Images Selected'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  ({formatBytes(totalInputSize)})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-violet-600 hover:border-violet-300 dark:hover:text-violet-400 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addMore}</span>
                </button>

                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/60 dark:bg-red-950/30 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-100 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.resetAll}</span>
                </button>
              </div>
            </div>

            {/* Reorder Helper Tip */}
            <div className="text-xs text-slate-500 dark:text-slate-400 bg-violet-50/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 rounded-xl p-2.5">
              {t.reorderHint}
            </div>

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[460px] overflow-y-auto p-1">
              {items.map((item, index) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  index={index}
                  total={items.length}
                  onRemove={handleRemoveImage}
                  onRotate={handleRotateImage}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onDragStart={handleCardDragStart}
                  onDragOver={handleCardDragOver}
                  onDrop={handleCardDrop}
                />
              ))}
            </div>

            {/* Global Settings Panel */}
            <SettingsPanel
              settings={settings}
              onChange={(newSettings) => {
                setSettings(newSettings);
                setConversionResult(null);
              }}
              lang={lang}
            />

            {/* Converting Progress Bar */}
            {isConverting && (
              <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs font-bold text-violet-900 dark:text-violet-200">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-violet-600" />
                    {progressStatus}
                  </span>
                  <span className="font-mono">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-violet-200/80 dark:bg-violet-900 rounded-full overflow-hidden">
                  <div
                    className="h-full brand-gradient transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Conversion Result Download Card */}
            {conversionResult && !isConverting && (
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-violet-500/10 to-red-500/10 border border-emerald-500/30 dark:border-emerald-500/40 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {t.convertedSuccess}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                        {conversionResult.fileName} • {conversionResult.fileSizeFormatted} • {conversionResult.pageCount} Pages
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setPreviewModalOpen(true)}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 transition shadow-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{t.previewPdf}</span>
                    </button>

                    <button
                      onClick={handleDownload}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow-lg hover:brand-gradient-hover hover:scale-105 active:scale-95 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {conversionResult.isZip ? t.downloadZip : t.downloadPdf}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Primary Action Button (When not converted yet) */}
            {!conversionResult && (
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isConverting || items.length === 0}
                  onClick={handleConvert}
                  className="w-full py-4 rounded-2xl brand-gradient text-white font-extrabold text-base sm:text-lg shadow-xl hover:brand-gradient-hover hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                >
                  {isConverting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{t.converting}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>
                        {t.convertBtn} ({items.length} {items.length === 1 ? 'Page' : 'Pages'})
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        )}
      </div>

      {/* PDF Live Preview Modal */}
      {previewModalOpen && conversionResult && (
        <PdfPreviewModal
          result={conversionResult}
          onClose={() => setPreviewModalOpen(false)}
          onDownload={handleDownload}
        />
      )}

    </div>
  );
};
