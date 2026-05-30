import { useState, useEffect } from "react";
import { Phone, Calendar, ShieldCheck, Star, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onBookClick, onExploreServices }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [engineActive, setEngineActive] = useState(true);
  const [combustionStage, setCombustionStage] = useState(0);

  // Mouse parallax motion coordinates tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 25;
      const y = (clientY - window.innerHeight / 2) / 25;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Simulator for an internal 4-stroke small engine combustion loop
  useEffect(() => {
    if (!engineActive) return;
    const interval = setInterval(() => {
      setCombustionStage((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, [engineActive]);

  const stages = [
    { title: "Intake", desc: "Fuel & air enter chamber", hexColor: "text-blue-400" },
    { title: "Compression", desc: "Piston moves upward", hexColor: "text-amber-500" },
    { title: "Combustion", desc: "Spark ignites mixture", hexColor: "text-red-500" },
    { title: "Exhaust", desc: "Burned gases expelled", hexColor: "text-slate-400" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-8 pb-16 overflow-hidden bg-slate-950 bg-grid"
    >
      {/* Background radial gradients for futuristic 3D ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[40vw] h-[40vw] max-w-[500px] bg-sky-900/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-[45vw] h-[45vw] max-w-[500px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Columns - Premium Marketing and Typography */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left animate-in fade-in slide-in-from-left-6 duration-1000">
            {/* Local Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-mono font-semibold text-slate-300 tracking-wide uppercase">
                New Braunfels, Texas • Veteran / Owner Managed
              </span>
            </div>

            {/* Main Visual Headline with elegant serif/sans contrast */}
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Expert Small Engine <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500">
                  Repair & Maintenance
                </span>
              </h1>
              <p className="font-serif italic text-lg sm:text-2xl text-slate-300 tracking-wide font-light">
                New Braunfels' premier mechanical specialist.
              </p>
            </div>

            {/* Subheadline describing capabilities */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              Reliable service for lawn equipment, generators, chainsaws, string trimmers, pressure washers, and more. Fast diagnostic times and expert quality craftsmanship you can trust.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button
                onClick={onBookClick}
                id="hero_book_btn"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-0.5 transition-all duration-300 text-base cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-5 h-5 stroke-[2.5]" />
                Request Service
              </button>

              <a
                href="tel:8322442036"
                id="hero_call_btn"
                className="bg-slate-900 hover:bg-slate-850 text-white font-semibold px-8 py-4 rounded-xl border border-white/10 hover:border-orange-500/50 transition-all duration-300 text-base text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-orange-500" />
                Call 832-244-2036
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 mt-4 max-w-lg">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-orange-950/40 border border-orange-900/30 text-orange-500">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quality Work</h4>
                  <p className="text-[11px] text-slate-500">Guaranteed parts & labor</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-orange-950/40 border border-orange-900/30 text-orange-500">
                  <Star className="w-4.5 h-4.5 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Diagnostic</h4>
                  <p className="text-[11px] text-slate-500">2-4 days typical repair</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-orange-950/40 border border-orange-900/30 text-orange-500">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Local Service</h4>
                  <p className="text-[11px] text-slate-500">Friendly Texas crew</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Interactive "3D Layered" Mechanic Visual Engine Assembly Mockup */}
          <div
            className="lg:col-span-5 relative w-full flex justify-center items-center h-[420px] lg:h-[500px]"
            style={{
              transform: `rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* outer visual orbital ring */}
            <div className="absolute w-[360px] h-[360px] border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none"></div>
            <div className="absolute w-[420px] h-[420px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite_reverse] pointer-events-none"></div>

            {/* Inner mechanical engine block 3D mockup */}
            <div className="absolute w-72 h-80 glass rounded-2xl flex flex-col justify-between p-6 shadow-2xl relative border-orange-500/10">
              
              {/* Header inside mechanical card */}
              <div className="flex justify-between items-center bg-slate-900/80 px-4 py-2.5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-2">
                  <RefreshCw className={`w-3.5 h-3.5 text-orange-500 ${engineActive ? 'animate-spin' : ''}`} />
                  <span className="text-xs font-mono font-bold text-orange-500">ENGINE_MONITOR</span>
                </div>
                <button
                  onClick={() => setEngineActive(!engineActive)}
                  className="bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-bold px-2.5 py-1 rounded border border-white/10 transition-colors"
                >
                  {engineActive ? "PAUSE SIM" : "RUN SIM"}
                </button>
              </div>

              {/* The Piston Cylinder Chamber SVG Representation */}
              <div className="my-4 flex-1 flex flex-col items-center justify-center relative">
                <svg className="w-44 h-48" viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Combustive chamber walls */}
                  <rect x="35" y="10" width="90" height="120" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="3" />
                  
                  {/* Rotating Crankshaft bottom circle */}
                  <circle cx="80" cy="150" r="18" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
                  <circle cx="80" cy="150" r="4" fill="#f97316" />
                  
                  {/* Piston Rod linking crank to head */}
                  {/* Coordinates move according to combustionStage simulate 4 distinct levels */}
                  {(() => {
                    const positionsY = [105, 75, 55, 80]; // piston positions
                    const rodEndPositionsX = [80 + 12, 80, 80 - 12, 80];
                    const rodEndPositionsY = [150 + 12, 150 - 15, 150 - 12, 150];
                    const yOffset = positionsY[combustionStage];
                    const rx = rodEndPositionsX[combustionStage] || 80;
                    const ry = rodEndPositionsY[combustionStage] || 150;
                    
                    return (
                      <>
                        {/* Connecting rod */}
                        <line x1="80" y1={yOffset + 20} x2={rx} y2={ry} stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                        
                        {/* Piston head bucket */}
                        <rect x="38" y={yOffset} width="84" height="28" rx="2" fill="#334155" stroke="#ea580c" strokeWidth={combustionStage === 2 ? "2" : "1"} />
                        
                        {/* High-impact Fire spark flash on stage 2 (combustion) */}
                        {combustionStage === 2 && (
                          <g>
                            {/* Outer radial flash */}
                            <circle cx="80" cy="30" r="35" fill="url(#fireGradient)" opacity="0.65" />
                            {/* Star spark burst */}
                            <path d="M80 10L83 23L96 20L86 28L92 41L80 32L68 41L74 28L64 20L77 23Z" fill="#fb923c" className="animate-pulse" />
                            <circle cx="80" cy="25" r="4" fill="#ffffff" />
                          </g>
                        )}
                      </>
                    );
                  })()}

                  {/* Top Valve indicators */}
                  {/* Left Valve */}
                  <line x1="50" y1="5" x2="50" y2="15" stroke={combustionStage === 0 ? "#60a5fa" : "#475569"} strokeWidth="3" />
                  {/* Right Valve */}
                  <line x1="110" y1="5" x2="110" y2="15" stroke={combustionStage === 3 ? "#94a3b8" : "#475569"} strokeWidth="3" />

                  <defs>
                    <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="80%" stopColor="#f43f5e" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* Spark indicator absolute badge */}
                {combustionStage === 2 && (
                  <div className="absolute top-2 right-6 bg-red-950/70 border border-red-800 text-red-400 font-mono text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 animate-bounce">
                    <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-ping" />
                    SPARK IGNITION!
                  </div>
                )}
              </div>

              {/* Combustion Stage Details indicator footer */}
              <div className="border-t border-white/10 pt-3 relative bg-slate-900/50 p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Stroke Cycle:</span>
                  <span className="text-[10px] font-bold text-orange-500 font-mono uppercase">
                    4-Stroke cycle
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className={`text-sm font-bold tracking-wide ${stages[combustionStage].hexColor}`}>
                    {stages[combustionStage].title}
                  </span>
                  <span className="text-[11px] text-slate-400 text-right">
                    {stages[combustionStage].desc}
                  </span>
                </div>
              </div>
            </div>

            {/* Float visual cards orbiting the engine block */}
            <div className="absolute top-4 -right-16 bg-slate-900/90 border border-white/10 hover:border-orange-500/50 p-3 rounded-xl shadow-lg w-44 hover-glow transition-all duration-300 transform translate-z-[40px] hidden sm:block">
              <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                Authorized Service
              </span>
              <span className="block font-bold text-slate-200 text-xs mt-0.5 leading-tight">
                Briggs, Honda, Kohler, Kawasaki & STIHL
              </span>
            </div>

            <div className="absolute -bottom-8 -left-12 bg-slate-900/95 border border-white/10 hover:border-orange-500/50 p-4 rounded-xl shadow-lg w-52 hover-glow transition-all duration-300 transform translate-z-[50px] hidden sm:block text-left">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-slate-400 font-bold text-[10px] uppercase font-mono tracking-wider">
                  Open for Appointments
                </span>
              </div>
              <span className="block text-[11px] text-slate-400 mt-1">
                Drop off and Mobile pickup routes active daily.
              </span>
              <button
                onClick={onBookClick}
                className="mt-2 text-[10px] font-bold text-orange-400 hover:text-orange-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
              >
                Launch Booking Forms &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
