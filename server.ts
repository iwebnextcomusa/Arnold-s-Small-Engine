import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dns from "dns";

// Set default DNS resolution to IPv4 first to avoid slow IPv6 resolutions on some platforms
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for demonstrations & state tracking
interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  equipmentType: string;
  serviceType: string;
  description: string;
  status: "Received" | "Under Diagnosis" | "Awaiting Parts" | "Repaired" | "Ready for Pick-up";
  createdAt: string;
}

const serviceRequestsStore: ServiceRequest[] = [
  {
    id: "ASE-1042",
    name: "John Davis",
    email: "john.davis@gmail.com",
    phone: "830-555-1294",
    location: "Gruene, TX",
    equipmentType: "Zero-Turn Riding Mower",
    serviceType: "Seasonal Tune-Up",
    description: "Blade sharpening, spark plug change, oil change, and full safety check.",
    status: "Repaired",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ASE-1049",
    name: "Melissa Carter",
    email: "mel.carter@outlook.com",
    phone: "210-555-4019",
    location: "New Braunfels, TX",
    equipmentType: "Honda Walk-Behind Mower",
    serviceType: "Carburetor Leak & Clean",
    description: "Lawn mower won't start after sitting all winter, suspected stale fuel clogging carburetor.",
    status: "Awaiting Parts",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  }
];

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "AIzaSyCLKX2tohQTHF9Gk06XqqlT-tXUjVSOYBU",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// AI Chatbot system instruction
const systemInstruction = `You are the friendly, professional, and hardworking AI Assistant for "Arnold's Small Engine Repair" located in New Braunfels, Texas.
Your job is to assist visitors, answer their technical questions, and help them request maintenance or repair service.

Strict Business Information to follow:
- Name: Arnold's Small Engine Repair
- Phone: 832-244-2036
- Email: ryanarnold1216@gmail.com
- Location: New Braunfels, TX
- Operating Areas: New Braunfels, Gruene, Seguin, Canyon Lake, San Marcos, Cypress Mill, and surrounding counties.
- Operating Owner: Locally owned by Ryan Arnold.
- Services:
  * Lawn Mower Repair (walk-behind, push models)
  * Riding Mower Repair
  * Zero-Turn Mower Maintenance (oil, filters, sharpening, belt replacements)
  * Generator Repair & Tune-Ups (crucial for local storms/outages)
  * Chainsaw Repair (gas & electric models)
  * String Trimmer, Edger, and Weed Eater Repair
  * Leaf Blower Repair (backpack and handheld blower services)
  * Pressure Washer Repair (pump servicing, basic engine troubleshooting)
  * Carburetor Repair & Ultrasonic Cleaning
  * Blade Sharpening & Balance
  * Tune-ups & Full Preventative Maintenance (spark plugs, filters, fluids change, overall inspection)
  * Seasonal Prep (Winterization in fall, spring refresh in late winter)

Frequently Asked Questions / Knowledge Base:
- Equipment Serviced: Work on all standard 2-stroke and 4-stroke small engines (Honda, Briggs & Stratton, Kohler, Kawasaki, Craftsman, Husqvarna, STIHL, Echo, Toro, Cub Cadet, etc.).
- Typical turnaround: Normally 2 to 4 business days, depending heavily on ordering specialized parts. We strive for fast turnaround because we know you need your yard equipment!
- Estimates & Pricing: We offer honest, fair pricing. Typically offer a standard diagnostic fee which applies directly to the repair cost once approved.
- Mobile Pick-up/Delivery: We can offer pick-up and delivery services in the New Braunfels area for a small additional trip fee based on distance.
- Preventative tips: Keep fresh fuel in your equipment (stabilize it or use ethanol-free fuel for storage) and check the oil levels before every startup!

Tone and Style Guidelines:
- Keep answers polite, trustworthy, clear, and hardworking.
- Speak in the first person of the business ("We are happy to...", "Our shop in New Braunfels...").
- Keep responses compact yet informative.
- Always include the phone number (832-244-2036) or email (ryanarnold1216@gmail.com) if the user needs urgent attention.
- Ensure formatting is clear with bold text and list bullets where necessary.`;

// API Endpoint - Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Arnold's Small Engine Repair server is running." });
});

// API Endpoint - All Service Requests Tracker
app.get("/api/requests", (req: Request, res: Response) => {
  res.json(serviceRequestsStore);
});

// API Endpoint - Create Service Request
app.post("/api/requests", (req: Request, res: Response) => {
  try {
    const { name, email, phone, location, equipmentType, serviceType, description } = req.body;
    
    if (!name || !phone || !equipmentType || !serviceType) {
      res.status(400).json({ error: "Missing required fields (name, phone, equipmentType, serviceType)" });
      return;
    }

    const randomId = `ASE-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest: ServiceRequest = {
      id: randomId,
      name,
      email: email || "N/A",
      phone,
      location: location || "New Braunfels, TX",
      equipmentType,
      serviceType,
      description: description || "No additional details provided.",
      status: "Received",
      createdAt: new Date().toISOString()
    };

    // Add to start of store
    serviceRequestsStore.unshift(newRequest);
    if (serviceRequestsStore.length > 50) {
      serviceRequestsStore.pop(); // Cap history
    }

    res.status(201).json({
      success: true,
      data: newRequest,
      message: `Service request submitted successfully! Your tracking ID is ${randomId}.`
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit service request." });
  }
});

// API Endpoint - Get request status details
app.get("/api/requests/:trackingId", (req: Request, res: Response) => {
  const { trackingId } = req.params;
  const match = serviceRequestsStore.find(r => r.id.toLowerCase() === trackingId.trim().toLowerCase());
  
  if (!match) {
    res.status(404).json({ error: "Service request tracking ID not found." });
    return;
  }
  
  res.json(match);
});

// API Endpoint - AI chatbot
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      res.status(400).json({ error: "Prompt message is required." });
      return;
    }

    // Prepare contents
    // Fallback to basic generateContent if no history, or map history
    if (history && Array.isArray(history) && history.length > 0) {
      // Create a chat session as recommended in the gemini-api skill
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
        // Populate initial chats history
        // Convert history arrays safely
        history: history.map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.parts[0]?.text || "" }]
        }))
      });

      const result = await chat.sendMessage({ message: message });
      res.json({ text: result.text });
    } else {
      // Single shot generateContent
      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });
      res.json({ text: result.text });
    }
  } catch (err: any) {
    console.error("Gemini API Error details:", err);
    res.status(500).json({ 
      error: "Gemini AI call failed.", 
      message: err.message || "An unresolved server error occurred while invoking the model."
    });
  }
});

async function run() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA Fallback
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Arnold's Small Engine Repair Server running on port ${PORT}`);
  });
}

run();
