import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Cpu, 
  Key, 
  Bell, 
  CreditCard, 
  User, 
  CheckCircle,
  Bot
} from "lucide-react";

export default function SettingsPage() {
  const [aiEngine, setAiEngine] = useState("gemini");
  const [apiKey, setApiKey] = useState("••••••••••••••••••••••••••••");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);

  return (
    <div className="space-y-8 relative z-10 font-sans">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">System Settings</h1>
          <p className="text-slate-400 text-xs mt-1">Configure user accounts, API integrations, and AI generation engines</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: profile & AI Model selection (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* AI Engine Selection */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display flex items-center gap-2">
              <Cpu size={16} className="text-indigo-400" />
              AI Intelligence Engine
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "gemini", name: "Gemini 3.5 Flash", desc: "Speed & Copy logic", badge: "Primary" },
                { id: "claude", name: "Claude 3.5 Sonnet", desc: "Detailed Threads", badge: "Advanced" },
                { id: "gpt4", name: "GPT-4o Engine", desc: "Short Hooks & Listicles", badge: "Fallback" }
              ].map((engine) => (
                <button
                  key={engine.id}
                  type="button"
                  onClick={() => setAiEngine(engine.id)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between h-32 transition-all cursor-pointer ${
                    aiEngine === engine.id
                      ? "bg-indigo-600/15 border-indigo-500/50 text-indigo-200"
                      : "bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10 text-slate-400"
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <Bot size={18} className={aiEngine === engine.id ? "text-indigo-400" : "text-slate-500"} />
                    <span className="text-[8px] font-bold font-mono uppercase bg-indigo-500/10 px-1.5 py-0.5 rounded text-indigo-400">{engine.badge}</span>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-slate-200">{engine.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{engine.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* API Credentials */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display flex items-center gap-2">
              <Key size={16} className="text-indigo-400" />
              Custom API Keys (Optional)
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gemini API Token</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2.5 rounded-xl text-xs font-semibold text-white cursor-pointer border border-white/5">
                    Save Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: notifications & billing info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Notifications */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display flex items-center gap-2">
              <Bell size={16} className="text-indigo-400" />
              Notification Rules
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Email Queue Summaries</span>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 rounded bg-white/5 border-white/5 focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-xs border-t border-white/5 pt-3">
                <span className="font-semibold text-slate-300">Push Notifications on Post Publish</span>
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 rounded bg-white/5 border-white/5 focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Subscription Tier */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display flex items-center gap-2">
              <CreditCard size={16} className="text-indigo-400" />
              Subscription Console
            </h3>

            <div className="rounded-2xl bg-indigo-950/15 border border-indigo-500/20 p-4 text-xs relative overflow-hidden flex flex-col justify-between h-28">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white text-sm">Gravity Pro Tier</h4>
                  <span className="text-[10px] text-indigo-400 font-mono">Billed monthly</span>
                </div>
                <span className="text-md font-extrabold text-white font-mono">$49/mo</span>
              </div>

              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Next renewal: Jul 7, 2026</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
