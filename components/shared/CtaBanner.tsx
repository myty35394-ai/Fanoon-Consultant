import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-[#1a1e1b]" style={{ minHeight: "180px" }}>

      {/* Background architecture photo — right half only */}
      <div
        className="absolute inset-y-0 right-0 z-0"
        style={{ width: "55%" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.22 }}
        />
        {/* Fade left edge into dark bg */}
        <div
          className="absolute inset-y-0 left-0 w-2/3"
          style={{
            background:
              "linear-gradient(to right, #1a1e1b 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Content row */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 flex items-center gap-10 py-10">

        {/* ── Decorative Monogram ───────────────────── */}
        <div className="relative flex-shrink-0 hidden md:flex items-center justify-center w-[160px] h-[160px] lg:w-[190px] lg:h-[190px]">
          <Image
            src="/monogram.png"
            alt="Fanoon Monogram"
            fill
            className="object-contain"
          />
        </div>

        {/* ── Text Content ──────────────────────── */}
        <div className="flex-1 min-w-0">
          <h2
            className="font-bold text-white leading-tight mb-3"
            style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
          >
            Let&apos;s Create Something
            <br />
            Extraordinary Together
            <span className="text-primary">.</span>
          </h2>
          <p
            className="text-white/60 leading-relaxed"
            style={{ fontSize: "13px", maxWidth: "420px" }}
          >
            Whether you have a project in mind or just want to explore ideas,
            we would love to hear from you.
          </p>
        </div>

        {/* ── CTA Button ───────────────────────── */}
        <div className="flex-shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:brightness-110 active:scale-95"
            style={{
              background: "var(--color-primary)",
              fontSize: "12px",
              padding: "16px 28px",
              letterSpacing: "0.12em",
            }}
          >
            GET IN TOUCH
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
