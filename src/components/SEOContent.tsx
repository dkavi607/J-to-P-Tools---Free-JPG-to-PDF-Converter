import React from 'react';
import { FileCheck, Shield, Sparkles, Check, X, ArrowRight } from 'lucide-react';

export const SEOContent: React.FC = () => {
  return (
    <section id="seo-guide" className="py-12 sm:py-16 bg-slate-100/70 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Main Article Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-semibold">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Complete Image to PDF Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Ultimate Guide to Converting JPG to PDF Online
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Whether preparing financial receipts for taxes, submitting homework assignments, archiving scanned certificates, or building a professional photography portfolio, converting JPG images to PDF format is one of the most frequent daily digital tasks. Learn how browser-based local conversion ensures maximum speed, zero upload latency, and 100% data privacy.
          </p>
        </div>

        {/* Section 1: Why Convert JPG to PDF? */}
        <article className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Why Convert JPG, PNG, and Photos to PDF Format?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            While JPEG is the dominant format for digital photographs due to its efficient lossy compression, it is designed for standalone display rather than multi-page document presentation. Here is why converting your images into standardized PDF files is beneficial:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 flex items-center justify-center shrink-0 text-xs font-bold">1</span>
              <span><strong>Universal Consistency:</strong> PDFs look identical on every phone, tablet, Mac, Windows, and Linux screen.</span>
            </li>
            <li className="flex items-start gap-2 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 flex items-center justify-center shrink-0 text-xs font-bold">2</span>
              <span><strong>Multi-Page Bundling:</strong> Combine dozens of loose receipt photos into a single, organized document.</span>
            </li>
            <li className="flex items-start gap-2 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 flex items-center justify-center shrink-0 text-xs font-bold">3</span>
              <span><strong>Standardized Printing:</strong> Fixed physical page dimensions (A4, Letter) prevent irregular printer cuts.</span>
            </li>
            <li className="flex items-start gap-2 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 flex items-center justify-center shrink-0 text-xs font-bold">4</span>
              <span><strong>Compact Sharing:</strong> Reduce high-resolution camera file sizes into lightweight email attachments.</span>
            </li>
          </ul>
        </article>

        {/* Section 2: Comparison Table (Client-Side vs Traditional Cloud Converters) */}
        <article className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Client-Side Processing vs. Traditional Cloud Converters
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Most legacy image converters require you to upload your sensitive personal files to unknown third-party cloud servers. <strong>J to P Tools</strong> operates on a 100% client-side architecture.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3.5 sm:p-4">Key Criteria</th>
                  <th className="p-3.5 sm:p-4 text-violet-600 dark:text-violet-400">J to P Tools (Client-Side)</th>
                  <th className="p-3.5 sm:p-4 text-slate-500">Traditional Web Converters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold">Data Privacy & Security</td>
                  <td className="p-3.5 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" /> 100% Private (0 file uploads)
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Uploaded to remote servers</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold">Conversion Speed</td>
                  <td className="p-3.5 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" /> Instant (Local CPU/GPU)
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Slow upload + queue delay</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold">Offline Availability</td>
                  <td className="p-3.5 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" /> Yes (Works offline as PWA)
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Requires continuous internet</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold">File Quantity Limits</td>
                  <td className="p-3.5 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" /> Unlimited Batch Processing
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Capped (e.g. 2 files / hour)</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold">Pricing & Subscriptions</td>
                  <td className="p-3.5 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" /> 100% Free Forever
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Paid tier / Watermarks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* Section 3: Best Practices for High Quality PDF Output */}
        <article className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Tips for Optimizing Image to PDF Conversion
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Follow these simple guidelines to ensure your generated PDF files have crisp clarity without unnecessary bloat:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Pick the Right Page Size</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Use <strong>A4</strong> for Europe/Asia/Latin America, <strong>US Letter</strong> for North America, or <strong>Fit to Image</strong> for pure photo albums.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Tune Compression</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                For text documents and contracts, <strong>80%–85% quality</strong> produces 70% smaller PDFs while preserving crystal-clear sharpness.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Add Margins for Print</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose <strong>Small (5mm)</strong> or <strong>Medium (12mm)</strong> margins if you intend to print or punch binder holes in physical paper.
              </p>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
};
