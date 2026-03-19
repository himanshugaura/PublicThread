"use client";

import React from "react";

export default function TextField({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  min,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  min?: string;
}) {
  return (
    <input
      type={type}
      min={min}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 text-[14px] bg-[rgba(255,255,255,0.02)] text-[#f0ece4] border border-[rgba(240,236,228,0.07)] rounded-xl placeholder:text-[rgba(240,236,228,0.2)] outline-none transition-all duration-200 focus:border-[rgba(240,236,228,0.15)] focus:bg-[rgba(255,255,255,0.04)] ${className}`}
    />
  );
}