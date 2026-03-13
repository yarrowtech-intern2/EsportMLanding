import React, { useEffect, useRef, useState } from "react";
import { Users, Trophy, BarChart3, Shield, Globe, Zap } from "lucide-react";

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

function FlipCard({ id, title, icon: Icon, shortDesc, fullContent, isMission = true, isFeature = false, isFlipped, onFlip }) {
  const IconComponent = Icon ? Icon : null;

  return (
    <div 
      className={`w-full transition-all duration-500 ease-in-out ${
        isFeature 
          ? (isFlipped ? 'h-[320px]' : 'h-[230px]') 
          : (isFlipped ? 'min-h-[450px]' : 'min-h-[320px]')
      }`}
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`relative w-full h-full transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div className={`group w-full h-full rounded-3xl ${isFeature ? 'p-8' : 'px-10 py-10'} border border-purple-100 shadow-sm relative flex flex-col ${!isMission && !isFeature ? 'bg-[#7b5aa6] text-white' : 'bg-white'} hover:shadow-lg transition-shadow duration-300`} style={{ backfaceVisibility: 'hidden' }}>
          {isMission && !isFeature && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7b5aa6] via-purple-300 to-transparent" />}
          {!isMission && !isFeature && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />}
          {isFeature && (
            <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#7b5aa6] to-purple-300 transition-all duration-500" />
          )}

          {IconComponent && (
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${isFeature ? 'bg-[#ede7f5]' : 'bg-white/10'}`}>
              <IconComponent size={24} className={isFeature ? 'text-[#7b5aa6]' : 'text-white'} strokeWidth={1.8} />
            </div>
          )}

          {!isFeature && (
            <p className={`uppercase tracking-[0.3em] text-[11px] font-bold mb-4 ${isMission ? 'text-[#7b5aa6]' : 'text-purple-200'}`}>
              {isMission ? 'Our Mission' : 'Our Vision'}
            </p>
          )}

          <h3 className={`font-extrabold leading-tight mb-3 ${isFeature ? 'text-lg text-gray-900 group-hover:text-[#7b5aa6]' : 'text-2xl md:text-3xl'} ${!isMission && !isFeature ? 'text-white' : ''}`}>
            {title}
          </h3>
          <p className={`leading-relaxed ${isFeature ? 'text-sm text-gray-500' : 'text-base mb-6'} ${!isMission && !isFeature ? 'text-purple-100' : ''}`}>
            {shortDesc}
          </p>

          <button 
            onClick={(e) => { e.stopPropagation(); onFlip(id); }}
            className={`mt-auto inline-flex items-center gap-2 font-bold text-xs tracking-widest uppercase py-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ${!isMission && !isFeature ? 'text-white' : 'text-[#7b5aa6]'}`}
          >
            See More
            <svg className="w-4 h-4 transition-transform duration-300 translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Back Face */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-3xl ${isFeature ? 'p-8' : 'px-10 py-10'} border border-purple-100 shadow-xl flex flex-col ${!isMission && !isFeature ? 'bg-[#7b5aa6] text-white' : 'bg-white'}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {isMission && !isFeature && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7b5aa6] via-purple-300 to-transparent" />}
          {!isMission && !isFeature && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />}

          <h4 className={`font-extrabold mb-4 ${isFeature ? 'text-base' : 'text-2xl'} ${!isMission && !isFeature ? 'text-white' : 'text-gray-900'}`}>
            Full Detail
          </h4>
          <div className={`text-sm leading-relaxed overflow-y-auto pr-2 custom-scrollbar flex-grow ${!isMission && !isFeature ? 'text-purple-50' : 'text-gray-500'}`}>
            {fullContent}
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onFlip(null); }}
            className={`mt-6 inline-flex items-center gap-2 font-bold text-xs tracking-widest uppercase py-2 transition-colors duration-300 ${!isMission && !isFeature ? 'text-white hover:text-purple-200' : 'text-[#7b5aa6] hover:text-[#5e4482]'}`}
          >
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Back
          </button>
        </div>
      </div>
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
  const [activeFlipId, setActiveFlipId] = useState(null);

  const handleFlip = (id) => {
    setActiveFlipId(id === activeFlipId ? null : id);
  };

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

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 z-20">

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
        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <FadeIn delay={150} direction="left">
            <FlipCard 
              id="mission"
              isMission={true}
              title={<>Empowering Clubs & Players <br className="hidden md:block" /> Through Digital Excellence</>}
              shortDesc="Building the ultimate bridge between raw talent and professional club success with elite-level infrastructure."
              isFlipped={activeFlipId === "mission"}
              onFlip={handleFlip}
              fullContent={
                <>
                  <p className="mb-4">
                    Our mission is to provide grassroots clubs with enterprise-grade management tools previously reserved for global giants. We ensure every organization can recruit, track, and grow their roster effectively.
                  </p>
                  <p className="mb-4">
                    We believe in a future where every player has a verified career record and every club operates with transparency. By standardizing contracts and workflows, we create a fair marketplace for talent.
                  </p>
                  <p>
                    Whether you are a local club or an aspiring pro, EsportM provides the digital backbone required for sustainable growth in the modern competitive gaming landscape.
                  </p>
                </>
              }
            />
          </FadeIn>

          <FadeIn delay={300} direction="right">
            <FlipCard 
              id="vision"
              isMission={false}
              title={<>Setting Global Standards <br /> for Player & Club Success</>}
              shortDesc="Redefining how the world scouts, manages, and celebrates the next generation of esports legends."
              isFlipped={activeFlipId === "vision"}
              onFlip={handleFlip}
              fullContent={
                <div className="space-y-4">
                  <p>
                    We envision a world where every esports organization operates on a unified standard. EsportM aims to be the global standard for managing the entire journey from scouting to victory.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Verified professional career records for every player",
                      "Standardized certification for competitive clubs",
                      "Automated and fair scouting & recruitment systems",
                      "Real-time performance analytics for strategic growth",
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
              }
            />
          </FadeIn>
        </div>

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
            {FEATURES.map(({ icon, title, desc }, i) => {
              const modernHooks = {
                "Player & Club Administration": "Master your squad. Professional-grade registry for profiles and contracts.",
                "Performance Intelligence": "Data-driven dominance. Turn match stats into actionable winning strategies.",
                "Tournament Operations": "Championship ready. Seamless lifecycle management for every competition.",
                "Multi-Region Ecosystem": "Go global. Connect with regional federations and international talent.",
                "Regulatory Compliance": "Verified excellence. Stay compliant with unified governance standards.",
                "Marketplace & Transfers": "Talent nexus. The ultimate hub for scouting and secure player moves.",
              };
              
              // Pattern: Alternating Left, Right
              const direction = i % 2 === 0 ? "left" : "right";

              return (
                <FadeIn key={title} delay={i * 100} direction={direction}>
                  <FlipCard 
                    id={`feature-${i}`}
                    isFeature={true}
                    icon={icon}
                    title={title}
                    shortDesc={modernHooks[title] || desc.split('. ')[0] + '.'}
                    isFlipped={activeFlipId === `feature-${i}`}
                    onFlip={handleFlip}
                    fullContent={desc}
                  />
                </FadeIn>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}