import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Menu, X, Wrench } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  openBookingDialog: () => void;
}

export default function Navbar({ activeSection, setActiveSection, openBookingDialog }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact & Tracker" },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Top Info Bar - Desktop Only */}
      <div className="hidden lg:flex w-full bg-slate-950 text-slate-400 text-xs py-2 px-8 justify-between border-b border-white/5 font-mono">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 hover:text-orange-500 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            New Braunfels, TX & Surrounding Areas
          </span>
          <span className="text-white/20">|</span>
          <a
            href="mailto:ryanarnold1216@gmail.com"
            className="flex items-center gap-1.5 hover:text-orange-500 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-orange-500" />
            ryanarnold1216@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-orange-500 font-semibold uppercase tracking-wider text-[10px] bg-orange-950/40 border border-orange-900/30 px-2 py-0.5 rounded">
            Locally Owned & Operated
          </span>
          <a href="tel:8322442036" className="font-bold text-slate-200 hover:text-orange-400 flex items-center gap-1">
            <Phone className="w-3 h-3 text-orange-500" />
            832-244-2036
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        id="app_navbar"
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? "bg-slate-950/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo - Styled visually with dynamic color */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2.5 cursor-pointer text-left focus:outline-none group"
            >
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform duration-300">
                <Wrench className="w-5.5 h-5.5 text-white stroke-[2.5]" />
              </div>
              <div>
                <span className="block text-lg font-extrabold tracking-tight text-white group-hover:text-orange-500 transition-colors">
                  ARNOLD'S
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1 group-hover:text-slate-200 transition-colors">
                  Small Engine Repair
                </span>
              </div>
            </button>

            {/* Desktop Items */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative text-sm font-medium tracking-wide transition-colors py-1 cursor-pointer hover:text-orange-500 ${
                      activeSection === item.id ? "text-orange-500" : "text-slate-300"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={openBookingDialog}
                  id="nav_book_btn"
                  className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-0.5 transition-all duration-300 pointer-events-auto cursor-pointer"
                >
                  Request Service
                </button>
                <a
                  href="tel:8322442036"
                  id="nav_phone_link"
                  className="hidden lg:flex items-center gap-2 bg-slate-900 border border-white/10 hover:border-orange-500/50 hover:bg-slate-850 px-4 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>Call 832-244-2036</span>
                </a>
              </div>
            </div>

            {/* Mobile Burger Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                id="mobile_menu_toggle"
                className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg bg-slate-900/60 border border-white/5"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/98 backdrop-blur-lg border-b border-white/10 px-4 py-6 flex flex-col gap-4 shadow-2xl transition-all duration-300 z-50 animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-base font-medium py-2 px-3 rounded-lg cursor-pointer ${
                    activeSection === item.id ? "bg-orange-600/10 text-orange-500 font-semibold" : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="h-[1px] bg-white/10 my-1"></div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openBookingDialog();
                }}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg text-center shadow-md shadow-orange-600/10 cursor-pointer"
              >
                Request Service
              </button>
              <a
                href="tel:8322442036"
                className="w-full bg-slate-900 border border-white/10 text-slate-100 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-850"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                Call 832-244-2036
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
