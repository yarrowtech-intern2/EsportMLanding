import React, { useRef, useState, useEffect } from "react";
import { TrendingUp, Video, BarChart3 } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", direction = "up" }) {
  const [ref, visible] = useInView();
  
  const getTransform = () => {
    if (!visible) {
      if (direction === "left") return "translateX(-40px)";
      if (direction === "right") return "translateX(40px)";
      return "translateY(28px)";
    }
    return "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ${delay}ms ease-out, transform 0.8s ${delay}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      {children}
    </div>
  );
}

const STEPS = [
  {
    icon: Video,
    number: "01",
    tag: "Highlights",
    title: "Match Highlights",
    desc: "Upload gameplay clips, tournament highlights, and performance breakdown videos to demonstrate in-game capabilities and strategic skills.",
    highlights: ["Gameplay Clips", "Tournament Reels", "Strategy Breakdown"],
  },
  {
    icon: BarChart3,
    number: "02",
    tag: "Analytics",
    title: "Skill Progression Analytics",
    desc: "Track improvement through structured performance metrics, ranking evolution, win ratios, and skill evaluation trends.",
    highlights: ["Performance Metrics", "Ranking Evolution", "Win Ratios"],
  },
  {
    icon: TrendingUp,
    number: "03",
    tag: "Career",
    title: "Career Growth Record",
    desc: "Maintain a verified professional timeline showcasing tournament participation, awards, achievements, and competitive milestones.",
    highlights: ["Tournament History", "Awards & Titles", "Milestones"],
  },
];

const Timeline = () => {
  return (
    <section id="timeline" className="relative bg-[#7b5aa6] text-white py-28 overflow-hidden">

      {/* ── Background decorations ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <div className="absolute -top-28 -right-28 w-[440px] h-[440px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[360px] h-[360px] bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 z-20">

        {/* ── Header ── */}
        <FadeIn className="text-center mb-16">
          <p className="inline-flex items-center gap-3 uppercase tracking-[0.38em] text-[10px] font-semibold text-purple-200 mb-5">
            <span className="block w-7 h-px bg-purple-300" />
            Player Journey
            <span className="block w-7 h-px bg-purple-300" />
          </p>

          <h2 className="text-4xl md:text-[56px] font-extrabold leading-[1.05] tracking-tight mb-5">
            The EsportM <span className="text-purple-200">Timeline</span>
          </h2>

          <div className="flex justify-center items-center gap-3 mb-7">
            <div className="w-24 h-px bg-white/20" />
            <div className="w-2.5 h-2.5 bg-white/50 rotate-45 flex-shrink-0" />
            <div className="w-24 h-px bg-white/20" />
          </div>

          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            A structured performance timeline allowing players to
            showcase skill progression, match highlights, and
            competitive achievements in a chronological format.
          </p>
        </FadeIn>



        {/* ── Timeline Steps ── */}
        <div className="grid md:grid-cols-3 gap-7">
          {STEPS.map(({ icon: Icon, number, tag, title, desc, highlights }, i) => {
            const direction = i % 2 === 0 ? "left" : "right";
            return (
              <FadeIn key={title} delay={i * 120} direction={direction}>
                <div className="group cursor-pointer relative bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden hover:bg-white/15 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
  
                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-white/70 to-white/20 transition-all duration-500" />
  
                  <div className="p-8 flex flex-col h-full flex-1">
  
                    {/* Icon + Tag row */}
                    <div className="flex items-start justify-between mb-7">
                      <div className="cursor-pointer w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors duration-300 flex-shrink-0">
                        <Icon size={24} strokeWidth={1.7} className="text-white" />
                      </div>
                      <span className="cursor-pointer text-[10px] font-semibold uppercase tracking-widest text-purple-200 bg-white/10 border border-white/15 px-3 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                        {tag}
                      </span>
                    </div>
  
                    {/* Text content */}
                    <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-purple-200 transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-sm text-purple-100/80 leading-relaxed mb-6 flex-1 group-hover:text-purple-100 transition-colors duration-300">
                      {desc}
                    </p>
  
                    {/* Highlight chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {highlights.map((h) => (
                        <span
                          key={h}
                          className="cursor-pointer text-[10px] font-semibold uppercase tracking-wide text-purple-200 bg-white/10 border border-white/15 px-2.5 py-1 rounded-md hover:bg-white/20 hover:text-white transition-all duration-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;