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

  /* ======================
     DETECT HOME VISIBILITY
  ====================== */

  useEffect(() => {
    const homeSection = document.getElementById("home");

    if (!homeSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHomeVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(homeSection);

    return () => observer.disconnect();
  }, []);

  /* ======================
     SCROLL SPY
  ====================== */

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
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  /* ======================
     SMOOTH SCROLL
  ====================== */

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const headerOffset = 80;

      const position =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });

      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isHomeVisible
          ? "bg-transparent"
          : "bg-[#111]/95 backdrop-blur-xl shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1
          className="text-2xl font-bold text-white cursor-pointer hover:text-yellow-400 transition"
          onClick={() => scrollToSection("home")}
        >
          EsportM
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 font-medium text-white">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`cursor-pointer transition-all duration-300 pb-1 border-b-2 ${
                activeSection === id
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent hover:text-yellow-400"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#7b5aa6] overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 py-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 font-medium text-white">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`transition ${
                activeSection === id
                  ? "text-yellow-400"
                  : "hover:text-yellow-400"
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