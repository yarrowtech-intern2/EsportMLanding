import React from "react";
import { MapPin, Phone } from "lucide-react";

const Footer = () => {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#7b5aa6] text-white pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12">

        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold">EsportM</h3>
          <p className="mt-4 text-gray-200 text-sm leading-relaxed">
            Electronic Sport Management platform connecting
            players, clubs, tournaments, and analytics
            into one unified esports ecosystem.
          </p>
        </div>

        {/* Navigation */}
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

        {/* Contact Info */}
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

      </div>

      {/* <div className="mt-12 border-t border-white/30 pt-6 text-center text-sm text-gray-200">
        © 2026 EsportM – Electronic Sport Management. All Rights Reserved.
      </div> */}

    </footer>
  );
};

export default Footer;