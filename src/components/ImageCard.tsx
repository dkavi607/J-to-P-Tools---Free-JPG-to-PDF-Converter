import React from 'react';
import {
  RotateCw,
  Trash2,
  MoveUp,
  MoveDown,
  GripVertical,
  Maximize2,
  FileImage
} from 'lucide-react';
import { ImageFileItem, PageSize, Orientation, MarginType } from '../types';

interface ImageCardProps {
  item: ImageFileItem;
  index: number;
  total: number;
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  item,
  index,
  total,
  onRemove,
  onRotate,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-violet-400 dark:hover:border-violet-500 transition-all duration-200 overflow-hidden"
    >
      {/* Top Header Badge & Quick Actions */}
      <div className="flex items-center justify-between p-2.5 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-800/80">
        <div className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <GripVertical className="w-4 h-4" />
          <span className="text-xs font-bold text-violet-700 dark:text-violet-400 font-mono bg-violet-100 dark:bg-violet-950/80 px-2 py-0.5 rounded-md">
            #{index + 1}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Reorder Up */}
          <button
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            className="p-1 rounded-md text-slate-500 hover:text-violet-600 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-violet-400 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Move Page Up"
            aria-label="Move Up"
          >
            <MoveUp className="w-3.5 h-3.5" />
          </button>

          {/* Reorder Down */}
          <button
            onClick={() => onMoveDown(index)}
            disabled={index === total - 1}
            className="p-1 rounded-md text-slate-500 hover:text-violet-600 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-violet-400 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Move Page Down"
            aria-label="Move Down"
          >
            <MoveDown className="w-3.5 h-3.5" />
          </button>

          {/* Rotate */}
          <button
            onClick={() => onRotate(item.id)}
            className="p-1 rounded-md text-slate-500 hover:text-violet-600 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-violet-400 dark:hover:bg-slate-700 transition"
            title={`Rotate 90° (Current: ${item.rotation}°)`}
            aria-label="Rotate 90 degrees"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-950/40 transition"
            title="Remove Image"
            aria-label="Remove Image"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Image Preview Container */}
      <div className="relative aspect-[4/3] bg-slate-900/5 dark:bg-slate-950/40 flex items-center justify-center p-3 overflow-hidden">
        <img
          src={item.previewUrl}
          alt={item.name}
          style={{
            transform: `rotate(${item.rotation}deg)`
          }}
          className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-200 rounded"
        />

        {/* Rotation indicator badge if rotated */}
        {item.rotation !== 0 && (
          <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-mono font-medium text-white backdrop-blur-xs">
            {item.rotation}°
          </span>
        )}
      </div>

      {/* Card Footer info */}
      <div className="p-3 space-y-1">
        <p
          className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate"
          title={item.name}
        >
          {item.name}
        </p>
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <span>{item.sizeFormatted}</span>
          <span>
            {item.width} × {item.height}px
          </span>
        </div>
      </div>
    </div>
  );
};
