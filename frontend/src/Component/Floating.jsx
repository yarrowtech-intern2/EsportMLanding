import React from "react";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919830590929"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
      >
        <FaWhatsapp size={26} className="text-white" />

        {/* Tooltip */}
        <span className="absolute right-16 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-3 py-1 rounded-md transition-opacity duration-300 whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>

      {/* Email Button */}
      <a
        href="mailto:support@esportm.com"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#7b5aa6] rounded-full shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
      >
        <Mail size={24} className="text-white" />

        {/* Tooltip */}
        <span className="absolute right-16 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-3 py-1 rounded-md transition-opacity duration-300 whitespace-nowrap">
          Send Email
        </span>
      </a>

    </div>
  );
};

export default FloatingContact;