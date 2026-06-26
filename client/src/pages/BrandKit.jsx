import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Palette, 
  Bot, 
  Settings, 
  Sliders, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Type, 
  FileText
} from "lucide-react";

export default function BrandKit() {
  const [activeBrand, setActiveBrand] = useState("Aura Creative Agency");
  
  // Custom states for Brand Voice Sliders
  const [toneFormal, setToneFormal] = useState(40);
  const [toneEnergetic, setToneEnergetic] = useState(75);
  const [toneTech, setToneTech] = useState(60);

  // Palettes
  const palettes = [
    { name: "Default Glow", colors: ["#6366f1", "#a855f7", "#06b6d4", "#0f172a"] },
    { name: "Neon Cyber", colors: ["#39ff14", "#ff007f", "#00ffff", "#0a0a0a"] },
    { name: "Clean Tech", colors: ["#0f172a", "#334155", "#64748b", "#f8fafc"] }
  ];

  // Brand Guidelines
  const [guidelines, setGuidelines] = useState([
    "Always focus on interactive layout structures.",
    "Highlight utility metrics and user experiences over ad-hoc statements.",
    "Do not use generic cliches (e.g. 'game changer', 'paradigm shift').",
    "Integrate code snippets or visual formatting tools when referencing specifications."
  ]);

  const [newGuideline, setNewGuideline] = useState("");

  const handleAddGuideline = (e) => {
    e.preventDefault();
    if (!newGuideline.trim()) return;
    setGuidelines([...guidelines, newGuideline.trim()]);
    setNewGuideline("");
  };

  const handleDeleteGuideline = (idx) => {
    setGuidelines(guidelines.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-8 relative z-10">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Brand Kit</h1>
          <p className="text-slate-400 text-xs mt-1">Configure brand identity copy guidelines, core color schemes, and AI parameters</p>
        </div>

        {/* Brand Profile selector */}
        <select
          value={activeBrand}
          onChange={(e) => setActiveBrand(e.target.value)}
          className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2 text-xs font-semibold text-slate-300 focus:outline-none cursor-pointer"
        >
          <option value="Aura Creative Agency">Aura Creative Agency</option>
          <option value="Velo Devs Studio">Velo Devs Studio</option>
          <option value="Zen Marketing Lab">Zen Marketing Lab</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Brand voice sliders & identity (6 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display flex items-center gap-2">
              <Sliders size={15} className="text-indigo-400" />
              Brand Copy Parameters
            </h3>

            {/* Formal vs Casual */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase">
                <span>Formal & Structured</span>
                <span>Casual & Playful</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={toneFormal}
                onChange={(e) => setToneFormal(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-950/60 rounded-lg appearance-none border border-white/5"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Enterprise Tone</span>
                <span>Active Persona ({toneFormal}%)</span>
                <span>Casual Tone</span>
              </div>
            </div>

            {/* Energetic vs Grounded */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase">
                <span>Grounded & Objective</span>
                <span>Energetic & Hype</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={toneEnergetic}
                onChange={(e) => setToneEnergetic(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-950/60 rounded-lg appearance-none border border-white/5"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Skeptical / Analytical</span>
                <span>Active Persona ({toneEnergetic}%)</span>
                <span>Hype / Storytelling</span>
              </div>
            </div>

            {/* Technical vs Simplified */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase">
                <span>Simplified / Layman</span>
                <span>Technical / Expert</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={toneTech}
                onChange={(e) => setToneTech(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-950/60 rounded-lg appearance-none border border-white/5"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Mainstream Audiences</span>
                <span>Active Persona ({toneTech}%)</span>
                <span>Developers & Engineers</span>
              </div>
            </div>

            {/* Core Fonts */}
            <div className="border-t border-white/5 pt-6 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Display Typography</span>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/60 border border-white/5 p-3 text-xs font-semibold text-slate-200 cursor-pointer hover:bg-slate-900 transition-colors">
                  <Type size={14} className="text-indigo-400" />
                  <span>Space Grotesk</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Body Typography</span>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/60 border border-white/5 p-3 text-xs font-semibold text-slate-200 cursor-pointer hover:bg-slate-900 transition-colors">
                  <Type size={14} className="text-indigo-400" />
                  <span>Outfit Sans-Serif</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Palettes & Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Color Palettes */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display flex items-center gap-2">
              <Palette size={15} className="text-indigo-400" />
              Brand Color Schemes
            </h3>
            
            <div className="space-y-3">
              {palettes.map((palette) => (
                <div key={palette.name} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{palette.name}</span>
                  <div className="flex gap-1.5">
                    {palette.colors.map((c, i) => (
                      <span key={i} className="h-5 w-5 rounded-md border border-white/15 shadow-inner" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Constraints / Guidelines */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display flex items-center gap-2">
              <Bot size={15} className="text-indigo-400" />
              AI Copywriting Constraints
            </h3>

            {/* List guidelines */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {guidelines.map((guide, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-300">
                  <p className="flex-1 leading-relaxed">{guide}</p>
                  <button 
                    onClick={() => handleDeleteGuideline(idx)}
                    className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer self-start"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add guideline Form */}
            <form onSubmit={handleAddGuideline} className="flex gap-2 border-t border-white/5 pt-4">
              <input
                type="text"
                placeholder="Avoid buzzwords (e.g. paradigm)..."
                value={newGuideline}
                onChange={(e) => setNewGuideline(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
              />
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 transition p-2 rounded-lg text-white cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
