"use client";

export default function CTASection() {
  return (
    <div className="px-13 py-32 text-center">
      <h2 className="text-[clamp(36px,5vw,64px)] text-[#f0ece4] leading-[1] tracking-[-0.02em] mb-5">Join the conversation</h2>
      <p className="text-[15px] text-[rgba(240,236,228,0.35)] font-light max-w-md mx-auto leading-[1.7] mb-10">Thousands of people are already sharing ideas, debating, and building together. Your voice matters.</p>
      <div className="flex gap-3.5 justify-center">
        <button className="text-sm tracking-[0.04em] px-8 py-3.5 bg-[rgba(240,236,228,0.1)] text-[#f0ece4] border border-[rgba(240,236,228,0.15)] rounded-[10px] backdrop-blur-[16px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-200 cursor-pointer hover:bg-[rgba(240,236,228,0.18)] hover:border-[rgba(240,236,228,0.25)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.4)]">
          Create Free Account
        </button>
        <button className="text-sm tracking-[0.04em] px-8 py-3.5 bg-[rgba(255,255,255,0.04)] text-[rgba(240,236,228,0.55)] border border-[rgba(240,236,228,0.1)] rounded-[10px] backdrop-blur-[12px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_0_rgba(255,255,255,0.05),0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200 cursor-pointer hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(240,236,228,0.2)] hover:text-[rgba(240,236,228,0.9)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_28px_rgba(0,0,0,0.35)]">
          Browse as Guest
        </button>
      </div>
    </div>
  );
}