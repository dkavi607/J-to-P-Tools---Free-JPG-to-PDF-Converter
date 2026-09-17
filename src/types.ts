export type PageSize = 'a4' | 'letter' | 'legal' | 'executive' | 'fit';
export type Orientation = 'auto' | 'portrait' | 'landscape';
export type MarginType = 'none' | 'small' | 'medium' | 'large';
export type OutputMode = 'single' | 'individual';
export type NumberingPosition = 'bottom-center' | 'bottom-right' | 'top-right';

export interface ImageFileItem {
  id: string;
  file: File;
  blob?: Blob;
  dataUrl?: string;
  name: string;
  size: number;
  sizeFormatted: string;
  type: string;
  previewUrl: string;
  width: number;
  height: number;
  rotation: number; // 0, 90, 180, 270
  customPageSize?: PageSize;
  customOrientation?: Orientation;
  customMargin?: MarginType;
}

export interface ConversionSettings {
  pageSize: PageSize;
  orientation: Orientation;
  margin: MarginType;
  imageQuality: number; // 0.3 to 1.0
  outputMode: OutputMode; // 'single' -> 1 PDF or 'individual' -> zip / multiple
  addPageNumbers: boolean;
  numberingPosition: NumberingPosition;
  watermarkText: string;
  watermarkOpacity: number;
}

export interface ConversionResult {
  fileName: string;
  fileBlob: Blob;
  blobUrl: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  pageCount: number;
  isZip: boolean;
}

export type Language = 'en' | 'es' | 'fr' | 'de';

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  category: string;
  content: string[];
}
