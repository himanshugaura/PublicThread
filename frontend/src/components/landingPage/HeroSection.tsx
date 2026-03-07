"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "../ui/animated-list";

interface DiscussionThread {
  title: string;
  channel: string;
  status: "live" | "upcoming";
  members: number;
  replies: number;
  icon: string;
  color: string;
  borderColor: string;
}

let discussions: DiscussionThread[] = [
  {
    title: "Is AI a boon or a bane?",
    channel: "#tech-debates",
    status: "live",
    members: 48,
    replies: 312,
    icon: "🤖",
    color: "rgba(239, 68, 68, 0.15)",
    borderColor: "rgba(239, 68, 68, 0.25)",
  },
  {
    title: "Remote work killed creativity — hot take?",
    channel: "#workplace",
    status: "live",
    members: 32,
    replies: 187,
    icon: "🏠",
    color: "rgba(245, 158, 11, 0.15)",
    borderColor: "rgba(245, 158, 11, 0.25)",
  },
  {
    title: "Tailwind vs vanilla CSS in 2026",
    channel: "#frontend",
    status: "upcoming",
    members: 24,
    replies: 0,
    icon: "🎨",
    color: "rgba(14, 165, 233, 0.15)",
    borderColor: "rgba(14, 165, 233, 0.25)",
  },
  {
    title: "Should bootcamps replace CS degrees?",
    channel: "#careers",
    status: "live",
    members: 56,
    replies: 243,
    icon: "🎓",
    color: "rgba(168, 85, 247, 0.15)",
    borderColor: "rgba(168, 85, 247, 0.25)",
  },
  {
    title: "Open source is broken — let's fix funding",
    channel: "#opensource",
    status: "upcoming",
    members: 12,
    replies: 0,
    icon: "💡",
    color: "rgba(16, 185, 129, 0.15)",
    borderColor: "rgba(16, 185, 129, 0.25)",
  },
  {
    title: "Rust will replace everything — agree or disagree?",
    channel: "#languages",
    status: "live",
    members: 41,
    replies: 198,
    icon: "🦀",
    color: "rgba(251, 146, 60, 0.15)",
    borderColor: "rgba(251, 146, 60, 0.25)",
  },
  {
    title: "Design systems are overengineered",
    channel: "#design",
    status: "upcoming",
    members: 8,
    replies: 0,
    icon: "🧩",
    color: "rgba(236, 72, 153, 0.15)",
    borderColor: "rgba(236, 72, 153, 0.25)",
  },
  {
    title: "Web3 is dead or just sleeping?",
    channel: "#crypto",
    status: "live",
    members: 18,
    replies: 89,
    icon: "⛓️",
    color: "rgba(99, 102, 241, 0.15)",
    borderColor: "rgba(99, 102, 241, 0.25)",
  },
];

discussions = Array.from({ length: 10 }, () => discussions).flat();

const statusConfig = {
  live: {
    label: "live",
    dot: "bg-emerald-400",
    text: "text-emerald-400/80",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/15",
    animate: true,
  },
  upcoming: {
    label: "upcoming",
    dot: "bg-violet-400",
    text: "text-violet-400/80",
    bg: "bg-violet-400/10",
    border: "border-violet-400/15",
    animate: false,
  },
};

function DiscussionCard({
  title,
  channel,
  status,
  members,
  replies,
  icon,
  color,
  borderColor,
}: DiscussionThread) {
  const s = statusConfig[status];

  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-xl p-0",
        "transition-all duration-200 ease-in-out hover:scale-[101%]",
        "transform-gpu"
      )}
    >
      <div
        className="
          flex items-start gap-3 px-4 py-3.5 rounded-xl w-full
          bg-[rgba(240,236,228,0.03)]
          border border-[rgba(240,236,228,0.08)]
          backdrop-blur-md
          shadow-[0_2px_12px_rgba(0,0,0,0.2)]
          transition-all duration-300
          hover:bg-[rgba(240,236,228,0.06)]
          hover:border-[rgba(240,236,228,0.15)]
        "
      >
        {/* Channel icon */}
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg text-base shrink-0 mt-0.5"
          style={{
            background: color,
            border: `1px solid ${borderColor}`,
          }}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <p className="text-[13px] font-medium text-[#f0ece4] truncate leading-snug">
            {title}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {/* Status badge */}
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border",
                s.bg,
                s.border,
                s.text
              )}
            >
              <span
                className={cn("w-1.5 h-1.5 rounded-full", s.dot, {
                  "animate-pulse": s.animate,
                })}
              />
              {s.label}
            </span>

            {/* Members */}
            <span className="inline-flex items-center gap-1 text-[11px] text-[rgba(240,236,228,0.35)]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {members} joined
            </span>

            <span className="text-[rgba(240,236,228,0.15)]">·</span>

            {/* Replies for live, or starts soon for upcoming */}
            {status === "live" ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-[rgba(240,236,228,0.35)]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-60"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {replies} replies
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] text-[rgba(240,236,228,0.35)]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-60"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                starts soon
              </span>
            )}

            <span className="text-[rgba(240,236,228,0.15)]">·</span>

            {/* Channel */}
            <span className="text-[11px] text-[rgba(240,236,228,0.25)]">
              {channel}
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function HeroSection() {
  return (
    <div className="flex-1 flex items-center px-13 pb-16 gap-12">
      {/* Left side — text content */}
      <div className="flex-1 flex flex-col justify-center">
        <h1
          className="
            font-normal
            text-[clamp(56px,7vw,96px)] leading-[0.95]
            text-[#f0ece4] tracking-[-0.02em]
            animate-[fadeUp_1s_0.2s_both]
          "
        >
          Where ideas
          <br />
          become
          <br />
          <span className="text-[rgba(240,236,228,0.35)]">conversations</span>
        </h1>

        <p
          className="
            font-light text-[16px] leading-[1.8]
            text-[rgba(240,236,228,0.4)] mt-8 max-w-lg
            animate-[fadeUp_1s_0.4s_both]
          "
        >
          Create channels, start discussion rooms, and post threads that spark
          real conversations. Open, public, and built for communities that think
          out loud.
        </p>

        <div className="flex gap-3.5 mt-12 animate-[fadeUp_1s_0.55s_both]">
          <button
            className="
              text-sm tracking-[0.04em] px-7 py-3
              bg-[rgba(240,236,228,0.1)] text-[#f0ece4]
              border border-[rgba(240,236,228,0.15)] rounded-[10px]
              backdrop-blur-[16px]
              shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.3)]
              transition-all duration-200 cursor-pointer
              hover:bg-[rgba(240,236,228,0.18)]
              hover:border-[rgba(240,236,228,0.25)]
              hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.4)]
            "
          >
            Start a Thread
          </button>
          <button
            className="
              text-sm tracking-[0.04em] px-7 py-3
              bg-[rgba(255,255,255,0.04)] text-[rgba(240,236,228,0.55)]
              border border-[rgba(240,236,228,0.1)] rounded-[10px]
              backdrop-blur-[12px]
              shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_0_rgba(255,255,255,0.05),0_4px_16px_rgba(0,0,0,0.2)]
              transition-all duration-200 cursor-pointer
              hover:bg-[rgba(255,255,255,0.08)]
              hover:border-[rgba(240,236,228,0.2)]
              hover:text-[rgba(240,236,228,0.9)]
              hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_28px_rgba(0,0,0,0.35)]
            "
          >
            Explore Channels
          </button>
        </div>
      </div>

      {/* Right side — live discussion feed */}
      <div className="flex-1 flex justify-center items-center animate-[fadeUp_1s_0.6s_both]">
        <div className="relative w-full max-w-sm">
          {/* Subtle glow behind the card stack */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20 rounded-full bg-gradient-to-br from-emerald-500/30 via-transparent to-indigo-500/20" />

          {/* Header label */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-[rgba(240,236,228,0.35)] tracking-[0.08em] uppercase">
              Explore live Discussions
            </span>
          </div>

          {/* Fixed-height container — same pattern as TrendingList */}
          <div className="relative flex h-[380px] w-full flex-col overflow-hidden">
            <AnimatedList delay={2500}>
              {discussions.map((item, idx) => (
                <DiscussionCard key={idx} {...item} />
              ))}
            </AnimatedList>

            {/* Fade-out gradient at bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0a0a]" />
          </div>
        </div>
      </div>
    </div>
  );
}