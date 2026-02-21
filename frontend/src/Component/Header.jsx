import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "ai", label: "AI" },
    { id: "marketplace", label: "Marketplace" },
    { id: "timeline", label: "Timeline" },
    { id: "contact", label: "Contact" },
  ];

  // Scroll Spy
  useEffect(() => {
    const sections = navItems.map((item) => item.id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-black/20 backdrop-blur-xl text-white z-50 ">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-yellow-400 transition"
          onClick={() => scrollToSection("home")}
        >
          EsportM
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 font-medium">
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
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="cursor-pointer"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#7b5aa6] overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 font-medium">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`cursor-pointer transition ${
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