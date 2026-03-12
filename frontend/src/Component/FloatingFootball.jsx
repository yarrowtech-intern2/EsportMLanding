import React, { useState, useEffect } from "react";
import football from "../assets/football.png";

const FloatingFootball = () => {
  const [style, setStyle] = useState({ 
    top: "50%", 
    left: "50%", 
    scale: 1.0, 
    rotate: 0,
    opacity: 0.6,
    filter: "blur(0px) brightness(1.0)" 
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Selectors for sections
      const hero = document.getElementById("home");
      const about = document.getElementById("about");
      const ai = document.getElementById("ai");
      const marketplace = document.getElementById("marketplace");
      const timeline = document.getElementById("timeline");
      const contact = document.getElementById("contact");
      const footer = document.getElementById("footer");

      const getRect = (el) => el ? el.getBoundingClientRect() : { top: 10000, bottom: 10000 };

      // SMART POSITIONING & MOTION:
      if (getRect(hero).bottom > window.innerHeight / 2) {
        // Hero: CENTERED
        setStyle({
          top: "50%",
          left: "50%",
          scale: 1.3,
          rotate: scrollY * 0.05,
          opacity: 0.5,
          filter: "blur(0px) brightness(1.0)"
        });
      } else if (about && getRect(about).top < window.innerHeight / 2 && getRect(about).bottom > window.innerHeight / 2) {
        // About: Right Side
        setStyle({
          top: "40%",
          left: "92%",
          scale: 1.0,
          rotate: scrollY * 0.1,
          opacity: 0.55,
          filter: "blur(0px) brightness(1.0)"
        });
      } else if (ai && getRect(ai).top < window.innerHeight / 2 && getRect(ai).bottom > window.innerHeight / 2) {
        // AI: Left Side
        setStyle({
          top: "55%",
          left: "8%",
          scale: 1.1,
          rotate: scrollY * -0.08,
          opacity: 0.5, 
          filter: "blur(0px) brightness(1.0)"
        });
      } else if (marketplace && getRect(marketplace).top < window.innerHeight / 2 && getRect(marketplace).bottom > window.innerHeight / 2) {
        // Marketplace: Right Side
        setStyle({
          top: "50%",
          left: "92%",
          scale: 1.1,
          rotate: scrollY * 0.12,
          opacity: 0.55,
          filter: "blur(0px) brightness(1.0)"
        });
      } else if (timeline && getRect(timeline).top < window.innerHeight / 2 && getRect(timeline).bottom > window.innerHeight / 2) {
        // Timeline: Left Side
        setStyle({
          top: "60%",
          left: "8%",
          scale: 1.1,
          rotate: scrollY * 0.04,
          opacity: 0.5,
          filter: "blur(0px) brightness(1.0)"
        });
      } else if (contact && getRect(contact).top < window.innerHeight / 2 && getRect(contact).bottom > window.innerHeight / 2) {
        // Contact: glides to Right (90%)
        setStyle({
          top: "50%",
          left: "90%",
          scale: 1.2,
          rotate: scrollY * 0.15,
          opacity: 0.55,
          filter: "blur(0px) brightness(1.0)"
        });
      } else if (footer && getRect(footer).top < window.innerHeight) {
        // Footer: glides back to Left (25%) - Subtler for text clarity
        setStyle({
          top: "65%",
          left: "25%",
          scale: 1.0,
          rotate: scrollY * 0.2,
          opacity: 0.4,
          filter: "blur(0px) brightness(1.0)"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[15] overflow-hidden">
      <div 
        className="absolute transition-all duration-1000 ease-out will-change-transform"
        style={{
          top: style.top,
          left: style.left,
          transform: `translate(-50%, -50%) scale(${style.scale}) rotate(${style.rotate}deg)`,
          opacity: style.opacity,
          width: "450px",
          height: "450px",
          overflow: "hidden"
        }}
      >
        <img
          src={football}
          alt=""
          className="w-full h-full object-contain"
          style={{
            filter: style.filter,
            // Full round view crop
            clipPath: "circle(50% at 50% 50%)"
          }}
        />
      </div>
    </div>
  );
};

export default FloatingFootball;

