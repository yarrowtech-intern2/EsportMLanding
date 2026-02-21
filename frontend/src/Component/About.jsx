import React, { useEffect, useRef, useState } from "react";
import { Users, Trophy, BarChart3, Shield, Globe, Zap } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
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
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.75s ${delay}ms ease, transform 0.75s ${delay}ms ease`,
      }}
    >
      {children}
    </div>
  );
}

const STATS = [];
const FEATURES = [
  {
    icon: Users,
    title: "Player & Club Administration",
    desc: "A structured registry for player profiles, club memberships, contracts, and career history — all managed under one verified governance layer. Role-based access ensures every stakeholder interacts with relevant data only.",
  },
  {
    icon: BarChart3,
    title: "Performance Intelligence",
    desc: "Advanced analytics capture in-game KPIs, training benchmarks, and match outcomes in real time. Coaches and managers gain actionable insight dashboards to support data-informed talent decisions and development planning.",
  },
  {
    icon: Trophy,
    title: "Tournament Operations",
    desc: "End-to-end tournament lifecycle management — from bracket generation and scheduling to results validation and ranking updates. Supports single-elimination, round-robin, and hybrid formats across multiple games simultaneously.",
  },
  {
    icon: Globe,
    title: "Multi-Region Ecosystem",
    desc: "Designed to operate across national and regional federations. EsportM supports localization, multi-currency transactions, and jurisdiction-specific compliance frameworks for international competitions.",
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    desc: "Built with esports governing bodies in mind. The platform enforces eligibility checks, anti-doping policies, transfer windows, and documentation workflows required for federation-level certification.",
  },
  {
    icon: Zap,
    title: "Marketplace & Transfers",
    desc: "A transparent transfer marketplace connecting clubs and players through structured offer pipelines, contract templates, and agent management — reducing friction while maintaining institutional oversight.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-[#ede7f5] py-28 overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute -top-28 -right-36 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-36 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123,90,166,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(123,90,166,0.07) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Section Label + Heading ── */}
        <FadeIn className="text-center">
          <p className="inline-flex items-center gap-3 uppercase tracking-[0.38em] text-[10px] font-semibold text-[#7b5aa6] mb-5">
            <span className="block w-7 h-px bg-[#7b5aa6]" />
            About EsportM
            <span className="block w-7 h-px bg-[#7b5aa6]" />
          </p>

          <h2 className="text-4xl md:text-[56px] font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-5">
            The Infrastructure Behind<br />
            <span className="text-[#7b5aa6]">Competitive Esports</span>
          </h2>

          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#7b5aa6]" />
            <div className="w-2.5 h-2.5 bg-[#7b5aa6] rotate-45 flex-shrink-0" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#7b5aa6]" />
          </div>

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            EsportM is a centralized electronic sport management system engineered to
            organize, regulate, and scale the esports ecosystem. From grassroots clubs
            to national federations, the platform provides the digital backbone that
            modern competitive gaming demands.
          </p>
        </FadeIn>

        {/* ── Mission Block ── */}
        <FadeIn delay={150} className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Mission Card */}
          <div className="cursor-pointer bg-white rounded-3xl px-8 py-10 border border-purple-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7b5aa6] via-purple-300 to-transparent" />

            <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#7b5aa6] mb-4">
              Our Mission
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-5">
              Bringing Institutional <br className="hidden md:block" />
              Structure to Esports
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Esports has grown from a passion project into a multi-billion dollar global
              industry — yet the management infrastructure has lagged far behind. EsportM
              was created to close that gap by delivering enterprise-grade tools adapted
              specifically for the dynamics of competitive gaming.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe every player deserves a verified career record, every club
              deserves transparent governance, and every tournament deserves a fair and
              auditable competitive structure. EsportM makes all of that possible through
              a single, integrated platform.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you are a regional club looking to professionalize operations or a
              national federation seeking compliance-ready infrastructure, EsportM scales
              to match your ambitions — today and into the future of esports.
            </p>
          </div>

          {/* Right: Our Vision */}
          <div className="cursor-pointer bg-[#7b5aa6] rounded-3xl px-8 py-10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />

            <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-purple-200 mb-4">
              Our Vision
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-5">
              A Unified Standard for <br />Global Esports Governance
            </h3>
            <p className="text-purple-200 text-sm leading-relaxed mb-6">
              We envision a world where every esports organization — regardless of
              size or region — operates on a shared foundation of transparency,
              accountability, and competitive integrity. EsportM is that foundation.
            </p>

            <div className="space-y-3">
              {[
                "Standardized player career records across all titles",
                "Globally recognized club certification framework",
                "Interoperable tournament data between federations",
                "Real-time anti-fraud and eligibility verification",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-white/80 text-xs leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Feature Cards ── */}
        <div className="mt-24">
          <FadeIn className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#7b5aa6] mb-3">
              Core Capabilities
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Everything You Need to Operate at Scale
            </h3>
            <p className="text-gray-500 mt-4 text-base leading-relaxed max-w-2xl mx-auto">
              Six integrated modules work together seamlessly to cover every dimension of
              professional esports management — from individual player onboarding to
              federation-wide tournament governance.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="group cursor-pointer bg-white rounded-2xl border border-purple-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full relative overflow-hidden">
                  {/* Hover top line */}
                  <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#7b5aa6] to-purple-300 transition-all duration-500" />

                  <div className="w-12 h-12 rounded-xl bg-[#ede7f5] flex items-center justify-center mb-5 group-hover:bg-[#7b5aa6] transition-colors duration-300 cursor-pointer">
                    <Icon size={22} className="text-[#7b5aa6] group-hover:text-white transition-colors duration-300" strokeWidth={1.8} />
                  </div>

                  <h4 className="text-base font-bold text-gray-900 mb-3 group-hover:text-[#7b5aa6] transition-colors duration-300">{title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}