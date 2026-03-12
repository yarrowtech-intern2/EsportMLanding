import React, { useRef, useState, useEffect } from "react";
import { MapPin, Phone } from "lucide-react";

function useInView(threshold = 0.1) {
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

const Footer = () => {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="relative bg-[#7b5aa6] text-white pt-16 pb-8 overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12">

        {/* Brand Section */}
        <FadeIn direction="left" delay={100}>
          <div>
            <h3 className="text-2xl font-bold">EsportM</h3>
            <p className="mt-4 text-gray-200 text-sm leading-relaxed">
              Electronic Sport Management platform connecting
              players, clubs, tournaments, and analytics
              into one unified esports ecosystem.
            </p>
          </div>
        </FadeIn>

        {/* Navigation */}
        <FadeIn direction="up" delay={200}>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-200 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="cursor-pointer hover:underline"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="cursor-pointer hover:underline"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("ai")}
                  className="cursor-pointer hover:underline"
                >
                  AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("marketplace")}
                  className="cursor-pointer hover:underline"
                >
                  Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("timeline")}
                  className="cursor-pointer hover:underline"
                >
                  Timeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="cursor-pointer hover:underline"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Contact Info */}
        <FadeIn direction="right" delay={300}>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>

            {/* Address */}
            <div className="flex items-start gap-3 text-sm text-gray-200 cursor-pointer hover:text-white transition">
              <MapPin size={18} className="mt-1" />
              <p>
                3A, Bertram St, Esplanade, Dharmatala, Taltala,<br />
                Kolkata, West Bengal 700087
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 mt-4 text-sm">
              <Phone size={18} />
              <a
                href="tel:+919830590929"
                className="cursor-pointer hover:underline"
              >
                +91 98305 90929
              </a>
            </div>

            {/* Map */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="EsportM Location"
                src="https://www.google.com/maps?q=3A,+Bertram+St,+Esplanade,+Dharmatala,+Taltala,+Kolkata,+West+Bengal+700087&output=embed"
                width="100%"
                height="180"
                className="border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </FadeIn>

      </div>

      {/* <div className="mt-12 border-t border-white/30 pt-6 text-center text-sm text-gray-200">
        © 2026 EsportM – Electronic Sport Management. All Rights Reserved.
      </div> */}

    </footer>
  );
};

export default Footer;