import React from "react";
import player from "../assets/player.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full min-h-screen relative overflow-hidden flex items-center bg-[#E7E5EC]"
      style={{
        backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
      `,
        backgroundSize: "120px 120px",
      }}
    >
      {/* RED GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-red-500/20 blur-[150px] rounded-full right-1/4 top-1/3"></div>

      {/* BIG BACKGROUND TEXT */}
      <h1 className="absolute text-[160px] font-black text-red-600 opacity-90 tracking-tight left-1/2 -translate-x-1/2 bottom-20 pointer-events-none">
        EsportM
      </h1>

      <div className="max-w-[1400px] mx-auto px-10 w-full grid md:grid-cols-2 items-center">

        {/* LEFT CONTENT */}
        <div className="z-10">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
              ES
            </div>

            <div>
              <p className="text-sm text-gray-500">Professional Player</p>
              <p className="font-semibold">Esport Team</p>
            </div>
          </div>

          {/* Quote */}
          <h2 className="text-3xl font-bold max-w-lg leading-snug">
            "ONLY A FEW OF MY DREAMS HAVE COME TRUE;
            I STILL HAVE A LOT OF DREAMS TO ACHIEVE."
          </h2>

          <p className="text-gray-500 mt-4">— Pro Gamer</p>

          {/* Video Preview */}
          <div className="mt-10 w-[260px] relative rounded-lg overflow-hidden shadow-lg cursor-pointer group">

            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
              alt="game"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition">

              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white text-xl">
                ▶
              </div>

            </div>

          </div>

        </div>

        {/* PLAYER IMAGE */}
        <div className="relative flex justify-center">

          <img
            src={player}
            alt="player"
            className="h-[700px] object-contain z-10"
          />

          {/* Player Number */}
          <div className="absolute right-10 top-10 text-[120px] text-gray-300 font-bold">
            09
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;