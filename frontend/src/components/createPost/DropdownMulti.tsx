"use client";

import { useEffect, useRef } from "react";

export default function DropdownMulti({
  open,
  setOpen,
  selected,
  options,
  onToggle,
  onClear,
  widthClass = "w-72",
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  selected: string[];
  options: string[];
  onToggle: (v: string) => void;
  onClear: () => void;
  widthClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setOpen]);

  return (
    <div ref={ref} className={`relative ${widthClass}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          w-full flex items-center justify-between px-4 py-3 text-[14px] rounded-xl border transition-all duration-200 cursor-pointer
          ${selected.length > 0
            ? "bg-[rgba(240,236,228,0.04)] text-[#f0ece4] border-[rgba(240,236,228,0.12)]"
            : "bg-[rgba(255,255,255,0.02)] text-[rgba(240,236,228,0.2)] border-[rgba(240,236,228,0.07)]"
          }
        `}
      >
        <span>{selected.length > 0 ? `${selected.length} selected` : "Select languages"}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-full max-h-64 overflow-y-auto rounded-xl bg-[#111111] border border-[rgba(240,236,228,0.1)] shadow-[0_16px_48px_rgba(0,0,0,0.5)] z-[100] py-2">
          {selected.length > 0 && (
            <>
              <button
                type="button"
                onClick={onClear}
                className="w-full text-left px-4 py-2 text-[12px] text-red-400/60 hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150 cursor-pointer"
              >
                Clear all
              </button>
              <div className="w-full h-px bg-[rgba(240,236,228,0.06)] my-1" />
            </>
          )}

          {options.map((lang) => {
            const isSelected = selected.includes(lang);
            return (
              <button
                type="button"
                key={lang}
                onClick={() => onToggle(lang)}
                className={`
                  w-full text-left px-4 py-2.5 text-[13px] flex items-center gap-3 transition-colors duration-150 cursor-pointer
                  ${isSelected
                    ? "text-[#f0ece4] bg-[rgba(240,236,228,0.06)]"
                    : "text-[rgba(240,236,228,0.45)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[rgba(240,236,228,0.7)]"
                  }
                `}
              >
                <div
                  className={`
                    w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-all duration-150
                    ${isSelected
                      ? "bg-[rgba(240,236,228,0.15)] border-[rgba(240,236,228,0.3)]"
                      : "border-[rgba(240,236,228,0.12)] bg-transparent"
                    }
                  `}
                >
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f0ece4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                {lang}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}