import { ShieldAlert, Heart, Medal, MapPin, Award, CheckSquare } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Medal className="w-5 h-5 text-orange-500" />,
      title: "Experienced Workmanship",
      desc: "Every mechanic at Arnold's understands 2-stroke and 4-stroke small engines to their core. We bore cylinders, trace ignition faults, test stators, and balance carburetor jets with mathematical precision.",
    },
    {
      icon: <Heart className="w-5 h-5 text-orange-500" />,
      title: "Honesty-First Diagnostics",
      desc: "We never upsell unrequested components or suggest fake issues. If an engine just needs an idle screw correction rather than a whole carburetor overhaul, that's exactly what we report and charge.",
    },
    {
      icon: <CheckSquare className="w-5 h-5 text-orange-500" />,
      title: "Service With Texas Integrity",
      desc: "Local owners Ryan Arnold and our technicians believe in treating every customer with dignity and warmth. We stand fully behind our repair warranties and back every diagnostic estimate.",
    },
  ];

  const serviceLocations = [
    "New Braunfels",
    "Gruene",
    "Seguin",
    "Canyon Lake",
    "San Marcos",
    "Sattler",
    "Bulverde",
    "Marion",
    "Hunter",
  ];

  return (
    <section id="about" className="py-24 bg-slate-950 bg-grid relative overflow-hidden text-left">
      {/* Visual gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Block - Storytelling text */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-orange-500 font-mono font-bold tracking-widest text-xs uppercase block">
              Our Roots & Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Locally Owned, Hardworking Texas Repair Shop
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed font-serif italic text-lg opacity-90">
              "We built Arnold's Small Engine Repair because New Braunfels customers deserve honest mechanical expertise with rapid turnaround."
            </p>

            <div className="flex flex-col gap-4 text-slate-400 text-sm leading-relaxed">
              <p>
                Founded and managed locally by Ryan Arnold, our business was established to solve a common contractor and homeowner frustration: waiting weeks for massive retail dealers to perform basic yard tool tune-ups, or getting hit with surprise upcharges on simple services.
              </p>
              <p>
                From simple string trimmers and leaf blowers to commercial-grade zero-turn mowers and critical standby emergency generators, we provide specialized diagnostic routines that find the exact root cause of your engine issues. Located deep in the heart of New Braunfels, we are proud to support the local neighborhood economy.
              </p>
            </div>

            {/* Principles values list */}
            <div className="flex flex-col gap-5 mt-4">
              {values.map((v, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/40 relative">
                  <div className="p-2 h-fit bg-orange-950/40 border border-orange-950/60 rounded-lg text-orange-500">
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">
                      {v.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block - Fun Interactive Coverage Area & Stats Widget */}
          <div className="lg:col-span-15 xl:col-span-5 flex flex-col gap-8">
            <div className="glass rounded-2xl p-6 sm:p-8 border-slate-500/10 text-left relative overflow-hidden shadow-2xl">
              {/* Overlay */}
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-blue-600/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-500" />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">
                  Our Community Coverage
                </h4>
              </div>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                As a local business, we operate repair pickup routes and mobile services across Comal and Guadalupe Counties, Texas.
              </p>

              {/* Service tags cloud */}
              <div className="mt-6 flex flex-wrap gap-2">
                {serviceLocations.map((loc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-slate-950 border border-white/10 hover:border-orange-500/40 hover:text-orange-400 py-1.5 px-3 rounded-lg text-[11px] font-mono font-medium text-slate-300 transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                    <span>{loc}, TX</span>
                  </div>
                ))}
              </div>

              {/* Stats Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                <div className="p-3 bg-slate-950 border border-white/10 rounded-xl">
                  <span className="block text-xl sm:text-2xl font-extrabold text-orange-500 font-mono">
                    832-
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    244-2036
                  </span>
                </div>
                <div className="p-3 bg-slate-950 border border-white/10 rounded-xl">
                  <span className="block text-xl sm:text-2xl font-extrabold text-white font-mono">
                    2-4
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Day Turnaround
                  </span>
                </div>
              </div>

              {/* CTA mapping */}
              <div className="mt-6 bg-orange-950/20 border border-orange-900/30 rounded-xl p-3 flex items-start gap-2 text-left">
                <ShieldAlert className="w-4.5 h-4.5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-400 leading-normal">
                  Need massive ride deck equipment transported to the shop? Ask owner Ryan about our convenient pickup truck freight options! Only a small fee applies based on county mileage.
                </p>
              </div>
            </div>

            {/* Local business coordinates badges for organic localized search rankings */}
            <div className="bg-slate-900 border border-white/5 p-4 rounded-xl flex items-center justify-between text-left">
              <div>
                <span className="block text-[9px] font-mono text-slate-500 uppercase">Operating Center:</span>
                <span className="block text-[12px] font-bold text-slate-300 mt-0.5">Comal & Guadalupe Counties, TX</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div>
                <span className="block text-[9px] font-mono text-slate-500 uppercase">Owner Email:</span>
                <a href="mailto:ryanarnold1216@gmail.com" className="block text-[12px] font-bold text-orange-400 hover:text-orange-300">
                  ryanarnold1216@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
