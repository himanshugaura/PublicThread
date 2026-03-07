"use client";

export default function Footer() {
  return (
    <footer className="px-13 py-12 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-md bg-[rgba(240,236,228,0.06)] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,228,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </div>
        <span className="text-[13px] text-[rgba(240,236,228,0.25)]">PublicThread</span>
      </div>
      <div className="flex gap-8">
        {["Terms", "Privacy", "Docs", "GitHub", "Twitter"].map((n) => (
          <a key={n} href="#" className="text-[12px] text-[rgba(240,236,228,0.25)] no-underline transition-colors duration-200 hover:text-[rgba(240,236,228,0.6)]">{n}</a>
        ))}
      </div>
      <span className="text-[12px] text-[rgba(240,236,228,0.15)]">© 2026 PublicThread</span>
    </footer>
  );
}   