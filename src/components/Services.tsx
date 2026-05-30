import { useState } from "react";
import { 
  CheckCircle, 
  Settings, 
  Activity, 
  ShieldCheck, 
  Search,
  Wrench,
  AlertTriangle,
  Flame,
  Zap,
  Phone,
  Calendar,
  Layers,
  Sparkles,
  Scissors
} from "lucide-react";
import { ServiceItem } from "../types";

interface ServicesProps {
  onBookClick: () => void;
}

export default function Services({ onBookClick }: ServicesProps) {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>("mower-walk");

  const servicesData: ServiceItem[] = [
    {
      id: "mower-walk",
      name: "Walk-Behind Lawn Mower Repair",
      category: "mower",
      description: "Complete repair, diagnosis, and tune-up services for push mowers, self-propelled mowers, and walk-behind grass cutting equipment.",
      benefits: [
        "Restores smooth single-pull starting",
        "Improves grass collection and bagging suction",
        "Prevents uneven cutting patterns",
        "Maximizes engine cooling and lifetime"
      ],
      commonProblems: [
        "Engine cranks but won't catch",
        "Stalling mid-cut or smoking from exhausting housing",
        "Engine runs rough, surges, or vibrates aggressively",
        "Self-propelled drive transmission slipping"
      ],
      priceRange: "$75 - $150 + parts",
      iconName: "Wrench"
    },
    {
      id: "mower-riding",
      name: "Riding Lawn Mower Repair",
      category: "mower",
      description: "Professional heavy-duty repair services for traditional tractor and riding lawn mowers. We inspect belts, transmissions, and electrical starters.",
      benefits: [
        "Restores powerful forward/reverse hydrostatic drive",
        "Guarantees fast electric push-start capability",
        "Extends battery life and alternator charge efficiency",
        "Enhances general operator comfort and safety"
      ],
      commonProblems: [
        "Starter solenoid clicking; engine refuses to turn over",
        "Uneven cutting or leaving rows of uncut grass",
        "Transmission slipping on hills or standard inclines",
        "Riding deck shaking violently when blades engage"
      ],
      priceRange: "$150 - $350 + parts",
      iconName: "Layers"
    },
    {
      id: "mower-zeroturn",
      name: "Zero-Turn Mower Maintenance",
      category: "mower",
      description: "High-precision commercial and residential zero-turn mower servicing. We synchronize dual steering drives, replace hydraulic fluid, and sharpen multi-blades.",
      benefits: [
        "Restores exact precision tracking and zero-spin steering",
        "Prevents costly premature steering hydrostatic wear",
        "Increases acres-per-hour cutting speeds",
        "Keeps tires and cutting deck perfectly level"
      ],
      commonProblems: [
        "Mower drifting continuously to one side while steering",
        "Spindle bearings squealing loudly under deck",
        "Loss of mechanical hydraulic steering pressure",
        "Belts popping off pulleys or snapping mid-run"
      ],
      priceRange: "$180 - $400 + parts",
      iconName: "Activity"
    },
    {
      id: "generator-repair",
      name: "Generator Emergency Repair",
      category: "power",
      description: "Standby and portable generator engine service. Highly critical maintenance to prepare for heavy Texas summer storm grids and winter cold fronts.",
      benefits: [
        "Guarantees emergency starting when power grid fails",
        "Ensures perfectly clean, regulated voltage output",
        "Prevents hazardous fuel tank storage gumming",
        "Safeguards home electronic appliances"
      ],
      commonProblems: [
        "Generator refuses to start after long storage periods",
        "Engine hunting, surging, and output voltage flickering",
        "No electrical output despite engine running smoothly",
        "Fuel spraying out of dry-rotted lines and carburetor"
      ],
      priceRange: "$95 - $220 + parts",
      iconName: "Zap"
    },
    {
      id: "chainsaw-repair",
      name: "Chainsaw Support & Repair",
      category: "handheld",
      description: "Expert mechanical maintenance for Stihl, Husqvarna, Echo, and other heavy-duty chainsaws. We calibrate clutches, oil-pumps, and engine compression.",
      benefits: [
        "Restores direct chain throttling speeds",
        "Promotes clean branch-cutting safety with active chain-brakes",
        "Eliminates hard-pull start stresses",
        "Maximizes bar-lubrication lines for durable chain runs"
      ],
      commonProblems: [
        "Chain won't revolve despite engine revving to max",
        "Saw starting briefly, then choking out instantly",
        "No bar oil spray leading to overheating chain friction",
        "Hard cold starting or weak idling power"
      ],
      priceRange: "$65 - $140 + parts",
      iconName: "Flame"
    },
    {
      id: "carburetor-service",
      name: "Ultrasonic Carburetor Service",
      category: "maintenance",
      description: "Full carburetor disassembly, high-power ultrasonic bath solvent scrubbing, rebuild with brand new gaskets, jets, float needle, and precise mechanical idling adjustments.",
      benefits: [
        "Cures 90% of rough running/surging engine cases",
        "Saves money over complete factory carbohydrate replacement",
        "Drastically improves overall fuel combustion mileage",
        "Establishes a rock-solid, smooth idle tone"
      ],
      commonProblems: [
        "Engine only runs when choke is manually pulled high",
        "Fuel leaking onto garage floor from air inlet",
        "Severe engine backfiring or sluggish throttle response",
        "Equipment dies instantly when load or deck engages"
      ],
      priceRange: "$80 - $160 + parts",
      iconName: "Settings"
    },
    {
      id: "hedge-trimmer",
      name: "String Trimmer & Edger Repair",
      category: "handheld",
      description: "Tune-ups and carburetor overhauls for string trimmers, commercial weed eaters, brush cutters, and lawn edgers.",
      benefits: [
        "Ensures lighting-fast triggers and high RPM cycles",
        "Reduces high exhaust odors from rich fuel mixtures",
        "Restores manual line-head winding mechanisms",
        "Maintains precise visual lawn framing power"
      ],
      commonProblems: [
        "Bumping and line feeding head jammed or seized",
        "Trimmer bogs down and dies as soon as you feed gas",
        "Fuel lines cracking and leaking raw gas from gas tank",
        "Hard pulls; recoil hand starter sliding loose"
      ],
      priceRange: "$55 - $110 + parts",
      iconName: "Wrench"
    },
    {
      id: "leaf-blower",
      name: "Handheld & Backpack Leaf Blower Repair",
      category: "handheld",
      description: "Diagnostics and repairs for 2-stroke and 4-stroke yard leaf blowers. Includes exhaust spark arrestor cleaning and fuel system refreshes.",
      benefits: [
        "Restores maximum CFM air-blast velocity",
        "Eliminates heavy mechanical vibration fatigues",
        "Clears carbon build-ups restricting throttle power",
        "Ensures reliable operation for fall foliage cleanups"
      ],
      commonProblems: [
        "Blower won't reach full blowing speeds and feels bogged",
        "Fuel primer bulb dried out, hardened, or cracked",
        "Clogged spark arrestor screen choking engine flow",
        "Crankcase seals leaking on old 2-stroke units"
      ],
      priceRange: "$60 - $120 + parts",
      iconName: "Layers"
    },
    {
      id: "pressure-washer",
      name: "Pressure Washer Diagnostics",
      category: "power",
      description: "Servicing engines matched with high-pressure power washer water pumps. Includes unloader valve replacements and thermal relief calibration.",
      benefits: [
        "Preserves pump seals from cracking under heating cycles",
        "Restores max PSI power wash scrubbing strength",
        "Allows easy, drag-resistant cord pulling",
        "Ensures consistent water-injection speeds"
      ],
      commonProblems: [
        "Engine runs but low water pressure exits wand nozzles",
        "Engine stalls as soon as gun trigger is pulled tight",
        "Water leaking extensively from pump manifold head",
        "Unloader valve stuck resulting in over-pressurized stalls"
      ],
      priceRange: "$85 - $185 + parts",
      iconName: "Activity"
    },
    {
      id: "tuneup-preventative",
      name: "Full Engine Tune-Ups",
      category: "maintenance",
      description: "Comprehensive multi-point inspection. We replace air/fuel filters, spark plug, flush old gasoline, install premium synthetic engine oil, and check engine cylinder compression.",
      benefits: [
        "Extends engine product life by 100% or more",
        "Dramatically improves cold morning starting",
        "Saves fuel and reduces smoke emission exhaust",
        "Catches minor issues before they cause total failures"
      ],
      commonProblems: [
        "Equipment sat idle in garage for more than 5 months",
        "Black soot smoke blowing from exhaust silencer",
        "Rough, sputtering operation under mild load",
        "Dark, thick, or low engine oil levels"
      ],
      priceRange: "$65 - $130 (size-based)",
      iconName: "ShieldCheck"
    },
    {
      id: "blade-sharpening",
      name: "Precision Blade Sharpening & Balance",
      category: "maintenance",
      description: "Removing, cleaning, grinding exact factory-angle cutting edges, testing static balance to prevent engine spindle failure, and securing deck bolts.",
      benefits: [
        "Prevents brown, frayed grass tips and lawn diseases",
        "Reduces cut time by slicing through stubborn weeds",
        "Protects crankshaft spindles from dynamic vibrations",
        "Improves grass mulching and vacuum discharge efficiency"
      ],
      commonProblems: [
        "Grass tips look yellow/browned and shredded on top",
        "Severe shaking when mower blade engagement is ON",
        "Mower leaves uneven rows of tall grass in its wake",
        "Vibrational noise causing deck bolts to rattle"
      ],
      priceRange: "$15 - $35 per blade",
      iconName: "Scissors"
    },
    {
      id: "seasonal-prep",
      name: "Seasonal Winterization & Spring Prep",
      category: "maintenance",
      description: "Preparing your equipment for long storage or active service. We drain carburetors, treat fuel lines, inspect belts, and fog engine cylinders with defense oil.",
      benefits: [
        "Avoids costly spring carburetor cleanings next year",
        "Protects internal steel cylinder bores from rust",
        "Makes spring startup as simple as pushing a button",
        "Maintains battery strength during harsh winter freezes"
      ],
      commonProblems: [
        "Equipment won't start in spring due to varnished fuel",
        "Battery dead / ruined after sitting out in freezing temps",
        "Internal corrosion causing engine to seize",
        "Condensation water rusting fuel tanks internally"
      ],
      priceRange: "$50 - $110 + parts",
      iconName: "Sparkles"
    }
  ];

  const filteredServices = servicesData.filter(services => {
    const matchesCategory = filter === "all" || services.category === filter;
    const matchesSearch = services.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          services.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          services.commonProblems.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getIcon = (name: string) => {
    switch(name) {
      case "Wrench": return <Wrench className="w-5 h-5 text-orange-500" />;
      case "Layers": return <Layers className="w-5 h-5 text-orange-500" />;
      case "Activity": return <Activity className="w-5 h-5 text-orange-500" />;
      case "Zap": return <Zap className="w-5 h-5 text-orange-500" />;
      case "Flame": return <Flame className="w-5 h-5 text-orange-500" />;
      case "Settings": return <Settings className="w-5 h-5 text-orange-500" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5 text-orange-500" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-orange-500" />;
      case "Scissors": return <Scissors className="w-5 h-5 text-orange-500" />;
      default: return <Settings className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-900 border-t border-b border-orange-500/5 relative">
      <div className="absolute top-10 right-10 w-64 h-64 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-sky-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* SEO Header hierarchy */}
        <div className="max-w-3xl mb-16">
          <span className="text-orange-500 font-mono font-bold tracking-widest text-xs uppercase block mb-3">
            What We Do Best
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Small Engine Maintenance & Repairs
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 font-serif italic">
            Fixing it right the first time so you can get back to yard work and landscaping.
          </p>
        </div>

        {/* Search and Category Filter controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/5">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Services" },
              { id: "mower", label: "Lawnmowers" },
              { id: "handheld", label: "Handheld Tools" },
              { id: "power", label: "Power Equipment" },
              { id: "maintenance", label: "Tune-Ups & Prep" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xl transition-all h-10 flex items-center justify-center cursor-pointer border ${
                  filter === cat.id 
                    ? "bg-orange-600 border-orange-500 text-white shadow-md shadow-orange-600/10" 
                    : "bg-slate-950/80 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar - Client Side Filter */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search problems or tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-orange-500 focus:outline-none pl-11 pr-4 py-2.5 h-10 rounded-xl text-xs text-white placeholder-slate-500 transition-all font-mono"
            />
          </div>
        </div>

        {/* Services Master Display Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Quick List Selection */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[640px] overflow-y-auto pr-2 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
            {filteredServices.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <p className="text-sm font-mono">No matching services found.</p>
                <button
                  onClick={() => { setFilter("all"); setSearchQuery(""); }}
                  className="text-xs text-orange-500 mt-2 font-bold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setExpandedId(service.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all border flex items-center justify-between cursor-pointer group ${
                    expandedId === service.id 
                      ? "bg-orange-600/10 border-orange-500/40 text-white shadow-inner" 
                      : "bg-slate-950/60 border-white/5 hover:border-white/15 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${expandedId === service.id ? 'bg-orange-600/20' : 'bg-slate-900'} group-hover:scale-105 transition-transform`}>
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight leading-tight">
                        {service.name}
                      </h4>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5 uppercase tracking-wide">
                        Rate: {service.priceRange}
                      </p>
                    </div>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full bg-orange-500 transition-all ${expandedId === service.id ? 'opacity-100 scale-120' : 'opacity-0'}`} />
                </button>
              ))
            )}
          </div>

          {/* Right: Rich Interactive Spotlight Visual Display Card */}
          <div className="lg:col-span-7 glass rounded-2xl p-6 sm:p-8 min-h-[500px] flex flex-col justify-between border-slate-500/10 relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Spotlight Background overlay */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/5 rounded-full blur-[80px] pointer-events-none" />
            
            {expandedId && servicesData.find(s => s.id === expandedId) ? (() => {
              const active = servicesData.find(s => s.id === expandedId)!;
              return (
                <div id="service_expanded_spotlight" className="flex flex-col justify-between h-full gap-8">
                  {/* Title & Price Header */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-orange-950/50 border border-orange-900/40 rounded-xl text-orange-500">
                          {getIcon(active.iconName)}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest font-semibold">
                            {active.category === "mower" ? "Lawnmowers" : active.category === "handheld" ? "Handheld tools" : active.category === "power" ? "Power equipment" : "Preventative Care"}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                            {active.name}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Price chip */}
                      <div className="bg-slate-950 border border-white/10 rounded-xl p-3 text-left sm:text-right min-w-[140px]">
                        <span className="block text-[9px] text-slate-500 font-mono uppercase tracking-wider">
                          Est. Price Range
                        </span>
                        <span className="block text-sm font-extrabold text-orange-500 font-mono mt-0.5">
                          {active.priceRange}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mt-5">
                      {active.description}
                    </p>

                    {/* Left & Right columns for Benefits and Common Problems Fixes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      {/* Left: Customer Benefits */}
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5">
                        <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1.5 uppercase tracking-wider mb-4">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          Key Service Benefits
                        </span>
                        <ul className="flex flex-col gap-2.5">
                          {active.benefits.map((benefit, i) => (
                            <li key={i} className="text-xs text-slate-400 flex items-start gap-2 leading-tight">
                              <span className="text-emerald-500 stroke-[3] mt-0.5">&bull;</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Common Problems Resolved */}
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5">
                        <span className="text-xs font-bold text-orange-400 font-mono flex items-center gap-1.5 uppercase tracking-wider mb-4">
                          <AlertTriangle className="w-4 h-4 text-orange-400" />
                          Common Issues Remedied
                        </span>
                        <ul className="flex flex-col gap-2.5 font-mono">
                          {active.commonProblems.map((problem, i) => (
                            <li key={i} className="text-[11px] text-slate-400 flex items-start gap-2 leading-snug">
                              <span className="text-orange-500 stroke-[3] mt-0.5">&bull;</span>
                              <span>{problem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-white/5 mt-6">
                    <button
                      onClick={onBookClick}
                      className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      Book this diagnosis
                    </button>
                    <a
                      href="tel:8322442036"
                      className="w-full sm:w-auto bg-slate-950/80 border border-white/10 hover:border-orange-500/50 hover:bg-slate-900 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg text-center flex items-center justify-center gap-2 transition-all"
                    >
                      <Phone className="w-4.5 h-4.5 text-orange-500" />
                      Consult Specialist
                    </a>
                  </div>
                </div>
              );
            })() : (
              <div className="flex flex-col items-center justify-center text-center h-full text-slate-500 pt-12">
                <Wrench className="w-12 h-12 text-slate-600 mb-4 animate-bounce" />
                <p className="text-sm font-mono">Select a service on the left to view technical sheets, pricing estimations, and solved symptoms.</p>
              </div>
            )}
          </div>
        </div>

        {/* Diagnostic disclaimer trust block */}
        <div className="mt-16 bg-slate-950 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Diagnostic & Estimate Transparency
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              We charge a flat diagnostics fee for equipment workups ($35 for handheld equipment, $55 for walk-behind engines, and $85 for commercial riding/zero-turn engines). This fee is completely waived and applied 100% directly towards the total repair estimate if you authorize us to proceed with the service!
            </p>
          </div>
          <div>
            <button
              onClick={onBookClick}
              className="w-full md:w-auto bg-orange-600/10 hover:bg-orange-600/20 text-orange-500 border border-orange-500/30 hover:border-orange-500 text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl transition-all h-11"
            >
              Get diagnostic quote &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
