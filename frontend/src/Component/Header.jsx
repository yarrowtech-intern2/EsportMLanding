import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "ai", label: "AI" },
    { id: "marketplace", label: "Marketplace" },
    { id: "timeline", label: "Timeline" },
    { id: "contact", label: "Contact" },
  ];

  /* Scroll Shadow Effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Scroll Spy */
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
      { threshold: 0.4 }
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
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-black/90 backdrop-blur-lg shadow-xl border-b border-white/10"
          : "bg-black/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">

        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-yellow-400 transition"
          onClick={() => scrollToSection("home")}
        >
          EsportM
        </h1>

        {/* Desktop Navigation */}
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
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-black/95 backdrop-blur-lg overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 py-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-white font-medium">
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