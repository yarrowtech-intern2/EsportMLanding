import React, { useEffect, useState, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import Img1 from "../assets/Img 1.jpg";
import Img2 from "../assets/img2.jpg";
import Img3 from "../assets/Img3.jpg";

const SLIDES = [
  { img: Img1, keyword: "COMPETE",  sub: "Join elite competitions worldwide",  num: "01" },
  { img: Img2, keyword: "DOMINATE", sub: "Rise above the competition",          num: "02" },
  { img: Img3, keyword: "CONQUER",  sub: "Claim your championship title",       num: "03" },
];

const DURATION = 5000;

export default function Hero() {
  const [active,    setActive]   = useState(0);
  const [progress,  setProgress] = useState(0);
  const [loaded,    setLoaded]   = useState(false);
  const timerRef    = useRef(null);
  const progressRef = useRef(null);

  const goNext = () => { setActive(p => (p + 1) % SLIDES.length); setProgress(0); };
  const goTo   = (i) => { if (i === active) return; setActive(i); setProgress(0); };

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setProgress(0);
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const el = ts - start;
      setProgress(Math.min((el / DURATION) * 100, 100));
      if (el < DURATION) progressRef.current = requestAnimationFrame(animate);
    };
    progressRef.current = requestAnimationFrame(animate);
    timerRef.current = setTimeout(goNext, DURATION);
    return () => {
      cancelAnimationFrame(progressRef.current);
      clearTimeout(timerRef.current);
    };
  }, [active]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Tenor+Sans&family=Playfair+Display:ital,wght@1,400;1,700&display=swap');

        @keyframes kenburns {
          from { transform: scale(1) translateX(0); }
          to   { transform: scale(1.1) translateX(-20px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,197,24,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(245,197,24,0); }
        }

        .slide-img { animation: kenburns 10s ease-out forwards; }

        .fadein-0 { animation: fadeUp 0.9s 0.1s cubic-bezier(0.16,1,0.3,1) both; }
        .fadein-1 { animation: fadeUp 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) both; }
        .fadein-2 { animation: fadeUp 0.9s 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .fadein-3 { animation: fadeUp 0.9s 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .fadein-4 { animation: fadeUp 0.9s 0.9s cubic-bezier(0.16,1,0.3,1) both; }

        .keyword-anim { animation: fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both; }

        .sep-anim {
          transform-origin: center;
          animation: slideRight 1s 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }

        .btn-primary-gold {
          background: linear-gradient(120deg, #F5C518 0%, #ffe066 40%, #F5C518 80%);
          background-size: 200% auto;
          transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.25s ease;
        }
        .btn-primary-gold:hover {
          background-position: right center;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 40px rgba(245,197,24,0.55), 0 0 0 1px rgba(245,197,24,0.25);
        }

        .btn-outline-hero {
          transition: all 0.25s ease;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(8px);
        }
        .btn-outline-hero:hover {
          background: rgba(245,197,24,0.08);
          border-color: rgba(245,197,24,0.7) !important;
          color: #F5C518 !important;
          transform: translateY(-2px);
        }

        .live-pulse { animation: pulse-gold 2s ease-in-out infinite; }
        .vert { writing-mode: vertical-rl; transform: rotate(180deg); }

        .noise {
          position: absolute; inset: 0; pointer-events: none; z-index: 23;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px;
        }
        .brand-font { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .sub-font   { font-family: 'Playfair Display', serif; }
        .body-font  { font-family: 'Tenor Sans', sans-serif; }

        .corner-tl { border-top: 1px solid rgba(255,255,255,0.15); border-left:  1px solid rgba(255,255,255,0.15); }
        .corner-tr { border-top: 1px solid rgba(255,255,255,0.15); border-right: 1px solid rgba(255,255,255,0.15); }
        .corner-bl { border-bottom: 1px solid rgba(255,255,255,0.15); border-left:  1px solid rgba(255,255,255,0.15); }
        .corner-br { border-bottom: 1px solid rgba(255,255,255,0.15); border-right: 1px solid rgba(255,255,255,0.15); }

        .glow-accent {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .content-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(245, 197, 24, 0.15);
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .accent-bar {
          animation: float-up 4s ease-in-out infinite;
        }

        .smooth-slide {
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <section id="home" className="relative w-full h-screen overflow-hidden bg-black">

        {/* ── Slides ── */}
        {SLIDES.map((slide, i) => (
          <div key={i} className={`absolute inset-0 smooth-slide ${i === active ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
            <img
              src={slide.img}
              alt={slide.keyword}
              className={`w-full h-full object-cover ${i === active ? "slide-img" : ""}`}
            />
          </div>
        ))}

        {/* ── Overlays (same as original) ── */}
        <div className="absolute inset-0 bg-black/50 z-20" />
        <div className="absolute inset-0 z-20" style={{ background: "linear-gradient(115deg, rgba(90,17,112,0.82) 0%, rgba(255,238,0,0.35) 55%, rgba(0,0,0,0.08) 100%)" }} />
        <div className="absolute inset-0 z-20" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 45%)" }} />
        <div className="absolute inset-0 z-20" style={{ background: "linear-gradient(to top, transparent 60%, rgba(0,0,0,0.4) 100%)" }} />
        <div className="noise" />

        {/* ── Corner brackets ── */}
        <div className="corner-tr absolute top-5 right-5 w-7 h-7 z-30 pointer-events-none" />
        <div className="corner-br absolute bottom-5 right-5 w-7 h-7 z-30 pointer-events-none" />

        {/* ── Top bar ── */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-10 sm:px-16 pt-9">
          <div className={`${loaded ? "fadein-0" : "opacity-0"} flex items-center gap-3`}>
            <span className="sub-font italic text-yellow-400/80 text-sm tracking-wide">{SLIDES[active].num}</span>
            <div className="w-6 h-px bg-white/20" />
            <span className="sub-font italic text-white/25 text-sm tracking-wide">{String(SLIDES.length).padStart(2,"0")}</span>
          </div>
        </div>



        {/* ── Right vertical keyword ── */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-3 pointer-events-none">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-yellow-400/40" />
          <span key={active} className="vert keyword-anim brand-font text-[10px] tracking-[0.4em] text-yellow-400/40">
            {SLIDES[active].keyword}
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-yellow-400/40 to-transparent" />
        </div>

        {/* ── Main Content — CENTER ── */}
        <div className="relative z-30 flex items-center justify-center h-full px-6 sm:px-12">
          <div className="w-full max-w-3xl flex flex-col items-center text-center">

            {/* Eyebrow */}
            <div className={`${loaded ? "fadein-1" : "opacity-0"} flex items-center gap-4 mb-7`}>
              <div className="sep-anim w-8 h-px bg-yellow-400" />
              <span className="body-font text-yellow-400 text-[9px] tracking-[0.4em] uppercase">
                Electronic Sport Management
              </span>
              <div className="sep-anim w-8 h-px bg-yellow-400" />
            </div>

            {/* Giant brand */}
            <div className={`${loaded ? "fadein-2" : "opacity-0"}`}>
              <h1
                className="brand-font text-white leading-none"
                style={{
                  fontSize: "clamp(72px, 14vw, 160px)",
                  textShadow: "0 2px 0 rgba(0,0,0,0.5), 0 8px 48px rgba(0,0,0,0.6)"
                }}
              >
                Esport<span className="text-yellow-400" style={{ fontFamily: "'Playfair Display',serif", fontStyle:"italic", fontWeight:700, fontSize:"0.68em", verticalAlign:"super" }}>M</span>
              </h1>
            </div>

            {/* Italic slide subtitle */}
            <div className="overflow-hidden h-7 mb-2 mt-1">
              <p key={active} className="keyword-anim sub-font italic text-white/40 text-base tracking-wide">
                {SLIDES[active].sub}
              </p>
            </div>

            {/* Gold thin rule — centered */}
            <div className={`${loaded ? "fadein-2" : "opacity-0"} mb-7 flex justify-center`}>
              <div className="h-px w-14" style={{ background: "linear-gradient(to right, transparent, rgba(245,197,24,0.6), transparent)" }} />
            </div>

            {/* Description */}
            <p
              className={`${loaded ? "fadein-3" : "opacity-0"} body-font text-white/70 leading-relaxed mb-10`}
              style={{ fontSize: "clamp(13px,1.45vw,15px)", maxWidth: 440, letterSpacing: "0.03em" }}
            >
              A next-generation esports management platform that connects players,
              clubs, and tournaments with professional-grade tools and analytics.
            </p>

            {/* CTA row */}
            <div className={`${loaded ? "fadein-4" : "opacity-0"} flex items-center justify-center gap-5 flex-wrap`}>
              <button
                onClick={() => { const s = document.getElementById("contact"); s?.scrollIntoView({ behavior:"smooth" }); }}
                className="btn-primary-gold body-font text-black font-bold uppercase tracking-[0.22em] px-9 py-[14px] rounded-full cursor-pointer border-0 outline-none text-[11px]"
              >
                Get Started
              </button>
              <button
                onClick={() => { const s = document.getElementById("ai"); s?.scrollIntoView({ behavior:"smooth" }); }}
                className="btn-outline-hero body-font text-white/80 font-medium uppercase tracking-[0.22em] px-8 py-[13px] rounded-full cursor-pointer outline-none text-[11px] border border-white/20 inline-flex items-center gap-2"
              >
                Learn More
                <FiChevronRight className="text-base opacity-70" />
              </button>
            </div>

          </div>
        </div>

        {/* ── Bottom panel ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 flex items-end justify-between px-10 sm:px-16 pb-9">

          {/* Bottom right — current slide label */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-px h-5 bg-white/15" />
            <span key={active} className="keyword-anim body-font text-[9px] tracking-[0.3em] uppercase text-white/30">
              {SLIDES[active].keyword}
            </span>
          </div>

        </div>

      </section>
    </>
  );
}