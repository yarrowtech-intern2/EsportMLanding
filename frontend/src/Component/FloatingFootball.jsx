import React, { useState, useEffect } from "react";
import football from "../assets/football.png";

const FloatingFootball = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [style, setStyle] = useState({ 
    top: "50%", 
    left: "50%", 
    scale: 1.0, 
    rotate: 0,
    opacity: 0.6,
    filter: "blur(0px) brightness(1.0)" 
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isMobile = windowWidth < 768;
      
      const about = document.getElementById("about");
      const ai = document.getElementById("ai");
      const marketplace = document.getElementById("marketplace");
      const timeline = document.getElementById("timeline");
      const contact = document.getElementById("contact");
      const footer = document.getElementById("footer");

      const isActive = (el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        // More lenient active zone for mobile
        const offset = isMobile ? window.innerHeight * 0.4 : window.innerHeight / 2;
        return rect.top < offset && rect.bottom > offset;
      };

      if (scrollY < 600) {
        // Hero: Centered
        setStyle({
          top: isMobile ? "40%" : "50%",
          left: "50%",
          scale: isMobile ? 0.6 : 1.2,
          rotate: scrollY * 0.05,
          opacity: 0.5,
          filter: "blur(0px) brightness(1.0)"
        });
      } else if (isActive(about)) {
        // About: Right Side
        setStyle({
          top: "45%",
          left: isMobile ? "85%" : "92%",
          scale: isMobile ? 0.5 : 1.0,
          rotate: scrollY * 0.1,
          opacity: 0.4,
          filter: "blur(0px) brightness(0.95)"
        });
      } else if (isActive(ai)) {
        // AI: Left Side
        setStyle({
          top: isMobile ? "60%" : "55%",
          left: isMobile ? "15%" : "8%",
          scale: isMobile ? 0.5 : 1.1,
          rotate: scrollY * -0.08,
          opacity: 0.35, 
          filter: "blur(0px) brightness(1.0)"
        });
      } else if (isActive(marketplace)) {
        // Marketplace: Right Side
        setStyle({
          top: "60%",
          left: isMobile ? "85%" : "90%",
          scale: isMobile ? "0.5" : 0.9,
          rotate: scrollY * 0.12,
          opacity: 0.35,
          filter: "blur(0px) brightness(0.9)"
        });
      } else if (isActive(timeline)) {
        // Timeline: Left Side
        setStyle({
          top: isMobile ? "70%" : "65%",
          left: isMobile ? "15%" : "8%",
          scale: isMobile ? 0.6 : 1.1,
          rotate: scrollY * 0.04,
          opacity: 0.4,
          filter: "blur(0px) brightness(1.0)"
        });
      } else if (isActive(contact)) {
        // Contact: Right Side
        setStyle({
          top: "50%",
          left: isMobile ? "85%" : "90%",
          scale: isMobile ? 0.7 : 1.2,
          rotate: scrollY * 0.15,
          opacity: 0.45,
          filter: "blur(0px) brightness(1.0)"
        });
      } else if (footer && footer.getBoundingClientRect().top < window.innerHeight) {
        // Footer: bottom-left
        setStyle({
          top: isMobile ? "85%" : "80%",
          left: "20%",
          scale: isMobile ? 0.5 : 0.9,
          rotate: scrollY * 0.2,
          opacity: 0.3,
          filter: "blur(0px) brightness(1.0)"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[15] overflow-hidden">
      <div 
        className="absolute transition-all duration-1000 ease-out will-change-transform"
        style={{
          top: style.top,
          left: style.left,
          transform: `translate(-50%, -50%) scale(${style.scale}) rotate(${style.rotate}deg)`,
          opacity: style.opacity,
          width: windowWidth < 768 ? "300px" : "450px", 
          height: windowWidth < 768 ? "300px" : "450px",
        }}
      >
        <div className="w-full h-full animate-floating">
          <img
            src={football}
            alt=""
            className="w-full h-full object-contain"
            style={{
              filter: style.filter,
              clipPath: "circle(50% at 50% 50%)"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingFootball;