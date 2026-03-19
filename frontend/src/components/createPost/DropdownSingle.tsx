"use client";

import { useEffect, useRef } from "react";

export default function DropdownSingle({
  open,
  setOpen,
  value,
  placeholder,
  options,
  onSelect,
  renderLabel,
  widthClass = "w-72",
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  value: string;
  placeholder: string;
  options: string[];
  onSelect: (v: string) => void;
  renderLabel?: (v: string) => string;
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
          ${value
            ? "bg-[rgba(240,236,228,0.04)] text-[#f0ece4] border-[rgba(240,236,228,0.12)]"
            : "bg-[rgba(255,255,255,0.02)] text-[rgba(240,236,228,0.2)] border-[rgba(240,236,228,0.07)]"
          }
        `}
      >
        <span>{value ? (renderLabel ? renderLabel(value) : value) : placeholder}</span>
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
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <button
                type="button"
                key={opt}
                onClick={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2.5 text-[13px] transition-colors duration-150 cursor-pointer
                  ${isSelected
                    ? "text-[#f0ece4] bg-[rgba(240,236,228,0.06)]"
                    : "text-[rgba(240,236,228,0.45)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[rgba(240,236,228,0.7)]"
                  }
                `}
              >
                {renderLabel ? renderLabel(opt) : opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}