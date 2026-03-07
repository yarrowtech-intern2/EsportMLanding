import React, { useMemo, useRef, useState } from "react";
import { MapPin, Phone, Mail, X, CheckCircle2, AlertCircle } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 bg-white border border-purple-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7b5aa6] focus:ring-2 focus:ring-[#7b5aa6]/20 transition";

const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  const ok = toast.type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-[320px] max-w-[92vw]">
      <div
        role="alert"
        aria-live="assertive"
        className={`relative overflow-hidden rounded-2xl border bg-white shadow-2xl ${
          ok ? "border-emerald-200" : "border-red-200"
        }`}
      >
        {/* Top bar */}
        <div
          className={`h-1 w-full ${
            ok ? "bg-gradient-to-r from-emerald-500 to-emerald-300" : "bg-gradient-to-r from-red-500 to-red-300"
          }`}
        />

        <div className="flex gap-3 p-4">
          <div
            className={`mt-0.5 grid h-9 w-9 place-items-center rounded-xl ${
              ok ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            }`}
          >
            {ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {ok ? "Submitted Successfully" : "Action Required"}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">{toast.msg}</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
            aria-label="Close"
            type="button"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] w-full bg-gray-100">
          <div
            className={`h-full ${ok ? "bg-emerald-500" : "bg-red-500"} animate-[toastbar_3.8s_linear_forwards]`}
          />
        </div>

        <style>{`
          @keyframes toastbar {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default function Contact() {
  const [role, setRole] = useState("player");
  const [loading, setLoading] = useState(false);

  const [player, setPlayer] = useState({
    name: "",
    email: "",
    mobile: "",
    description: "",
  });

  const [club, setClub] = useState({
    clubName: "",
    email: "",
    mobile: "",
    location: "",
    description: "",
  });

  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = (type, msg) => {
    clearTimeout(timerRef.current);
    setToast({ type, msg });
    timerRef.current = setTimeout(() => setToast(null), 3800);
  };

  const closeToast = () => {
    clearTimeout(timerRef.current);
    setToast(null);
  };

  const address =
    "3A, Bertram St, Esplanade, Dharmatala, Taltala, Kolkata, West Bengal 700087";
  const phone = "+91 98305 90929";

  const active = useMemo(() => (role === "player" ? player : club), [role, player, club]);

  const setActiveField = (key, value) => {
    if (role === "player") setPlayer((p) => ({ ...p, [key]: value }));
    else setClub((c) => ({ ...c, [key]: value }));
  };

  const validate10Digit = (m) => /^[0-9]{10}$/.test(String(m || "").trim());
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || "").trim());

  const validate = () => {
    if (role === "player") {
      if (!player.name.trim()) return showToast("error", "Player name is required."), false;
      if (!validateEmail(player.email)) return showToast("error", "Enter a valid email address."), false;
      if (!validate10Digit(player.mobile)) return showToast("error", "Enter a valid 10-digit mobile number."), false;
      return true;
    }

    if (!club.clubName.trim()) return showToast("error", "Club name is required."), false;
    if (!validateEmail(club.email)) return showToast("error", "Enter a valid email address."), false;
    if (!validate10Digit(club.mobile)) return showToast("error", "Enter a valid 10-digit mobile number."), false;
    if (!club.location.trim()) return showToast("error", "Club location is required."), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = role === "player"
        ? { ...player, project: "PLAYER" }
        : { ...club, project: "CLUB" };

      const scriptUrl = import.meta.env.VITE_SCRIPT_URL;
      if (!scriptUrl) {
        showToast("error", "VITE_SCRIPT_URL is missing in .env (restart Vite after adding).");
        return;
      }

      // ✅ Use text/plain to avoid preflight for Apps Script
      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let result = {};
      try { result = JSON.parse(text); } catch {}

      if (res.ok && result.ok) {
        showToast("success", `Your ${role} registration was submitted. We’ll contact you soon.`);

        // reset form
        if (role === "player") setPlayer({ name: "", email: "", mobile: "", description: "" });
        else setClub({ clubName: "", email: "", mobile: "", location: "", description: "" });

      } else {
        console.error("Apps Script raw response:", text);
        showToast("error", result.error || "Submission failed.");
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
      showToast("error", "Fetch error. Check VITE_SCRIPT_URL and Apps Script deployment access.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-[#ede7f5] to-[#e4dcf3] py-24 overflow-hidden"
    >
      <Toast toast={toast} onClose={closeToast} />

      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123,90,166,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(123,90,166,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-start">
        {/* LEFT SIDE INFO */}
        <div>
          <p className="uppercase tracking-[0.4em] text-xs font-semibold text-[#7b5aa6] mb-5">
            Contact
          </p>

          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Connect with <span className="text-[#7b5aa6]">EsportM</span>
          </h2>

          <p className="text-gray-600 mb-10 leading-relaxed max-w-md">
            Register as a player or club and become part of the structured EsportM ecosystem.
          </p>

          <div className="space-y-7">
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-lg bg-[#7b5aa6]/10 flex items-center justify-center text-[#7b5aa6]">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Office</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-600 hover:text-[#7b5aa6] transition"
                >
                  {address}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-lg bg-[#7b5aa6]/10 flex items-center justify-center text-[#7b5aa6]">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Phone</p>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="text-sm text-gray-600 hover:text-[#7b5aa6] transition"
                >
                  {phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-lg bg-[#7b5aa6]/10 flex items-center justify-center text-[#7b5aa6]">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Email</p>
                <a
                  href="mailto:support@esportm.com"
                  className="text-sm text-gray-600 hover:text-[#7b5aa6] transition"
                >
                  support@esportm.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-200 p-8 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7b5aa6] to-purple-300 rounded-t-2xl" />

          {/* Role Switch */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-[#f4effb] rounded-lg p-1">
              {["player", "club"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition ${
                    role === item ? "bg-[#7b5aa6] text-white" : "text-gray-600 hover:text-[#7b5aa6]"
                  }`}
                >
                  {item === "player" ? "Player" : "Club"}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {role === "player" ? (
              <>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-gray-800">
                    Player Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={active.name}
                    onChange={(e) => setActiveField("name", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-800">
                    Player Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={active.email}
                    onChange={(e) => setActiveField("email", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-800">
                    Player Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={active.mobile}
                    onChange={(e) => setActiveField("mobile", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-gray-800">
                    Description 
                  </label>
                  <textarea
                    rows={3}
                    value={active.description}
                    onChange={(e) => setActiveField("description", e.target.value)}
                    className={inputClass + " resize-none"}
                    placeholder="Brief description..."
                  />
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-gray-800">
                    Club Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={active.clubName}
                    onChange={(e) => setActiveField("clubName", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-800">
                    Club Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={active.email}
                    onChange={(e) => setActiveField("email", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-800">
                    Club Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={active.mobile}
                    onChange={(e) => setActiveField("mobile", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-gray-800">
                    Club Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={active.location}
                    onChange={(e) => setActiveField("location", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-gray-800">
                    Description 
                  </label>
                  <textarea
                    rows={3}
                    value={active.description}
                    onChange={(e) => setActiveField("description", e.target.value)}
                    className={inputClass + " resize-none"}
                    placeholder="Brief description..."
                  />
                </div>
              </>
            )}

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition ${
                  loading
                    ? "bg-[#7b5aa6] text-white opacity-70 cursor-not-allowed"
                    : "bg-[#7b5aa6] text-white hover:bg-[#6a4c92]"
                }`}
              >
                {loading ? "Submitting..." : "Submit "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}