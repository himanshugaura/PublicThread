"use client";

export default function SectionLabel({
  label,
  required,
  hint,
}: {
  label: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <>
      <label className="text-[13px] text-[rgba(240,236,228,0.5)] tracking-[0.03em]">
        {label} {required ? <span className="text-red-400/60">*</span> : null}
      </label>
      {hint ? (
        <p className="text-[11px] text-[rgba(240,236,228,0.2)] -mt-1">{hint}</p>
      ) : null}
    </>
  );
}