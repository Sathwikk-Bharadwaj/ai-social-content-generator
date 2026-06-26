import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar as CalendarIcon
} from "lucide-react";

export default function ContentStudio() {
  const [activePlatformFilter, setActivePlatformFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const initialDrafts = [
    { id: 1, title: "Q2 Product Feature Launch", content: "Exciting update coming! We have successfully integrated a functional dashboard architecture using modern CSS. Check it out.", platform: "linkedin", status: "draft", time: "Jun 10, 10:00 AM" },
    { id: 2, title: "Design Systems Thread", content: "Design systems are NOT static assets. They are living API contracts between code and style. 🧵👇", platform: "twitter", status: "review", time: "Jun 12, 2:00 PM" },
    { id: 3, title: "Glassmorphism Art Reveal", content: "Modern styling highlights. What do you think about dark mode glassmorphism?", platform: "instagram", status: "approved", time: "Jun 14, 5:30 PM" },
    { id: 4, title: "Agentic Workflows Article", content: "The developer's role is shifting. Development is shifting from manual coding to design orchestration.", platform: "linkedin", status: "scheduled", time: "Jun 16, 9:00 AM" },
    { id: 5, title: "Tailwind v4 Cheat Sheet", content: "Tailwind v4 is here! Custom configurations are now handled in standard CSS files.", platform: "twitter", status: "scheduled", time: "Jun 18, 11:15 AM" }
  ];

  const columns = [
    { id: "draft", label: "Idea Drafts", color: "border-slate-500/20 bg-slate-500/5 text-slate-400" },
    { id: "review", label: "In Review", color: "border-amber-500/20 bg-amber-500/5 text-amber-400" },
    { id: "approved", label: "Approved", color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" },
    { id: "scheduled", label: "Scheduled", color: "border-indigo-500/20 bg-indigo-500/5 text-indigo-400" }
  ];

  const filteredDrafts = initialDrafts.filter(draft => {
    const matchPlatform = activePlatformFilter === "all" || draft.platform === activePlatformFilter;
    const matchSearch = draft.title.toLowerCase().includes(searchQuery.toLowerCase()) || draft.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPlatform && matchSearch;
  });

  return (
    <div className="space-y-8 relative z-10">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Content Studio</h1>
          <p className="text-slate-400 text-xs mt-1">Audit draft queues, manage approvals, and schedule campaign timelines</p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 active:scale-[0.98] transition-all cursor-pointer">
          <Plus size={14} />
          <span>New Copy Canvas</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Search copy elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>

        {/* Platform selectors */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 border border-white/5 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActivePlatformFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
              activePlatformFilter === "all" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            All Channels
          </button>
          <button
            onClick={() => setActivePlatformFilter("twitter")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
              activePlatformFilter === "twitter" ? "bg-sky-500/15 text-sky-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Twitter size={12} />
            <span>X</span>
          </button>
          <button
            onClick={() => setActivePlatformFilter("linkedin")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
              activePlatformFilter === "linkedin" ? "bg-blue-500/15 text-blue-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Linkedin size={12} />
            <span>LN</span>
          </button>
          <button
            onClick={() => setActivePlatformFilter("instagram")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
              activePlatformFilter === "instagram" ? "bg-pink-500/15 text-pink-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Instagram size={12} />
            <span>IG</span>
          </button>
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-280px)] overflow-hidden">
        {columns.map((col) => {
          const colDrafts = filteredDrafts.filter(d => d.status === col.id);
          return (
            <div key={col.id} className="flex flex-col h-full bg-slate-950/20 border border-white/5 rounded-2.5xl p-4 overflow-hidden relative">
              
              {/* Column Title Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                <span className={`text-xs font-bold font-display uppercase tracking-widest ${col.label.includes("Idea") ? "text-slate-400" : col.label.includes("Review") ? "text-amber-400" : col.label.includes("Approved") ? "text-emerald-400" : "text-indigo-400"}`}>
                  {col.label}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-white/5 border border-white/5 rounded-md px-1.5 py-0.5">{colDrafts.length}</span>
              </div>

              {/* Column Content Cards (Scrollable list) */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-4">
                {colDrafts.map((draft) => (
                  <motion.div
                    key={draft.id}
                    layoutId={`card-${draft.id}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-white/10 hover:shadow-lg shadow-black/20 cursor-pointer space-y-3 group transition-shadow"
                  >
                    {/* Channel Indicators */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        {draft.platform === "twitter" && <Twitter size={11} className="text-sky-400" />}
                        {draft.platform === "linkedin" && <Linkedin size={11} className="text-blue-500" />}
                        {draft.platform === "instagram" && <Instagram size={11} className="text-pink-400" />}
                        {draft.platform}
                      </span>

                      {/* Info Badge */}
                      <span className="text-[9px] text-slate-500 flex items-center gap-0.5 font-mono">
                        <Clock size={9} />
                        {draft.time.split(",")[0]}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                      {draft.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                      {draft.content}
                    </p>
                  </motion.div>
                ))}

                {colDrafts.length === 0 && (
                  <div className="h-24 flex items-center justify-center border border-dashed border-white/5 rounded-xl text-[10px] text-slate-600 font-semibold uppercase">
                    Empty Queue
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
