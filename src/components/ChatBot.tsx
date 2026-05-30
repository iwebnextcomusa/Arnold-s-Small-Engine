import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, AlertCircle, Phone, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize chatbot with a warm friendly message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: "Howdy! I'm Arnold's AI Assistant. 🛠️\n\nHow can I help you with your small engine today? You can ask me technical troubleshooting questions (like what to check if your lawn mower won't start) or inquire about our repair prices, operating areas, or booking an appointment!",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Sync scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || inputText).trim();
    if (!queryText) return;

    if (!textToSend) {
      setInputText("");
    }
    setErrorStatus("");

    // Create User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: queryText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Create request payload matching state expectations of Gemini
      // Map message lists to match server-side chat history requirements
      const prevHistoryForServer = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: queryText,
          history: prevHistoryForServer
        })
      });

      if (!res.ok) {
        throw new Error("Failed to contact the model server.");
      }

      const data = await res.json();
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "model",
        text: data.text || "I was unable to retrieve a response. Please try call us directly at 832-244-2036!",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorStatus("Failed to get connection. Let's trace your request later!");
      
      // Fallback response inside chat
      const failMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: "model",
        text: "I apologize, but my transmission to our repair servers sputtered. Please feel free to consult with owner Ryan directly at **832-244-2036**! He is happy to help diagnostic outline.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, failMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "My lawn mower won't start",
    "How often to do a tune-up?",
    "Do you service generators?",
    "Where is your repair shop located?"
  ];

  return (
    <>
      {/* Floating Toggle Bubble - Styled geometrically */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="chatbot_bubble_trigger"
        className="fixed bottom-6 right-6 z-50 bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-xl shadow-[0_4px_20px_rgba(234,88,12,0.45)] border-2 border-slate-900 group transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
        aria-label="Open AI Engine Assistant Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 uppercase">
              AI_ASSISTANT
            </span>
            <MessageSquare className="w-6 h-6 stroke-[2.5] animate-pulse" />
          </div>
        )}
      </button>

      {/* Interactive Floating Card Window Grid layout */}
      {isOpen && (
        <div
          id="chatbot_floating_panel"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[500px] sm:h-[550px] max-h-[calc(100vh-210px)] sm:max-h-[calc(100vh-230px)] bg-slate-950 border-4 border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300 font-sans"
        >
          {/* Header element - Geometric stark color */}
          <div className="bg-slate-900 px-5 py-4 flex items-center justify-between border-b-2 border-orange-500 relative">
            <div className="absolute top-0 left-0 w-12 h-[3px] bg-orange-500" />
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white ring-2 ring-orange-500/20">
                <Bot className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-white uppercase tracking-wider leading-none">
                  AI Engine Specialist
                </h4>
                <div className="flex items-center gap-1.5 mt-1 leading-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-slate-400 capitalize">Owner Ryan's Assistant</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-950 border-b border-white/5 space-y-4 text-left">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* Agent Icon */}
                {msg.role !== "user" && (
                  <div className="w-7 h-7 rounded-lg bg-orange-950 border border-orange-900/30 text-orange-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="flex flex-col gap-1 max-w-[80%]">
                  {/* Message Bubble content with clean line wrapping */}
                  <div
                    className={`rounded-lg p-3 text-xs leading-relaxed whitespace-pre-wrap font-sans ${
                      msg.role === "user"
                        ? "bg-orange-600 text-white font-medium"
                        : "bg-slate-900 text-slate-200 border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Timestamp font */}
                  <span className={`text-[8px] font-mono text-slate-500 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex items-center gap-2.5 text-slate-500 text-xs">
                <div className="w-7 h-7 rounded-lg bg-orange-950 border border-orange-900/30 text-orange-400 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                </div>
                <span className="font-mono text-[10px] uppercase animate-pulse">Diagnostics logic search...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Suggestor Panel */}
          {messages.length < 4 && (
            <div className="bg-slate-900/50 p-2 border-b border-white/5 flex flex-col gap-1 text-left">
              <span className="text-[8px] font-mono text-orange-500 uppercase tracking-wider px-2 block mb-1">
                Frequently Queried Technical Issues:
              </span>
              <div className="flex overflow-x-auto gap-1 px-1 pb-1 scrollbar-none scroll-smooth">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="bg-slate-950 hover:bg-slate-850 p-1.5 px-3 rounded border border-white/5 text-[10px] font-medium text-slate-400 hover:text-orange-400 transition-colors whitespace-nowrap cursor-pointer shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Form Element */}
          <div className="bg-slate-900 p-3 flex flex-col gap-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask technical question (e.g. chainsaw compression)..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={loading}
                className="flex-1 bg-slate-950 border border-white/10 hover:border-white/15 focus:border-orange-500 focus:outline-none p-2.5 text-xs text-slate-200 placeholder-slate-650 h-10 rounded font-sans"
              />
              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                className="bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 text-white font-bold p-2.5 rounded h-10 w-10 flex items-center justify-center transition-all cursor-pointer select-none"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>

            <div className="text-[9px] text-slate-500 flex items-center justify-between font-mono px-1">
              <span>Arnold's Mechanical Assistant • nb, tx</span>
              <a href="tel:8322442036" className="text-orange-500 hover:underline">
                Call Shop
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
