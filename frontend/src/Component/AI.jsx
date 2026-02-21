import React, { useRef, useState, useEffect } from "react";
import { CalendarDays, Users, BarChart3 } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ${delay}ms ease, transform 0.75s ${delay}ms ease`,
      }}
    >
      {children}
    </div>
  );
}

const STATS = [
  { value: "99.8%",    label: "AI Accuracy" },
  { value: "<200ms",   label: "Response Latency" },
  { value: "24/7",     label: "Active Processing" },
  { value: "3",        label: "AI Modules" },
];

const CARDS = [
  {
    icon: CalendarDays,
    tag: "Scheduling",
    number: "01",
    title: "AI Schedule Management",
    desc: "Intelligent scheduling engine that optimizes training sessions, matches, and event coordination based on performance data and availability metrics.",
    highlights: ["Smart Scheduling", "Availability Sync", "Event Coordination"],
  },
  {
    icon: Users,
    tag: "Recruitment",
    number: "02",
    title: "AI Player Recommendation",
    desc: "Data-driven scouting system that recommends players based on KPIs, playstyle compatibility, and predictive performance indicators.",
    highlights: ["KPI Matching", "Playstyle Analysis", "Predictive Scouting"],
  },
  {
    icon: BarChart3,
    tag: "Analytics",
    number: "03",
    title: "AI Skill Analysis",
    desc: "Real-time skill evaluation and performance tracking with predictive analytics to support player growth and competitive advantage.",
    highlights: ["Real-Time Tracking", "Skill Evaluation", "Growth Metrics"],
  },
];

const AI = () => {
  return (
    <section id="ai" className="relative bg-[#7b5aa6] text-white py-28 overflow-hidden">

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

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <FadeIn className="text-center mb-16">
          <p className="inline-flex items-center gap-3 uppercase tracking-[0.38em] text-[10px] font-semibold text-purple-200 mb-5">
            <span className="block w-7 h-px bg-purple-300" />
            Artificial Intelligence
            <span className="block w-7 h-px bg-purple-300" />
          </p>

          <h2 className="text-4xl md:text-[56px] font-extrabold leading-[1.05] tracking-tight mb-5">
            The EsportM <span className="text-purple-200">AI</span>
          </h2>

          <div className="flex justify-center items-center gap-3 mb-7">
            <div className="w-24 h-px bg-white/20" />
            <div className="w-2.5 h-2.5 bg-white/50 rotate-45 flex-shrink-0" />
            <div className="w-24 h-px bg-white/20" />
          </div>

          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Advanced artificial intelligence system designed to optimize
            scheduling, player recruitment, and performance analytics
            within the esports ecosystem.
          </p>
        </FadeIn>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-3 gap-7">
          {CARDS.map(({ icon: Icon, tag, number, title, desc, highlights }, i) => (
            <FadeIn key={title} delay={i * 110}>
              <div className="group cursor-pointer relative bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden h-full flex flex-col hover:bg-white/15 hover:-translate-y-2 transition-all duration-300">

                {/* Animated top border — same as Marketplace */}
                <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-white/70 to-white/20 transition-all duration-500" />

                <div className="p-8 flex flex-col flex-1">

                  {/* Icon + Tag row */}
                  <div className="flex items-start justify-between mb-7">
                    <div className="cursor-pointer w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors duration-300 flex-shrink-0">
                      <Icon size={24} strokeWidth={1.7} className="text-white" />
                    </div>
                    <span className="cursor-pointer text-[10px] font-semibold uppercase tracking-widest text-purple-200 bg-white/10 border border-white/15 px-3 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                      {tag}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-purple-200 transition-colors duration-300">{title}</h3>
                  <p className="text-sm text-purple-100/80 leading-relaxed flex-1 group-hover:text-purple-100 transition-colors duration-300">{desc}</p>

                  {/* Highlight chips — same as Marketplace */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {highlights.map((h) => (
                      <span
                        key={h}
                        className="cursor-pointer text-[10px] font-semibold uppercase tracking-wide text-purple-200 bg-white/10 border border-white/15 px-2.5 py-1 rounded-md hover:bg-white/20 transition-colors duration-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AI;