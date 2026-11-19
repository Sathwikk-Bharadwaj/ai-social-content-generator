import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Twitter, 
  Linkedin, 
  Instagram,
  Sparkles,
  Zap,
  Bookmark
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { id: "all", label: "All Formats" },
    { id: "hooks", label: "Viral Hooks" },
    { id: "threads", label: "Threads & Multi-Posts" },
    { id: "listicles", label: "Value Frameworks" },
    { id: "launches", label: "Product Launches" },
    { id: "stories", label: "Behind-the-Scenes" }
  ];

  const templatesList = [
    { 
      id: 1, 
      category: "hooks", 
      title: "The Contradictory Statement", 
      desc: "Start with an unexpected opinion to challenge readers' assumptions and spark debate.", 
      platform: "twitter", 
      structure: "Most creators think [Common Belief] is the key to growth.\n\nIn reality, it's the exact reason 90% burn out.\n\nHere is what the top 1% actually do instead: 👇" 
    },
    { 
      id: 2, 
      category: "threads", 
      title: "Step-by-Step Technical Guide", 
      desc: "Detailed actionable framework breaking down complex builds into digestible steps.", 
      platform: "twitter", 
      structure: "How to build [Goal/Feature] in 5 simple steps (without overcomplicating it):\n\n1/ [Step 1]\n2/ [Step 2]\n3/ [Step 3]\n4/ [Step 4]\n5/ [Step 5]\n\nA detailed breakdown: 🧵👇" 
    },
    { 
      id: 3, 
      category: "listicles", 
      title: "LinkedIn Value Framework", 
      desc: "High-credibility audit list outlining core lessons for founders and professionals.", 
      platform: "linkedin", 
      structure: "After analyzing 50+ [Industry/Domain] projects this year, I noticed a clear pattern.\n\nHere are 3 frameworks standard teams ignore:\n\n1. [Framework 1] - [Brief explanation]\n2. [Framework 2] - [Key takeaway]\n3. [Framework 3] - [Actionable advice]\n\nWhich one does your team prioritize? Let's discuss in the comments." 
    },
    { 
      id: 4, 
      category: "launches", 
      title: "Product Feature Release", 
      desc: "High-hype launch structure emphasizing user problem, feature utility, and strong CTA.", 
      platform: "linkedin", 
      structure: "🚀 Today, we are officially launching [Product/Feature Name]!\n\nBuilding content shouldn't take hours of manual guesswork. That's why we built [Product Name].\n\nWhat it solves:\n• [Pain Point 1] → [Solution 1]\n• [Pain Point 2] → [Solution 2]\n\nTry it live here: [Link] ✨" 
    },
    { 
      id: 5, 
      category: "hooks", 
      title: "The Pain Point Opener", 
      desc: "Directly call out an immediate frustration your target audience faces every day.", 
      platform: "instagram", 
      structure: "Stop wasting hours manually formatting your [Work]. 🛑\n\nDoing this is why you feel overwhelmed and inconsistent.\n\nHere is the 10x faster workflow you can start using today: 👇" 
    },
    { 
      id: 6, 
      category: "stories", 
      title: "Behind-the-Scenes Build Story", 
      desc: "Authentic founder/builder story documenting lessons learned while shipping.", 
      platform: "twitter", 
      structure: "Yesterday, I set out to build [Feature/Project] from scratch.\n\nNo overthinking. Just pure focus.\n\nHere is what happened, the mistakes I made, and the unexpected lesson: 👇" 
    },
    { 
      id: 7, 
      category: "listicles", 
      title: "The Curated Tech Stack", 
      desc: "Curated resource list that delivers immediate utility and high bookmark rates.", 
      platform: "twitter", 
      structure: "The 5 tools saving me 20+ hours every week:\n\n1. [Tool 1] → [One-line reason]\n2. [Tool 2] → [One-line reason]\n3. [Tool 3] → [One-line reason]\n4. [Tool 4] → [One-line reason]\n5. [Tool 5] → [One-line reason]\n\nBookmark this for later. 🔖" 
    },
    { 
      id: 8, 
      category: "hooks", 
      title: "The Before vs. After Contrast", 
      desc: "Show visual contrast between the old painful way and the new modern approach.", 
      platform: "instagram", 
      structure: "The Old Way vs. The Modern Way: 💎\n\n❌ Old: 4 hours across 5 apps, inconsistent formatting, writer's block.\n✅ Modern: One unified AI workspace, brand voice consistency, 10x faster output.\n\nWhich side are you on? Link in bio to level up. ✨" 
    }
  ];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = templatesList.filter(t => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.structure.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 relative z-10 text-slate-900 dark:text-slate-100">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 dark:from-white dark:via-slate-100 dark:to-indigo-200 bg-clip-text text-transparent">
            AI Templates & Viral Hooks
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Pre-engineered hook structures, thread outlines, and high-converting framework blueprints
          </p>
        </div>

        <Link
          to="/generate"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] transition-all cursor-pointer border border-white/10"
        >
          <Sparkles size={14} />
          <span>Open AI Generator</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search templates or hooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-200 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>

        {/* Categories select tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 p-1 rounded-xl text-xs overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id 
                  ? "bg-indigo-600 text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
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
            className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 hover:border-indigo-500/30 hover:shadow-xl transition-all flex flex-col justify-between group min-h-[260px]"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-3">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  {temp.platform === "twitter" && <Twitter size={12} className="text-sky-400" />}
                  {temp.platform === "linkedin" && <Linkedin size={12} className="text-blue-500" />}
                  {temp.platform === "instagram" && <Instagram size={12} className="text-pink-400" />}
                  {temp.category}
                </span>

                <button
                  onClick={() => handleCopy(temp.id, temp.structure)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-white/5 text-slate-500 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
                  title="Copy Structure"
                >
                  {copiedId === temp.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  <span>{copiedId === temp.id ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                {temp.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                {temp.desc}
              </p>
            </div>

            {/* Template Structure Preview Box */}
            <div className="bg-slate-100 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-white/5 text-[11px] font-mono text-slate-600 dark:text-slate-400 whitespace-pre-wrap line-clamp-3 my-3">
              {temp.structure}
            </div>

            {/* Launch CTA */}
            <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-400 uppercase">1-Click Setup</span>
              <Link
                to={`/generate?topic=${encodeURIComponent(`[Replace with topic] - Using template: ${temp.title}`)}&platform=${temp.platform}`}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <span>Launch in Generator</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
