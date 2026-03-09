import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHomeVisible, setIsHomeVisible] = useState(true);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "ai", label: "AI" },
    { id: "marketplace", label: "Marketplace" },
    { id: "timeline", label: "Timeline" },
    { id: "contact", label: "Contact" },
  ];

  /* Detect hero visibility */

  useEffect(() => {
    const home = document.getElementById("home");
    if (!home) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHomeVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(home);

    return () => observer.disconnect();
  }, []);

  /* Scroll spy */

  useEffect(() => {
    const sections = navItems.map((item) =>
      document.getElementById(item.id)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
      }
    );

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const offset = 80;

      const position =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });

      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 pointer-events-none ${
        isHomeVisible ? "py-4" : "py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative pointer-events-auto">

        {/* Logo */}
        <h1
          onClick={() => scrollToSection("home")}
          className="text-2xl font-bold text-[#7b5aa6] cursor-pointer"
        >
          EsportM
        </h1>

        {/* CENTER NAV */}
        <nav
          className="hidden md:flex items-center gap-2 px-3 py-2 absolute left-1/2 -translate-x-1/2 bg-[#7b5aa6]/30 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-full transition-all duration-300"
        >

          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeSection === id
                  ? "bg-black text-white"
                  : "text-black hover:bg-white/30"
              }`}
            >
              {label}
            </button>
          ))}

        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      <div
        className={`md:hidden bg-white transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 py-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-5">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`px-6 py-2 rounded-full ${
                activeSection === id
                  ? "bg-[#7b5aa6] text-white"
                  : "text-black"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;