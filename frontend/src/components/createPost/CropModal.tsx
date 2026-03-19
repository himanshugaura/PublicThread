"use client";

import { useCallback, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const THUMBNAIL_ASPECT = 3 / 2; // landscape 3:2

export default function CropModal({
  open,
  imageSrc,
  fileName,
  onCancel,
  onApply,
}: {
  open: boolean;
  imageSrc: string | null;
  fileName: string;
  onCancel: () => void;
  onApply: (file: File) => void;
}) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const imageAspect = width / height;

    // Better initialization for portrait images:
    // - portrait => use width-based crop (smaller width so height fits)
    // - landscape => use larger width crop
    const baseWidthPercent = imageAspect < 1 ? 70 : 85;

    const initial = centerCrop(
      makeAspectCrop(
        { unit: "%", width: baseWidthPercent },
        THUMBNAIL_ASPECT,
        width,
        height
      ),
      width,
      height
    );

    setCrop(initial);
  };

  const makeCroppedFile = useCallback(async () => {
    const image = imgRef.current;
    const pixelCrop = completedCrop;

    if (!image || !pixelCrop || pixelCrop.width <= 0 || pixelCrop.height <= 0) {
      return null;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const sx = Math.round(pixelCrop.x * scaleX);
    const sy = Math.round(pixelCrop.y * scaleY);
    const sw = Math.round(pixelCrop.width * scaleX);
    const sh = Math.round(pixelCrop.height * scaleY);

    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = sh;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), "image/jpeg", 0.92);
    });

    if (!blob) return null;

    const base = fileName.replace(/\.[^/.]+$/, "") || "thumbnail";
    return new File([blob], `${base}-cropped.jpg`, { type: "image/jpeg" });
  }, [completedCrop, fileName]);

  const handleApply = async () => {
    const file = await makeCroppedFile();
    if (!file) return;
    onApply(file);
  };

  if (!open || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl rounded-2xl border border-[rgba(240,236,228,0.12)] bg-[#101010] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(240,236,228,0.08)]">
          <h3 className="text-[15px] text-[#f0ece4] tracking-[0.02em]">
            Crop thumbnail (3:2)
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-[rgba(240,236,228,0.45)] hover:text-[rgba(240,236,228,0.9)]"
          >
            ✕
          </button>
        </div>

        <div className="p-6 flex justify-center max-h-[75vh] overflow-auto">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={THUMBNAIL_ASPECT}
            keepSelection
            minWidth={180}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop source"
              onLoad={onImageLoad}
              className="max-w-full h-auto rounded-lg"
            />
          </ReactCrop>
        </div>

        <div className="px-6 py-4 border-t border-[rgba(240,236,228,0.08)] flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="text-[12px] px-4 py-2 rounded-lg border border-[rgba(240,236,228,0.1)] text-[rgba(240,236,228,0.65)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="text-[12px] px-4 py-2 rounded-lg border border-[rgba(240,236,228,0.2)] text-[#f0ece4] bg-[rgba(240,236,228,0.12)]"
          >
            Apply crop
          </button>
        </div>
      </div>
    </div>
  );
}