"use client";

import SectionLabel from "./SectionLabel";

export default function TagInput({
  label,
  hint,
  items,
  setItems,
  inputValue,
  setInputValue,
  placeholder,
  pillClassName,
  removeBtnClassName,
  addBtnClassName,
  addIconStrokeClass = "rgba(240,236,228,0.5)",
  prefix,
}: {
  label: string;
  hint?: string;
  items: string[];
  setItems: (v: string[]) => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  placeholder: string;
  pillClassName: string;
  removeBtnClassName: string;
  addBtnClassName: string;
  addIconStrokeClass?: string;
  prefix?: string;
}) {
  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) setItems([...items, trimmed]);
    setInputValue("");
  };

  const removeTag = (val: string) => setItems(items.filter((i) => i !== val));

  return (
    <div className="flex flex-col gap-2.5">
      <SectionLabel label={label} hint={hint} />
      <div
        className={`
          w-full min-h-[48px] px-3 py-2.5 flex flex-wrap items-center gap-2 bg-[rgba(255,255,255,0.02)] border rounded-xl transition-all duration-200
          ${items.length > 0 || inputValue
            ? "border-[rgba(240,236,228,0.12)]"
            : "border-[rgba(240,236,228,0.07)]"
          }
          focus-within:border-[rgba(240,236,228,0.15)] focus-within:bg-[rgba(255,255,255,0.04)]
        `}
      >
        {items.map((item) => (
          <span key={item} className={`flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg border ${pillClassName}`}>
            {prefix ? `${prefix}${item}` : item}
            <button type="button" onClick={() => removeTag(item)} className={`ml-0.5 cursor-pointer transition-colors ${removeBtnClassName}`}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </span>
        ))}

        <div className="flex items-center gap-1.5 flex-1 min-w-[160px]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              if (val.endsWith(",")) {
                const trimmed = val.slice(0, -1).trim();
                if (trimmed && !items.includes(trimmed)) setItems([...items, trimmed]);
                setInputValue("");
              } else {
                setInputValue(val);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
              if (e.key === "Backspace" && inputValue === "" && items.length > 0) {
                setItems(items.slice(0, -1));
              }
            }}
            placeholder={items.length === 0 ? placeholder : "Add more..."}
            className="flex-1 bg-transparent text-[14px] text-[#f0ece4] placeholder:text-[rgba(240,236,228,0.2)] outline-none"
          />

          {inputValue.trim() !== "" && (
            <button
              type="button"
              onClick={addTag}
              className={`flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center cursor-pointer transition-all duration-150 active:scale-95 ${addBtnClassName}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={addIconStrokeClass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}