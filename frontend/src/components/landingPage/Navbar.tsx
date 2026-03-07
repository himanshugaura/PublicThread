    "use client";

    import { Bitcount } from "next/font/google";
    const bitcount = Bitcount({
    subsets: ["latin"],
    weight: "400",
    });
    export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-13 py-5">
        <div className="flex items-center gap-2.5">
            <span
            className={`${bitcount.className} font-normal text-2xl  tracking-[0.01em]`}
            >
            PublicThread
            </span>
        </div>


        <div className="flex gap-4 items-center">
            <a
            href="#"
            className="text-2 text-[rgba(240,236,228,0.4)] tracking-[0.03em] no-underline transition-colors duration-200 hover:text-[rgba(240,236,228,0.85)]"
            >
            Log In
            </a>
            <button
            className="
                text-[13px] tracking-[0.04em] px-5.5 py-2.25
                text-[#f0ece4]
                border border-[rgba(240,236,228,0.15)] rounded-lg
                backdrop-blur-[2px]
                shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.25)]
                transition-all duration-200 cursor-pointer
                hover:bg-[rgba(240,236,228,0.18)]
                hover:border-[rgba(240,236,228,0.25)]
                hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_28px_rgba(0,0,0,0.35)]
            "
            >
            Get Started
            </button>
        </div>
        </nav>
    );
    }
