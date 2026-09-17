import React, { useState } from 'react';
import { X, BookOpen, Clock, Calendar, ArrowRight, Sparkles, Share2 } from 'lucide-react';
import { BlogArticle } from '../../types';

interface BlogSectionProps {
  onClose: () => void;
}

const ARTICLES: BlogArticle[] = [
  {
    id: '1',
    slug: 'how-to-reduce-pdf-size-without-losing-quality',
    title: 'How to Reduce JPG to PDF File Size Without Losing Clarity',
    excerpt: 'Discover the exact balance between image resolution, JPEG compression algorithms, and PDF DPI settings to keep documents lightweight for email.',
    readTime: '4 min read',
    date: 'Sep 12, 2026',
    author: 'J to P Editorial Team',
    category: 'Optimization Guide',
    content: [
      'When you take photos of multi-page paper documents with modern 48-megapixel smartphone cameras, single raw JPG images can easily weigh 8MB to 15MB each. If you bundle ten such images together into an uncompressed PDF, the final document will exceed 100MB—far too large to email, upload to university portals, or submit to government portals.',
      '### The Secret: Optimal Downsampling',
      'The resolution required for clear readability of printed text is approximately 150 to 300 DPI (dots per inch). Higher resolutions yield diminishing returns for human vision on screens.',
      'By adjusting our converter\'s compression quality slider to 80%–85%, standard high-resolution camera photos are intelligently compressed via discrete cosine transform (DCT). This slashes file weight by up to 75% without introducing visible fuzziness or artifacts.',
      '### Summary of Best Compression Settings:',
      '• Official Contracts & ID Cards: 85%–90% Quality (Crystal Sharp)\n• General Receipts & Notes: 75% Quality (Optimal Balance)\n• Multi-volume Books & Long Portfolios: 60%–70% Quality (Ultra Compact)'
    ]
  },
  {
    id: '2',
    slug: 'why-client-side-pdf-conversion-is-safer',
    title: 'Why Client-Side PDF Conversion Is Essential for Confidential Documents',
    excerpt: 'Why uploading driver licenses, passports, and medical scans to free cloud converters poses massive identity theft risks.',
    readTime: '5 min read',
    date: 'Sep 08, 2026',
    author: 'Security Research Group',
    category: 'Data Privacy',
    content: [
      'In recent years, millions of users have turned to online converters to quickly turn photos of tax documents, passport scans, medical invoices, and banking statements into PDF format. However, traditional online tools upload your confidential files to remote cloud storage.',
      '### The Hidden Cloud Risk',
      'Even if a cloud service claims to "delete files after 1 hour", your personal identity documents travel across public network routers, get processed on third-party compute instances, and might persist in temporary disk caches and logging pipelines.',
      '### How Browser-Based Client-Side Conversion Works',
      'J to P Tools uses the HTML5 Canvas API and JavaScript running exclusively inside your local device processor. No raw image data, filenames, or rendered PDF pages are ever transmitted to any remote server. When you close the browser tab, the temporary memory is wiped clean by your operating system.'
    ]
  },
  {
    id: '3',
    slug: 'best-page-sizes-a4-vs-us-letter',
    title: 'A4 vs. US Letter: Which Page Size Should You Choose for Your PDF?',
    excerpt: 'Avoid awkward printing margins and cutoffs by matching your PDF dimensions to your recipient’s geographic region.',
    readTime: '3 min read',
    date: 'Aug 29, 2026',
    author: 'Design & Typography Desk',
    category: 'Document Layout',
    content: [
      'A common pitfall when converting JPG images to PDF is selecting the wrong physical page geometry.',
      '### ISO A4 (210 × 297 mm)',
      'Standardized worldwide across the European Union, the United Kingdom, Asia, Australia, South America, and Africa. If you are sending documents internationally, ISO A4 is the safest default choice.',
      '### US Letter (8.5 × 11 inches / 215.9 × 279.4 mm)',
      'Used throughout the United States, Canada, and Mexico. US Letter is slightly wider and shorter than A4. Choosing US Letter ensures printers in North America will not truncate page margins.',
      '### "Fit to Image" Mode',
      'If you are compiling a photo album, artwork portfolio, or panoramic scans where fixed physical paper dimensions are secondary to preserving exact image aspect ratios, choose "Fit to Image Dimensions" in the J to P settings panel.'
    ]
  }
];

export const BlogSection: React.FC<BlogSectionProps> = ({ onClose }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[88vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedArticle ? 'Article Reader' : 'J to P Tools Knowledge Hub & Blog'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedArticle && (
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline px-2 py-1"
              >
                ← Back to Articles
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedArticle ? (
            /* Single Article View */
            <article className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-150">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300">
                  {selectedArticle.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {selectedArticle.title}
                </h1>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedArticle.readTime}
                  </span>
                  <span>•</span>
                  <span>{selectedArticle.author}</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-6">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  ← All Articles
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl brand-gradient text-white text-xs font-bold"
                >
                  Try the Converter Now
                </button>
              </div>
            </article>
          ) : (
            /* Blog List View */
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2">
                Expert guides, optimization tips, and technical deep-dives into image processing and document privacy.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {ARTICLES.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="font-bold text-violet-600 dark:text-violet-400">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-2">
                      {article.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold text-violet-600 dark:text-violet-400">
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
