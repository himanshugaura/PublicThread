"use client";

const features = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,228,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" />
      </svg>
    ),
    title: "Discussion Channels",
    desc: "Create topic-based channels for your community. From tech to philosophy — every idea gets its own space.",
    footer: (
      <div className="flex gap-2">
        {["#design", "#startups", "#philosophy"].map((tag) => (
          <span key={tag} className="text-[11px] px-2.5 py-1 rounded-md bg-[rgba(240,236,228,0.04)] text-[rgba(240,236,228,0.3)] border border-[rgba(240,236,228,0.06)]">
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,228,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Live Rooms",
    desc: "Join or create live discussion rooms. Real-time conversations with people who care about the same things.",
    footer: (
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0a]" style={{ background: `hsl(${i * 60 + 200}, 30%, ${35 + i * 5}%)` }} />
          ))}
        </div>
        <span className="text-[11px] text-[rgba(240,236,228,0.3)]">12 rooms active</span>
      </div>
    ),
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,228,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Public Threads",
    desc: "Post long-form threads visible to everyone. Share ideas, get feedback, and build on each other's thinking.",
    footer: (
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[rgba(240,236,228,0.3)]">847 threads this week</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,228,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    ),
  },
];

export default function FeatureCards() {
  return (
    <div className="px-13 py-24">
      <div className="grid grid-cols-3 gap-5">
        {features.map((card, i) => (
          <div key={i} className="group p-7 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(240,236,228,0.07)] backdrop-blur-[8px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(240,236,228,0.12)]">
            <div className="w-10 h-10 rounded-xl bg-[rgba(240,236,228,0.06)] border border-[rgba(240,236,228,0.08)] flex items-center justify-center mb-5 group-hover:bg-[rgba(240,236,228,0.1)] transition-colors duration-300">
              {card.icon}
            </div>
            <h3 className="text-[15px] font-normal text-[#f0ece4] tracking-[-0.01em] mb-2.5">{card.title}</h3>
            <p className="text-[13px] leading-[1.7] text-[rgba(240,236,228,0.35)] font-light">{card.desc}</p>
            <div className="mt-5 pt-5 border-t border-[rgba(240,236,228,0.05)]">{card.footer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}