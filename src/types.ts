export interface ServiceItem {
  id: string;
  name: string;
  category: "mower" | "handheld" | "power" | "maintenance";
  description: string;
  benefits: string[];
  commonProblems: string[];
  priceRange: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "services" | "pricing" | "timing" | "preventative";
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface ServiceRequest {
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
