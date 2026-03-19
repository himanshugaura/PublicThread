"use client";

import React from "react";
import SectionLabel from "./SectionLabel";

export default function ThumbnailUploader({
  thumbnail,
  thumbnailPreview,
  isDragging,
  setIsDragging,
  fileInputRef,
  onPickFile,
  onRemove,
  onDropFile,
}: {
  thumbnail: File | null;
  thumbnailPreview: string | null;
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onPickFile: (file: File) => void;
  onRemove: () => void;
  onDropFile: (file: File) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <SectionLabel label="Thumbnail" />

      {thumbnailPreview ? (
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-[rgba(240,236,228,0.1)] group">
          <img
            src={thumbnailPreview}
            alt="Thumbnail preview"
            className="w-full h-full object-cover"
          />

          {/* Hover actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[12px] tracking-[0.03em] px-4 py-2 rounded-lg bg-[rgba(240,236,228,0.12)] text-[#f0ece4] border border-[rgba(240,236,228,0.2)] transition-all duration-150 cursor-pointer hover:bg-[rgba(240,236,228,0.2)]"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="text-[12px] tracking-[0.03em] px-4 py-2 rounded-lg bg-[rgba(239,68,68,0.15)] text-red-400/80 border border-red-400/20 transition-all duration-150 cursor-pointer hover:bg-[rgba(239,68,68,0.25)]"
            >
              Remove
            </button>
          </div>

          {/* File name badge */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[rgba(0,0,0,0.6)] backdrop-blur-[12px] border border-[rgba(240,236,228,0.08)]">
            <span className="text-[10px] text-[rgba(240,236,228,0.6)]">
              {thumbnail?.name}
            </span>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) onDropFile(file);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`
            w-full aspect-[3/2] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200
            ${
              isDragging
                ? "border-[rgba(240,236,228,0.25)] bg-[rgba(240,236,228,0.04)]"
                : "border-[rgba(240,236,228,0.08)] bg-gradient-to-br from-[rgba(240,236,228,0.03)] to-[rgba(240,236,228,0.01)] hover:border-[rgba(240,236,228,0.15)] hover:bg-[rgba(240,236,228,0.03)]"
            }
          `}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(240,236,228,0.15)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[13px] text-[rgba(240,236,228,0.35)]">
              {isDragging ? "Drop image here" : "Click to upload or drag and drop"}
            </span>
            <span className="text-[11px] text-[rgba(240,236,228,0.15)]">
              PNG, JPG, GIF or WebP — recommended 1500×1000 (3:2)
            </span>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPickFile(file);
        }}
        className="hidden"
      />
    </div>
  );
}