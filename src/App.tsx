import { useState, useEffect } from "react";
import { 
  Phone, 
  Calendar, 
  User, 
  Star, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  ArrowUp, 
  Wrench, 
  Settings, 
  CheckCircle, 
  ShieldCheck, 
  ShieldAlert, 
  HelpCircle,
  MapPin,
  Clock,
  Sparkles,
  Award
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import ChatBot from "./components/ChatBot";
import { FAQItem } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  // Monitor scroll for Scroll to Top visibility & Nav links activation
  useEffect(() => {
    const handleScroll = () => {
      // Toggle scroll to top button
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Check sections scroll offsets to dynamically light up navbar anchors
      const sections = ["home", "services", "about", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleExploreServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Structured list of real-world FAQs
  const faqData: FAQItem[] = [
    {
      question: "What types of small engine equipment do you handle?",
      answer: "We repair and maintain almost all residential and commercial walk-behind mowers, lawn tractors, high-end zero-turn machines, portable and standby generators, gas chainsaws, string trimmers, edgers, leaf backpack blowers, and portable pressure washers. We service major premium engine brands including Honda, Briggs & Stratton, Kawasaki, Kohler, Husqvarna, STIHL, Echo, Toro, and Craftsman.",
      category: "services"
    },
    {
      question: "How long does a typical diagnostic or repair service take?",
      answer: "Our standard shop turnaround time is normally between 2 to 4 business days. This timeframe varies based on the current repair queue volume and how quickly we can source specialized OEM replacement parts. Our team will keep you updated via our live tracking portal!",
      category: "timing"
    },
    {
      question: "How much does a diagnostics estimate check cost?",
      answer: "We offer transparent flat-rate diagnostic fees: $35 for low displacement handheld outdoor equipment (trimmers, handheld blowers), $55 for walk-behind engines, and $85 for commercial zero-turn or industrial riding systems. The great news is: our diagnostics fee is 100% waived and directly applied to the total repair cost once you authorize us to proceed with the service!",
      category: "pricing"
    },
    {
      question: "Do you offer pickup and delivery for heavy riding equipment?",
      answer: "Yes, we do! We provide convenient pickup and delivery trailers for heavy or non-functional zero-turn mowers and lawn tractors in the wider New Braunfels area. A modest flat trip fee is calculated directly based on your zip code or mileage distance from Comal County limits.",
      category: "services"
    },
    {
      question: "What simple steps can I take to prevent carburetor failure?",
      answer: "Approximately 90% of mower starting failures are completely caused by stale fuel rotting the carburetor jets. We recommend: 1) Always use high-quality fresh fuel (less than 30 days old), 2) Utilize ethanol-free fuel whenever possible, 3) Add a quality gasoline stabilizer to gas containers, and 4) Run the carburetor dry before storing lawn gear for the winter season.",
      category: "preventative"
    },
    {
      question: "Are your engine repairs backed by a service warranty?",
      answer: "Absolutely. Here at Arnold's Small Engine Repair, we believe in honest Texas work. All of our replacement components and mechanical repair labor are fully backed by our solid 30-day warranty. If any verified issue with our repair work pops up within 30 days of shop pick-up, we'll make it right at zero additional cost to you.",
      category: "pricing"
    }
  ];

  // Professional Customer Testimonials Array
  const reviews = [
    {
      name: "Marcus Peterson",
      role: "Landscaping Business Owner",
      equipment: "Commercial Scag Zero-Turn",
      text: "Outstanding turnaround! We had two hydro pumps slipping mid-job on our zero-turn. Ryan diagnosed them in one afternoon and had us back mowing lanes before the weekend. He is our go-to engine specialist in NB.",
      stars: 5,
      date: "May 2026"
    },
    {
      name: "Clara Henderson",
      role: "Canyon Lake Homeowner",
      equipment: "Honda GCV160 Push Mower",
      text: "Our push mower sat in the tool garage all winter and wouldn't crank a single pull. Arnold's did an ultrasonic carburetor deep clean and full safety tune-up. It now starts perfectly on the very first pull! Fair rates and honest updates.",
      stars: 5,
      date: "April 2026"
    },
    {
      name: "Gavin Mitchell",
      role: "Gruene Estates Resident",
      equipment: "Generac Portable Generator",
      text: "With variable Texas storms, having a fully functional backup generator is absolutely crucial. Ryan serviced our generator's fuel system and checked running voltages. Incredible peace of mind. Very professional local service.",
      stars: 5,
      date: "March 2026"
    }
  ];

  // Local Business JSON-LD Schema markup for premium SEO authority
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Arnold's Small Engine Repair",
    "image": "https://iwebnext.com/arnolds_logo.png",
    "@id": "https://arnoldssmallengine.com",
    "url": "https://arnoldssmallengine.com",
    "telephone": "832-244-2036",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "New Braunfels County Limits",
      "addressLocality": "New Braunfels",
      "addressRegion": "TX",
      "postalCode": "78130",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.703,
      "longitude": -98.124
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "New Braunfels"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Gruene"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Canyon Lake"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Seguin"
      }
    ]
  };

  return (
    <div className="min-h-screen text-slate-100 bg-slate-950 font-sans flex flex-col justify-between selection:bg-orange-600 selection:text-white">
      
      {/* Dynamic SEO JSON-LD Injected to Head Area or Hidden Container */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Primary Floating Alert Banner - Geometric Warning */}
      <div className="bg-orange-600 text-white text-center py-2 px-4 text-xs font-mono font-extrabold uppercase tracking-widest z-50 relative border-b-2 border-slate-950 flex items-center justify-center gap-2">
        <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
        <span>Storm season prep routes active. Check generator safety diagnostics immediately.</span>
        <button 
          onClick={handleBookClick}
          className="underline text-white hover:text-slate-100 font-bold ml-2 cursor-pointer whitespace-nowrap"
        >
          Book Now &rarr;
        </button>
      </div>

      {/* Main Responsive Navigation menu */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        openBookingDialog={handleBookClick} 
      />

      {/* Sections Container */}
      <main className="flex-1">
        
        {/* Hero Banner Component */}
        <Hero onBookClick={handleBookClick} onExploreServices={handleExploreServices} />
        
        {/* Core Quick Segment Strips - Aesthetic Geometric Value Block banner */}
        <section className="bg-white text-slate-950 py-10 px-4 sm:px-8 border-y-4 border-slate-900 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-orange-500 rounded text-white shrink-0 shadow-lg shadow-orange-500/15">
                  <Wrench className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm uppercase tracking-wide text-slate-900">
                    Lawn Mower Specialist
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Push, self-propelled, tractor, and commercial zero-turn decks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t sm:border-t-0 sm:border-l border-slate-200 pt-6 sm:pt-0 sm:pl-6">
                <div className="p-2.5 bg-orange-500 rounded text-white shrink-0 shadow-lg shadow-orange-500/15">
                  <Settings className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm uppercase tracking-wide text-slate-900">
                    Emergency Power
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Generator engine repairs so you never lose power in Texas storms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-6">
                <div className="p-2.5 bg-orange-500 rounded text-white shrink-0 shadow-lg shadow-orange-500/15">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm uppercase tracking-wide text-slate-900">
                    30-Day Solid Warranty
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    We stand completely behind our parts, labor, and diagnostic tuning.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-6">
                <div className="p-2.5 bg-orange-500 rounded text-white shrink-0 shadow-lg shadow-orange-500/15">
                  <Award className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm uppercase tracking-wide text-slate-900">
                    Locally Operated
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Friendly mechanics backing families in New Braunfels community.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Services Showcase Panel */}
        <Services onBookClick={handleBookClick} />

        {/* Trust Badges & Interactive Reviews Bento-grid */}
        <section className="py-24 bg-slate-950 bg-grid border-b border-white/5 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-orange-500 font-mono font-bold tracking-widest text-xs uppercase block mb-3">
                  Texas Client Reviews
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                  What Neighbors Say About Ryan
                </h2>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-white/15 p-3.5 rounded-xl">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono font-extrabold text-slate-200">
                  5.0 OUT OF 5.0 RATING
                </span>
              </div>
            </div>

            {/* Reviews Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((rev, index) => (
                <div 
                  key={index} 
                  className="bg-slate-900/40 border-2 border-slate-800 p-6 rounded-xl hover:border-orange-500/30 transition-all duration-350 flex flex-col justify-between group relative"
                >
                  <div className="absolute top-0 right-0 w-1.5 h-12 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div>
                    {/* Stars bar */}
                    <div className="flex text-amber-500 mb-4">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5 text-left">
                    <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center text-orange-400 font-bold text-xs uppercase font-mono">
                      {rev.name[0]}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">{rev.name}</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {rev.role} • <span className="text-orange-500">{rev.equipment}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini visual trust badges strip */}
            <div className="mt-16 bg-slate-900 border border-white/5 py-6 px-8 rounded-2xl flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all">
              <span className="font-mono text-xs font-bold tracking-widest text-slate-400">HONDA CERTIFIED BULLETINS</span>
              <span className="font-mono text-xs font-bold tracking-widest text-slate-400">BRIGGS & STRATTON QUALIFIED</span>
              <span className="font-mono text-xs font-bold tracking-widest text-slate-400">KOHLER POWER EXPERT WORKPLACE</span>
              <span className="font-mono text-xs font-bold tracking-widest text-slate-400">STIHL 2-STROKE SPECIALIST</span>
            </div>

          </div>
        </section>

        {/* About Us section */}
        <About />

        {/* Collapsible FAQ Section with heavy Geometric layout */}
        <section className="py-24 bg-slate-900 border-t border-b border-orange-500/5 text-left relative">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center mb-16">
              <span className="text-orange-500 font-mono font-bold tracking-widest text-xs uppercase block mb-3">
                Got Questions? Let's Troubleshoot
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                Frequently Asked Inquiries
              </h2>
              <div className="h-1.5 w-24 bg-orange-500 mx-auto mt-4 rounded-full" />
            </div>

            {/* Accordion List wrapping */}
            <div className="space-y-4">
              {faqData.map((faq, index) => {
                const isOpen = openFAQIndex === index;
                return (
                  <div 
                    key={index} 
                    className="bg-slate-950 border-2 border-slate-800 rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none hover:bg-slate-900/60"
                    >
                      <h3 className="font-bold text-sm text-white tracking-wide uppercase flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-orange-500 shrink-0" />
                        {faq.question}
                      </h3>
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400">
                        {isOpen ? <ChevronUp className="w-4 h-4 stroke-[2.5]" /> : <ChevronDown className="w-4 h-4 stroke-[2.5]" />}
                      </div>
                    </button>

                    {/* Collapsible Answer container with smooth visual transitions */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-white/5 bg-slate-950 text-slate-400 text-xs sm:text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                        <p>{faq.answer}</p>
                        <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                          <span>SECTION: {faq.category}</span>
                          <span>•</span>
                          <span>MAINTENANCE CODE: 2S/4S TECH</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center bg-slate-950 border border-white/5 p-5 rounded-2xl max-w-lg mx-auto">
              <p className="text-xs text-slate-400">
                Have a highly unique, specialized engine question or hard-to-find part requirement?
              </p>
              <a 
                href="mailto:ryanarnold1216@gmail.com"
                className="inline-block text-xs font-bold text-orange-500 hover:text-orange-400 underline underline-offset-4 mt-2 font-mono uppercase tracking-wider"
              >
                Inquire With Ryan Directly &rarr;
              </a>
            </div>

          </div>
        </section>

        {/* Contact System & Live Action Ticket Database Tracking */}
        <Contact />

      </main>

      {/* Floating Chat Widget Integration */}
      <ChatBot />

      {/* Bottom Sticky Mobile Action bar for pristine direct quick action click-to-calls */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/98 backdrop-blur-md border-t-2 border-orange-500 py-3 px-4 grid grid-cols-2 gap-3 shadow-inner">
        <a 
          href="tel:8322442036"
          className="bg-slate-900 border border-white/10 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-lg h-12 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-orange-500" />
          Call Now
        </a>
        <button
          onClick={handleBookClick}
          className="bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg h-12 flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          Request Service
        </button>
      </div>

      {/* Floating Scroll To Top Indicator Widget */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          id="scroll_to_top_bubble"
          className="fixed bottom-6 left-6 z-40 bg-slate-950/80 hover:bg-slate-900 border border-white/15 hover:border-orange-500 text-slate-300 hover:text-white p-3.5 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 transform active:scale-95 cursor-pointer flex items-center justify-center"
          title="Scroll To Top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Professional Footer Element with Hyperlink */}
      <footer className="bg-slate-950 text-slate-500 text-xs py-10 px-4 border-t border-white/10 text-center pb-20 md:pb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">
              Arnold's Small Engine Repair
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal max-w-sm">
              Premium 2-stroke and 4-stroke small engine restoration service, proudly supporting New Braunfels, Seguin, and Canyon Lake neighbors.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-xs">
            <div className="flex gap-4">
              <a href="#services" onClick={handleExploreServices} className="hover:text-white transition-colors">Services Directory</a>
              <span>•</span>
              <a href="#about" className="hover:text-white transition-colors">About Team</a>
              <span>•</span>
              <a href="#contact" className="hover:text-white transition-colors">Service Tracker</a>
            </div>
            
            <div className="text-[10px] font-mono text-slate-600 uppercase border border-white/5 py-1 px-3 rounded bg-slate-900/30">
              License Block: Owner Managed nb, tx
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
          <p className="text-slate-600">
            &copy; {new Date().getFullYear()} Arnold's Small Engine Repair. All Rights Reserved.
          </p>
          <p className="text-slate-500">
            Developed by{" "}
            <a 
              href="https://iwebnext.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-orange-500 hover:text-orange-400 hover:underline transition-all"
            >
              iWebNext
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}
