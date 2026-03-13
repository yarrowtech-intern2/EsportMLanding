import React, { useRef, useState, useEffect } from "react";
import { Users, ArrowRightLeft, ShieldCheck } from "lucide-react";

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

const CARDS = [
  {
    icon: ShieldCheck,
    tag: "Security",
    title: "Verified Profiles",
    desc: "Every player profile undergoes a rigorous verification process. We confirm identity, age, and professional status to ensure a secure scouting environment.",
    highlights: ["Identity Verification", "Official Badges", "Secure Data"],
  },
  {
    icon: Users,
    tag: "Analytics",
    title: "Performance Metrics",
    desc: "Real-time synchronization of player stats across all major titles. View kill-death ratios, win rates, and objective-based performance analytics.",
    highlights: ["Live API Sync", "Skill Heatmaps", "Rank Comparison"],
  },
  {
    icon: ArrowRightLeft,
    tag: "Legacy",
    title: "Career History",
    desc: "Complete chronological logs of previous team affiliations, tournament placements, and contract durations to provide full transparency into player experience.",
    highlights: ["Team Timeline", "Trophy Room", "Contract Legacy"],
  },
];

const Marketplace = () => {
  return (
    <section id="marketplace" className="relative bg-white py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 z-20">
        <FadeIn className="text-center mb-14">
          <p className="inline-flex items-center gap-3 uppercase tracking-[0.38em] text-[10px] font-semibold text-[#7b5aa6] mb-5">
            <span className="block w-7 h-px bg-[#7b5aa6]" />
            Player Exchange
            <span className="block w-7 h-px bg-[#7b5aa6]" />
          </p>

          <h2 className="text-4xl md:text-[56px] font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-5">
            The EsportM <span className="text-[#7b5aa6]">Marketplace</span>
          </h2>

          <div className="flex justify-center items-center gap-3 mb-7">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#7b5aa6]" />
            <div className="w-2.5 h-2.5 bg-[#7b5aa6] rotate-45 flex-shrink-0" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#7b5aa6]" />
          </div>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            A structured player transfer hub enabling clubs to scout,
            negotiate, and transfer players using transparent,
            AI-supported valuation models.
          </p>
        </FadeIn>

        {/* ── Cards Grid ── */}
        <div className="grid md:grid-cols-3 gap-8">
          {CARDS.map(({ icon: Icon, tag, number, title, desc, highlights }, i) => {
            const direction = i % 2 === 0 ? "left" : "right";
            return (
              <FadeIn key={title} delay={i * 120} direction={direction}>
                <div className="group cursor-pointer relative bg-white rounded-3xl border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full bg-gradient-to-b from-white to-purple-50/20">
                  <div className="absolute top-0 left-0 h-1.5 w-0 group-hover:w-full bg-[#7b5aa6] transition-all duration-500" />
                  
                  <div className="p-8 flex flex-col h-full flex-1">
  
                    {/* Icon + Tag row */}
                    <div className="flex items-start justify-between mb-7">
                      <div className="cursor-pointer w-14 h-14 rounded-xl bg-[#ede7f5] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-colors duration-300 flex-shrink-0 shadow-sm">
                        <Icon size={24} strokeWidth={1.7} className="text-[#7b5aa6]" />
                      </div>
                      <span className="cursor-pointer text-[10px] font-semibold uppercase tracking-widest text-[#7b5aa6] bg-purple-100/50 border border-purple-200 px-3 py-1 rounded-full group-hover:bg-[#7b5aa6] group-hover:text-white transition-all duration-300">
                        {tag}
                      </span>
                    </div>
  
                    {/* Text */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#7b5aa6] transition-colors duration-300">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 group-hover:text-gray-700 transition-colors duration-300">{desc}</p>
  
                    {/* Highlights */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {highlights.map((h) => (
                        <span
                          key={h}
                          className="cursor-pointer text-[10px] font-semibold uppercase tracking-wide text-gray-600 bg-white border border-gray-100 px-2.5 py-1 rounded-md hover:border-[#7b5aa6] hover:text-[#7b5aa6] transition-colors duration-300"
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

export default Marketplace;