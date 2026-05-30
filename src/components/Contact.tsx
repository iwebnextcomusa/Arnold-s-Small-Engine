import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, CheckCircle, Search, Clock, ShieldCheck, Loader2, Calendar, AlertTriangle, Send } from "lucide-react";
import { ServiceRequest } from "../types";

export default function Contact() {
  // Booking Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "New Braunfels, TX",
    equipmentType: "Walk-Behind Lawn Mower",
    serviceType: "Full Engine Tune-Up",
    description: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState<ServiceRequest | null>(null);

  // Live Tracking Search State
  const [searchId, setSearchId] = useState("");
  const [trackingResult, setTrackingResult] = useState<ServiceRequest | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState("");

  // Recent Tickets Dashboard State (For user engagement)
  const [recentTickets, setRecentTickets] = useState<ServiceRequest[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(false);

  // Fetch recent tickets
  const fetchRecentTickets = async () => {
    try {
      setLoadingRecent(true);
      const res = await fetch("/api/requests");
      if (res.ok) {
        const data = await res.json();
        setRecentTickets(data);
      }
    } catch (err) {
      console.error("Error pulling tickets:", err);
    } finally {
      setLoadingRecent(false);
    }
  };

  useEffect(() => {
    fetchRecentTickets();
  }, []);

  // Handle Booking Submit
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.equipmentType) {
      setSubmitError("Please fill out your Name, Phone Number, and Equipment Type.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(null);

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(data.data);
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "New Braunfels, TX",
          equipmentType: "Walk-Behind Lawn Mower",
          serviceType: "Full Engine Tune-Up",
          description: ""
        });
        // Refresh tracker history
        fetchRecentTickets();
      } else {
        setSubmitError(data.error || "An error occurred during submission.");
      }
    } catch (err) {
      setSubmitError("Network error. Unable to connect to the backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Tracking Search
  const handleTrackingLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId) {
      setTrackingError("Please enter a valid Service Tracking ID.");
      return;
    }

    setTrackingLoading(true);
    setTrackingError("");
    setTrackingResult(null);

    try {
      const res = await fetch(`/api/requests/${searchId.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setTrackingResult(data);
      } else {
        const errorData = await res.json();
        setTrackingError(errorData.error || "Tracking ID not found. Ensure it matches 'ASE-XXXX'.");
      }
    } catch (err) {
      setTrackingError("Failed to fetch status. Check your internet connection.");
    } finally {
      setTrackingLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Received": return "bg-blue-500/10 border-blue-500 text-blue-400";
      case "Under Diagnosis": return "bg-purple-500/10 border-purple-500 text-purple-400";
      case "Awaiting Parts": return "bg-red-500/10 border-red-500 text-red-400";
      case "Repaired": return "bg-amber-500/10 border-amber-500 text-amber-500";
      case "Ready for Pick-up": return "bg-emerald-500/10 border-emerald-500 text-emerald-400";
      default: return "bg-slate-850 border-white/10 text-slate-300";
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 border-t-8 border-slate-950 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Heading with Stark Geometric Underlining */}
        <div className="mb-16 max-w-2xl relative">
          <span className="text-orange-500 font-mono font-extrabold tracking-widest text-xs uppercase block mb-3">
            Inquire & Track Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Start Your Request & Track Progress
          </h2>
          <div className="h-2 w-32 bg-orange-500 mt-4 rounded-full" />
          <p className="mt-4 text-sm text-slate-400 font-serif italic">
            Schedule a workshop appointment or search where your machine currently resides inside our diagnostic pipeline.
          </p>
        </div>

        {/* Master Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Custom Geometric Contact & Live Queue Status (Left Column) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Business Cards Matrix */}
            <div className="bg-slate-950 border-4 border-slate-800 p-6 rounded-xl flex flex-col gap-5 shadow-xl relative">
              <div className="absolute top-0 right-0 w-2 h-16 bg-orange-500" />
              
              <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                <span className="h-4 w-1 bg-orange-500 block" />
                Contact Headquarters
              </h3>

              <div className="flex flex-col gap-4 font-mono text-xs">
                <a 
                  href="tel:8322442036" 
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900 border border-white/5 hover:border-orange-500/30 transition-all text-slate-300 hover:text-white group"
                >
                  <div className="p-2 bg-orange-950/40 rounded border border-orange-900/30 text-orange-500 group-hover:scale-105 transition-transform">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase">Interactive Phone</span>
                    <span className="block font-bold text-sm text-slate-200">832-244-2036</span>
                  </div>
                </a>

                <a 
                  href="mailto:ryanarnold1216@gmail.com" 
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900 border border-white/5 hover:border-orange-500/30 transition-all text-slate-300 hover:text-white group"
                >
                  <div className="p-2 bg-orange-950/40 rounded border border-orange-900/30 text-orange-500 group-hover:scale-105 transition-transform">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="overflow-hidden truncate">
                    <span className="block text-[9px] text-slate-500 uppercase">Direct Owner Email</span>
                    <span className="block font-bold truncate text-slate-200">ryanarnold1216@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900 border border-white/5 text-slate-300">
                  <div className="p-2 bg-orange-950/40 rounded border border-orange-900/30 text-orange-500">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase">Service County Headquarters</span>
                    <span className="block font-bold text-slate-200">New Braunfels, TX 78130</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Queue tracking box - Star geometric highlight */}
            <div className="bg-slate-950 border-4 border-slate-800 p-6 rounded-xl relative shadow-xl">
              <div className="absolute top-0 left-0 w-16 h-1.5 bg-orange-500" />
              
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-orange-500" />
                Live Engine Tracker
              </h3>
              
              <p className="text-xs text-slate-400 mb-5 leading-normal">
                Already dropped off a mower, saw, or backup generator with Ryan? Search status live below.
              </p>

              <form onSubmit={handleTrackingLookup} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. ASE-1049"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="bg-slate-900 border border-white/10 hover:border-white/20 focus:border-orange-500 focus:outline-none p-2.5 text-xs font-mono rounded text-white flex-1 placeholder-slate-500 h-10 uppercase"
                />
                <button
                  type="submit"
                  disabled={trackingLoading}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase px-4 rounded h-10 transition-colors cursor-pointer flex items-center justify-center gap-1 shrink-0"
                >
                  {trackingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Track"}
                </button>
              </form>

              {/* Display Tracking Error */}
              {trackingError && (
                <div className="mt-4 p-3 bg-red-950/30 border border-red-900/40 text-red-400 rounded text-xs leading-relaxed flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{trackingError}</span>
                </div>
              )}

              {/* Display Tracking Result */}
              {trackingResult && (
                <div className="mt-5 p-4 bg-slate-900 border border-white/10 rounded-lg animate-in fade-in zoom-in-95">
                  <div className="flex justify-between items-center pb-2.5 border-b border-white/5 mb-3">
                    <span className="font-mono text-xs font-bold text-slate-300">
                      {trackingResult.id}
                    </span>
                    <span className={`text-[9px] font-mono font-bold uppercase py-0.5 px-2.5 rounded border ${getStatusColor(trackingResult.status)}`}>
                      {trackingResult.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500">Customer:</span>
                      <p className="font-bold text-slate-200">{trackingResult.name}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Machine:</span>
                      <p className="font-semibold text-slate-300">{trackingResult.equipmentType}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Diagnostics logged:</span>
                      <p className="text-slate-400 italic">"{trackingResult.description}"</p>
                    </div>
                    <div className="pt-2 text-[10px] text-slate-500 border-t border-white/5 font-mono">
                      Received on: {new Date(trackingResult.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Booking Form (Geometric Balance style) (Middle Columns) */}
          <div className="lg:col-span-5 bg-slate-950 border-4 border-slate-800 p-6 sm:p-8 rounded-xl shadow-xl relative">
            <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500" />
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500" />

            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 block" />
              Service Appointment Form
            </h3>
            
            <p className="text-xs text-slate-400 mb-6 font-mono uppercase tracking-wider">
              Diagnostic Queue Intake Block
            </p>

            {/* Submit Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-emerald-950/40 border-2 border-emerald-500 text-emerald-400 rounded-lg text-xs leading-relaxed animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="font-extrabold text-sm uppercase">Ticket Created successfully!</span>
                </div>
                <p className="text-slate-200 mb-3 font-medium">
                  Hi {submitSuccess.name}, your request has been logged live into the shop queue.
                </p>
                <div className="bg-slate-900 p-3 rounded border border-white/10 font-mono text-slate-300">
                  <span className="block text-slate-500 text-[10px]">YOUR SEARCH TRACKING ID:</span>
                  <span className="block text-lg font-black text-orange-500 mt-0.5">{submitSuccess.id}</span>
                  <span className="block text-slate-400 text-[10px] mt-1.5">
                    Save this ID to search live diagnostic status in our system anytime!
                  </span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-3 bg-red-950/30 border border-red-900/40 text-red-400 rounded text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 mb-1 uppercase tracking-tight">Full Name <span className="text-orange-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-white/15 focus:border-orange-500 focus:outline-none p-2.5 rounded text-white text-xs font-medium placeholder-slate-600 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1 uppercase tracking-tight">Phone Number <span className="text-orange-500">*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 830-555-0199"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-white/15 focus:border-orange-500 focus:outline-none p-2.5 rounded text-white text-xs font-medium placeholder-slate-600 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 mb-1 uppercase tracking-tight">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. jdoe@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-white/15 focus:border-orange-500 focus:outline-none p-2.5 rounded text-white text-xs font-medium placeholder-slate-600 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1 uppercase tracking-tight">Your Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Gruene / Canyon Lake"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-900 border border-white/15 focus:border-orange-500 focus:outline-none p-2.5 rounded text-white text-xs font-medium placeholder-slate-600 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 mb-1 uppercase tracking-tight">Equipment Type <span className="text-orange-500">*</span></label>
                  <select
                    value={formData.equipmentType}
                    onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                    className="w-full bg-slate-900 border border-white/15 focus:border-orange-500 focus:outline-none p-2.5 rounded text-white text-xs font-medium"
                  >
                    <option>Walk-Behind Lawn Mower</option>
                    <option>Ridding Engine / Tractor</option>
                    <option>Zero-Turn Commercial Mower</option>
                    <option>Portable Generator</option>
                    <option>Chainsaw / Bar Saw</option>
                    <option>String Trimmer / Weed Eater</option>
                    <option>Leaf Blower (Handheld/Backpack)</option>
                    <option>Pressure Washer / Pumps</option>
                    <option>Other / Fuel Engines</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1 uppercase tracking-tight">Selected Service</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-slate-900 border border-white/15 focus:border-orange-500 focus:outline-none p-2.5 rounded text-white text-xs font-medium"
                  >
                    <option>Full Engine Tune-Up</option>
                    <option>Carburetor Leak & Ultrasonic Cleaning</option>
                    <option>Won't Start / Fault Diagnostics</option>
                    <option>Blade Sharpening & Spindle Repairs</option>
                    <option>Seasonal Service Winterization</option>
                    <option>Emergency Repairs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1 uppercase tracking-tight">Problem Symptoms / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Tell Ryan what symptoms your engine has (e.g. starter cord hard to pull, runs only on choke, gas leaking, sat idle all winter, backfiring...)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-white/15 focus:border-orange-500 focus:outline-none p-2.5 rounded text-white text-xs font-medium placeholder-slate-600 resize-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 text-white font-black py-4.5 rounded uppercase tracking-wider text-xs transition-transform duration-300 transform active:scale-98 shadow-md hover:shadow-orange-600/30 font-sans cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Log Intake Appointment &rarr;
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Column 3: Recent Activity Dashboard Queue Visual & Live Map (Right Column) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Visual Queue Monitor Feed */}
            <div className="bg-slate-950 border-4 border-slate-800 p-5 rounded-xl shadow-xl">
              <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest font-semibold block mb-2">
                Live Repair Monitor Feed
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-white/5">
                Current Shop Tickets
              </h4>

              {loadingRecent ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                </div>
              ) : (
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {recentTickets.length === 0 ? (
                    <p className="text-slate-500 text-xs text-center font-mono">No active tickets.</p>
                  ) : (
                    recentTickets.map((ticket) => (
                      <div 
                        key={ticket.id}
                        onClick={() => setSearchId(ticket.id)}
                        className="bg-slate-900/60 hover:bg-slate-900 border border-white/5 hover:border-white/10 p-2.5 rounded text-left transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="font-bold text-slate-300">{ticket.id}</span>
                          <span className={`${ticket.status === 'Repaired' ? 'text-emerald-500' : 'text-amber-500'}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-white truncate mt-1">
                          {ticket.equipmentType}
                        </p>
                        <p className="text-[9px] text-slate-500 truncate font-mono uppercase">
                          {ticket.location}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Simulated Live Location Map Component */}
            <div className="bg-slate-950 border-4 border-slate-800 p-5 rounded-xl shadow-xl flex-1 text-left relative overflow-hidden">
              <span className="text-[9px] font-mono text-orange-500 uppercase font-bold block mb-2">
                Regional Service Map
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                New Braunfels Operating Zone
              </h4>

              {/* Simulated vector grid map */}
              <div className="bg-slate-900 border border-white/10 rounded-lg aspect-square relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                
                {/* Simulated mapping coordinates circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-dashed border-orange-500/20 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-orange-500/30" />
                
                {/* Pin Point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="p-1 px-2.5 bg-orange-600 border border-orange-500 rounded text-[9px] font-bold font-mono text-white mb-1 shadow-md uppercase">
                    ARNOLD'S SHOP
                  </div>
                  <div className="h-2.5 w-2.5 bg-orange-500 rounded-full ring-4 ring-orange-500/35 animate-bounce" />
                </div>

                {/* Satellite Tags */}
                <div className="absolute top-8 left-6 text-[8px] font-mono font-medium text-slate-500 bg-slate-950/60 px-1.5 py-0.5 rounded uppercase">
                  Canyon Lake
                </div>
                <div className="absolute bottom-10 left-8 text-[8px] font-mono font-medium text-slate-500 bg-slate-950/60 px-1.5 py-0.5 rounded uppercase">
                  Marion
                </div>
                <div className="absolute top-12 right-6 text-[8px] font-mono font-medium text-slate-500 bg-slate-950/60 px-1.5 py-0.5 rounded uppercase">
                  Gruene
                </div>
                <div className="absolute bottom-12 right-10 text-[8px] font-mono font-medium text-orange-400 bg-orange-950/40 px-1.5 py-0.5 border border-orange-900/30 rounded uppercase">
                  Seguin Route
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-orange-500 shrink-0" />
                <p className="text-[10px] text-slate-400 font-mono italic">
                  Drop-offs accepted 6 days / week. Contact Ryan.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
