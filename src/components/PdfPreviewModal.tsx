import React from 'react';
import { X, Download, Eye, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { ConversionResult } from '../types';

interface PdfPreviewModalProps {
  result: ConversionResult | null;
  onClose: () => void;
  onDownload: () => void;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  result,
  onClose,
  onDownload
}) => {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-white font-bold text-xs">
              PDF
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                {result.fileName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {result.pageCount} {result.pageCount === 1 ? 'Page' : 'Pages'} • {result.fileSizeFormatted}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow hover:opacity-95 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Iframe Viewer */}
        <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 p-2 sm:p-4 overflow-hidden flex items-center justify-center">
          {result.isZip ? (
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm max-w-md">
              <FileText className="w-12 h-12 text-violet-600 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                ZIP Batch Archive Ready
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                Contains {result.pageCount} separate converted PDF documents ready for download.
              </p>
              <button
                onClick={onDownload}
                className="w-full py-2.5 rounded-xl brand-gradient text-white text-sm font-bold shadow hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Archive (.ZIP)
              </button>
            </div>
          ) : (
            <iframe
              src={result.blobUrl}
              title="PDF Preview"
              className="w-full h-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white"
            />
          )}
        </div>

      </div>
    </div>
  );
};
