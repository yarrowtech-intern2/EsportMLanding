import React, { useRef, useState, useEffect } from "react";
import { Users, ArrowRightLeft, ShieldCheck } from "lucide-react";

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

const CARDS = [
  {
    icon: Users,
    tag: "Discovery",
    number: "01",
    title: "Player Listings",
    desc: "Clubs can browse structured player profiles including performance metrics, rankings, statistics, and verified career history.",
    highlights: ["Verified Profiles", "Performance Metrics", "Career History"],
  },
  {
    icon: ArrowRightLeft,
    tag: "Negotiation",
    number: "02",
    title: "Transfer & Negotiation",
    desc: "Secure digital negotiation workflow for transfer fees, contract duration, and structured player acquisition.",
    highlights: ["Digital Workflow", "Transfer Fees", "Structured Deals"],
  },
  {
    icon: ShieldCheck,
    tag: "Compliance",
    number: "03",
    title: "Secure Contract System",
    desc: "Digital contract management with compliance tracking, secure documentation, and transparent transaction history.",
    highlights: ["Compliance Tracking", "Secure Docs", "Transaction Log"],
  },
];

const STATS = [
  { value: "1,200+", label: "Listed Players" },
  { value: "340+",   label: "Transfers Completed" },
  { value: "98%",    label: "Contract Accuracy" },
  { value: "60+",    label: "Partner Clubs" },
];

const Marketplace = () => {
  return (
    <section id="marketplace" className="relative bg-[#ede7f5] py-28 overflow-hidden">

      {/* ── Background Decorations ── */}
      <div className="absolute -top-28 -right-28 w-[440px] h-[440px] bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[360px] h-[360px] bg-purple-300/10 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123,90,166,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123,90,166,0.06) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <FadeIn className="text-center mb-16">
          <p className="inline-flex items-center gap-3 uppercase tracking-[0.38em] text-[10px] font-semibold text-[#7b5aa6] mb-5">
            <span className="block w-7 h-px bg-[#7b5aa6]" />
            Player Exchange
            <span className="block w-7 h-px bg-[#7b5aa6]" />
          </p>

          <h2 className="text-4xl md:text-[56px] font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-5">
            The EsportM{" "}
            <span className="text-[#7b5aa6]">Marketplace</span>
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

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-3 gap-7">
          {CARDS.map(({ icon: Icon, tag, number, title, desc, highlights }, i) => (
            <FadeIn key={title} delay={i * 110}>
              <div className="group cursor-pointer relative bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col">

                {/* Animated top border */}
                <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#7b5aa6] to-purple-300 transition-all duration-500" />

                {/* Card body */}
                <div className="p-8 flex flex-col flex-1">

                  {/* Icon + Tag row */}
                  <div className="flex items-start justify-between mb-7">
                    <div className="cursor-pointer w-14 h-14 rounded-xl bg-[#ede7f5] flex items-center justify-center group-hover:bg-[#7b5aa6] transition-colors duration-300 flex-shrink-0">
                      <Icon
                        size={24}
                        strokeWidth={1.7}
                        className="text-[#7b5aa6] group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <span className="cursor-pointer text-[10px] font-semibold uppercase tracking-widest text-[#7b5aa6] bg-[#ede7f5] px-3 py-1 rounded-full border border-purple-200 group-hover:bg-[#7b5aa6] group-hover:text-white group-hover:border-[#7b5aa6] transition-all duration-300">
                      {tag}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#7b5aa6] transition-colors duration-300">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 group-hover:text-gray-600 transition-colors duration-300">{desc}</p>

                  {/* Highlights */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {highlights.map((h) => (
                      <span
                        key={h}
                        className="cursor-pointer text-[10px] font-semibold uppercase tracking-wide text-[#7b5aa6] bg-[#ede7f5] border border-purple-200 px-2.5 py-1 rounded-md hover:bg-[#7b5aa6] hover:text-white hover:border-[#7b5aa6] transition-all duration-300"
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

export default Marketplace;