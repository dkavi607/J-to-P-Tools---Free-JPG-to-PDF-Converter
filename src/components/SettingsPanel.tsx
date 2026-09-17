import React, { useState } from 'react';
import {
  Sliders,
  FileSpreadsheet,
  Compass,
  Maximize,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Hash,
  Type
} from 'lucide-react';
import { ConversionSettings, Language, MarginType, Orientation, PageSize, OutputMode, NumberingPosition } from '../types';
import { getTranslation } from '../i18n/translations';

interface SettingsPanelProps {
  settings: ConversionSettings;
  onChange: (newSettings: ConversionSettings) => void;
  lang: Language;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onChange,
  lang
}) => {
  const t = getTranslation(lang);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateSetting = <K extends keyof ConversionSettings>(key: K, value: ConversionSettings[K]) => {
    onChange({
      ...settings,
      [key]: value
    });
  };

  const getQualityLabel = (q: number) => {
    if (q >= 0.9) return 'Maximum Quality (Original)';
    if (q >= 0.75) return 'High (Recommended)';
    if (q >= 0.5) return 'Medium (Balanced)';
    return 'Low (Maximum Compression)';
  };

  return (
    <div className="bg-slate-50/80 dark:bg-slate-850/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 transition-all duration-200">
      
      {/* Settings Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t.globalSettings}
          </h3>
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Applied to all pages
        </span>
      </div>

      {/* Grid of Main Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
        
        {/* Page Size */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            {t.pageSize}
          </label>
          <select
            value={settings.pageSize}
            onChange={(e) => updateSetting('pageSize', e.target.value as PageSize)}
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none transition"
          >
            <option value="a4">A4 (210 × 297 mm)</option>
            <option value="letter">US Letter (8.5 × 11 in)</option>
            <option value="legal">US Legal (8.5 × 14 in)</option>
            <option value="executive">Executive (7.25 × 10.5 in)</option>
            <option value="fit">{t.fitImage}</option>
          </select>
        </div>

        {/* Orientation */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            {t.orientation}
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => updateSetting('orientation', 'auto')}
              className={`text-xs py-1.5 rounded-lg font-semibold transition ${
                settings.orientation === 'auto'
                  ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t.auto}
            </button>
            <button
              type="button"
              onClick={() => updateSetting('orientation', 'portrait')}
              className={`text-xs py-1.5 rounded-lg font-semibold transition ${
                settings.orientation === 'portrait'
                  ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t.portrait}
            </button>
            <button
              type="button"
              onClick={() => updateSetting('orientation', 'landscape')}
              className={`text-xs py-1.5 rounded-lg font-semibold transition ${
                settings.orientation === 'landscape'
                  ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t.landscape}
            </button>
          </div>
        </div>

        {/* Margins */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            {t.margins}
          </label>
          <select
            value={settings.margin}
            onChange={(e) => updateSetting('margin', e.target.value as MarginType)}
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none transition"
          >
            <option value="none">{t.none} (0 mm)</option>
            <option value="small">{t.small}</option>
            <option value="medium">{t.medium}</option>
            <option value="large">{t.large}</option>
          </select>
        </div>

        {/* Output Mode Toggle */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            {t.outputMode}
          </label>
          <select
            value={settings.outputMode}
            onChange={(e) => updateSetting('outputMode', e.target.value as OutputMode)}
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none transition"
          >
            <option value="single">Single PDF (Merged)</option>
            <option value="individual">Separate PDFs (.ZIP)</option>
          </select>
        </div>
      </div>

      {/* Image Compression Quality Slider */}
      <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/70">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {t.compression}
            </span>
            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 font-mono">
              {Math.round(settings.imageQuality * 100)}%
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {getQualityLabel(settings.imageQuality)}
          </span>
        </div>
        <input
          type="range"
          min="0.3"
          max="1.0"
          step="0.05"
          value={settings.imageQuality}
          onChange={(e) => updateSetting('imageQuality', parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>Small File Size (30%)</span>
          <span>Balanced (80%)</span>
          <span>Best Quality (100%)</span>
        </div>
      </div>

      {/* Advanced Collapsible Section (Watermark & Numbers) */}
      <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition py-1"
        >
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span>{t.advancedOptions}</span>
          </div>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
            
            {/* Watermark Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.watermark}
              </label>
              <input
                type="text"
                value={settings.watermarkText}
                onChange={(e) => updateSetting('watermarkText', e.target.value)}
                placeholder={t.watermarkPlaceholder}
                className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none transition"
              />
              {settings.watermarkText && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-slate-400">Opacity:</span>
                  <input
                    type="range"
                    min="0.05"
                    max="0.4"
                    step="0.05"
                    value={settings.watermarkOpacity}
                    onChange={(e) => updateSetting('watermarkOpacity', parseFloat(e.target.value))}
                    className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                  <span className="text-[11px] text-slate-400 font-mono">
                    {Math.round(settings.watermarkOpacity * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Page Numbering */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.pageNumbers}
                </label>
                <input
                  type="checkbox"
                  checked={settings.addPageNumbers}
                  onChange={(e) => updateSetting('addPageNumbers', e.target.checked)}
                  className="rounded text-violet-600 focus:ring-violet-500 w-4 h-4 cursor-pointer"
                />
              </div>

              {settings.addPageNumbers && (
                <select
                  value={settings.numberingPosition}
                  onChange={(e) => updateSetting('numberingPosition', e.target.value as NumberingPosition)}
                  className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none transition mt-1"
                >
                  <option value="bottom-center">Bottom Center (Page 1 of N)</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="top-right">Top Right</option>
                </select>
              )}
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
