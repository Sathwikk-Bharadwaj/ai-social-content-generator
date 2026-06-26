import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Layers, 
  Zap, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Twitter, 
  Linkedin, 
  Instagram,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { id: "all", label: "All Formats" },
    { id: "hooks", label: "Engaging Hooks" },
    { id: "threads", label: "Twitter Threads" },
    { id: "listicles", label: "Listicles & Outlines" },
    { id: "launches", label: "Product Launches" }
  ];

  const templatesList = [
    { id: 1, category: "hooks", title: "The Contradictory Statement", desc: "Start with an unexpected opinion to challenge readers' assumptions.", platform: "twitter", structure: "Most developers think [Standard Approach] is correct. In reality, it causes [Pain Point]. Here is why: [Reason]." },
    { id: 2, category: "threads", title: "Step-by-Step Technical Guide", desc: "Detailed framework outlining exact implementation code details.", platform: "twitter", structure: "How to build [Feature] using [Technology] in 5 steps:\n\n1/ [Step 1]\n2/ [Step 2]\n3/ [Step 3]\n\nThread 👇" },
    { id: 3, category: "listicles", title: "LinkedIn Value Framework", desc: "Highly structured list outlining core lessons for marketing/agencies.", platform: "linkedin", structure: "After auditing 100+ [Domain], I noticed a clear pattern.\n\nHere are 3 frameworks standard teams ignore:\n1. [Framework 1] - [Description]\n2. [Framework 2]\n3. [Framework 3]\n\nWhich one are you using?" },
    { id: 4, category: "launches", title: "Product Feature Release", desc: "High-hype launch structure emphasizing utility, UI screenshots, and CTAs.", platform: "linkedin", structure: "🚀 Today, we are launching [Feature Name].\n\n[Brief description of why it was built].\n\nWhat it solves:\n- [Value 1]\n- [Value 2]\n\nTry it now: [URL]" },
    { id: 5, category: "hooks", title: "The Pain Point Opener", desc: "Address an immediate issue your target audience faces.", platform: "instagram", structure: "Stop wasting hours manually formatting your [Assets]. Doing this is why you are falling behind in Q2. Here is the 10x faster approach:" }
  ];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = templatesList.filter(t => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 relative z-10">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">AI Templates Library</h1>
          <p className="text-slate-400 text-xs mt-1">Pre-engineered hook structures, thread outlines, and product launch frameworks</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Search template models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>

        {/* Categories select tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 border border-white/5 p-1 rounded-xl text-xs overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((temp) => (
          <motion.div
            key={temp.id}
            whileHover={{ y: -3 }}
            className="glass-panel p-5 rounded-3xl border border-white/5 flex flex-col justify-between group h-64"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  {temp.platform === "twitter" && <Twitter size={11} className="text-sky-400" />}
                  {temp.platform === "linkedin" && <Linkedin size={11} className="text-blue-500" />}
                  {temp.platform === "instagram" && <Instagram size={11} className="text-pink-400" />}
                  {temp.category}
                </span>

                <button
                  onClick={() => handleCopy(temp.id, temp.structure)}
                  className="p-1.5 rounded-md bg-white/5 border border-white/5 text-slate-500 hover:text-white transition-colors cursor-pointer"
                  title="Copy Structure"
                >
                  {copiedId === temp.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>

              <h4 className="text-sm font-bold text-slate-200 mt-4 group-hover:text-white transition-colors">{temp.title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{temp.desc}</p>
            </div>

            {/* Template Structure Mock */}
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 text-[10px] font-mono text-slate-500 truncate max-w-full my-3">
              {temp.structure}
            </div>

            {/* Launch CTA */}
            <Link
              to={`/generate?topic=${encodeURIComponent(`[Replace with topic] - Using template: ${temp.title}`)}&platform=${temp.platform}`}
              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5 justify-end transition-colors"
            >
              Launch in Generator <ArrowUpRight size={12} />
            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
