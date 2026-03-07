import React from "react";
import player from "../assets/player.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#E7E5EC]"
      style={{
        backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
      `,
        backgroundSize: "120px 120px",
      }}
    >
      {/* RED GLOW */}
      <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-red-500/20 blur-[140px] rounded-full right-1/4 top-1/3"></div>

      {/* BIG BACKGROUND TEXT */}
      <h1 className="absolute text-[70px] sm:text-[110px] md:text-[140px] lg:text-[180px] font-black text-red-600 opacity-80 tracking-tight left-1/2 -translate-x-1/2 bottom-10 pointer-events-none">
        EsportM
      </h1>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="z-10 text-center md:text-left">

          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start gap-3 mb-8">

            <div className="w-11 h-11 md:w-12 md:h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
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

          {/* Video Preview */}
          <div className="mt-10 w-[220px] sm:w-[260px] mx-auto md:mx-0 relative rounded-lg overflow-hidden shadow-lg cursor-pointer group">

            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
              alt="game"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition">

              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center text-white text-lg md:text-xl">
                ▶
              </div>

            </div>

          </div>

        </div>

        {/* PLAYER IMAGE */}
        <div className="relative flex justify-center md:justify-end">

          <img
            src={player}
            alt="player"
            className="w-[260px] sm:w-[360px] md:w-[450px] lg:w-[520px] xl:w-[600px] object-contain z-10"
          />

          {/* Player Number */}
          <div className="absolute right-4 md:right-10 top-4 md:top-10 text-[60px] sm:text-[80px] md:text-[110px] text-gray-300 font-bold">
            09
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;