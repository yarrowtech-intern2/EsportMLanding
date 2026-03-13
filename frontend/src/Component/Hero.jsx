import React, { useEffect, useRef, useState } from "react";
import player from "../assets/player.png";

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

const InteractiveGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const mouse = { x: -1000, y: -1000 };
    const cellSize = 120;
    const cellStates = new Map();

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    // Mouse handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cols = Math.ceil(canvas.width / cellSize);
      const rows = Math.ceil(canvas.height / cellSize);
      
      const glowRadius = 300; 
      
      // Draw grid lines
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      
      for (let x = 0; x <= canvas.width; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y <= canvas.height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // Process cells
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cellX = i * cellSize;
          const cellY = j * cellSize;
          const cx = cellX + cellSize / 2;
          const cy = cellY + cellSize / 2;
          
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const key = `${i},${j}`;
          let currentOpacity = cellStates.get(key) || 0;

          // Increase opacity when mouse is near
          if (distance < glowRadius) {
            const targetOpacity = 0.4 * (1 - distance / glowRadius);
            if (targetOpacity > currentOpacity) {
              currentOpacity = targetOpacity;
            }
          }

          // Fade out gradually to create trailing effect
          currentOpacity -= 0.015;
          if (currentOpacity < 0) currentOpacity = 0;
          cellStates.set(key, currentOpacity);

          if (currentOpacity > 0) {
            // Draw filled cell
            ctx.fillStyle = `rgba(123, 90, 166, ${currentOpacity})`;
            ctx.fillRect(cellX, cellY, cellSize, cellSize);
            
            // Draw an inner glowing border for a sci-fi/tech aesthetic
            ctx.strokeStyle = `rgba(168, 133, 227, ${currentOpacity * 1.5})`; 
            ctx.strokeRect(cellX + 2, cellY + 2, cellSize - 4, cellSize - 4);
          }
        }
      }

      // Draw a soft radial gradient spotlight following the mouse
      if (mouse.x > -1000) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        gradient.addColorStop(0, "rgba(168, 133, 227, 0.1)");
        gradient.addColorStop(1, "rgba(168, 133, 227, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#ede7f5]"
    >
      <InteractiveGrid />
      {/* RED GLOW */}
      <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#7b5aa6]/20 blur-[140px] rounded-full right-1/4 top-1/3"></div>

      {/* BIG BACKGROUND TEXT */}
      <h1 className="absolute text-[70px] sm:text-[110px] md:text-[140px] lg:text-[180px] font-black text-[#7b5aa6] opacity-80 tracking-tight left-1/2 -translate-x-1/2 bottom-10 pointer-events-none">
        EsportM
      </h1>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <FadeIn direction="left" delay={200} className="z-20 text-center md:text-left">
          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start gap-3 mb-8">

            <div className="w-11 h-11 md:w-12 md:h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
              ES
            </div>

            <div>
              <p className="text-xs md:text-sm text-gray-500">
                Professional Player
              </p>
              <p className="font-semibold">Esport Team</p>
            </div>

          </div>

          {/* Quote */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold max-w-lg leading-snug mx-auto md:mx-0">
            "ONLY A FEW OF MY DREAMS HAVE COME TRUE; I STILL HAVE A LOT OF
            DREAMS TO ACHIEVE."
          </h2>

          <p className="text-gray-500 mt-4">— Pro Gamer</p>

          {/* CTA */}
          <div className="mt-10 w-full flex justify-center md:justify-start">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-[#7b5aa6]/20 text-black border border-[#7b5aa6]/30 hover:bg-[#7b5aa6] hover:text-white backdrop-blur-sm rounded-full font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(123,90,166,0.15)] hover:shadow-[0_8px_25px_rgba(123,90,166,0.3)] hover:-translate-y-1"
            >
              Get in Touch
            </button>
          </div>
        </FadeIn>

        {/* PLAYER IMAGE */}
        <FadeIn direction="right" delay={400} className="relative flex justify-center md:justify-end z-20">
          <img
            src={player}
            alt="player"
            className="w-[220px] sm:w-[300px] md:w-[380px] lg:w-[450px] xl:w-[520px] object-contain z-10 md:-translate-x-48"
          />

          {/* Player Number */}
          <div className="absolute right-4 md:right-10 top-4 md:top-10 text-[60px] sm:text-[80px] md:text-[110px] text-gray-300 font-bold">
            09
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default Hero;