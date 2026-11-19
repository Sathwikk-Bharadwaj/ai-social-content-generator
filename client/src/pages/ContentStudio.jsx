import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Clock, 
  ArrowRight,
  Trash2,
  Sparkles,
  RefreshCw
} from "lucide-react";
import apiClient from "../api/client";

export default function ContentStudio() {
  const [activePlatformFilter, setActivePlatformFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { id: "draft", label: "Idea Drafts", color: "text-slate-400 border-slate-500/20", next: "review", nextLabel: "Send to Review" },
    { id: "review", label: "In Review", color: "text-amber-400 border-amber-500/20", next: "approved", nextLabel: "Approve" },
    { id: "approved", label: "Approved", color: "text-emerald-400 border-emerald-500/20", next: "scheduled", nextLabel: "Schedule" },
    { id: "scheduled", label: "Scheduled", color: "text-indigo-400 border-indigo-500/20", next: null, nextLabel: null }
  ];

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get("/api/posts");
      setDrafts(res.data.posts || []);
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleMoveStatus = async (id, nextStatus) => {
    try {
      await apiClient.patch(`/api/posts/${id}/status`, { status: nextStatus });
      setDrafts((prev) =>
        prev.map((d) => (d._id === id ? { ...d, status: nextStatus } : d))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await apiClient.delete(`/api/posts/${id}`);
      setDrafts((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const filteredDrafts = drafts.filter((draft) => {
    const matchPlatform =
      activePlatformFilter === "all" || draft.platform === activePlatformFilter;
    const matchSearch =
      (draft.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (draft.content || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchPlatform && matchSearch;
  });

  return (
    <div className="space-y-6 relative z-10 text-slate-900 dark:text-slate-100">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 dark:from-white dark:via-slate-100 dark:to-indigo-200 bg-clip-text text-transparent">
            Content Studio
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Audit draft queues, manage approvals, and schedule campaign timelines
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchPosts}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Refresh Feed"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          </button>
          <Link
            to="/generate"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] transition-all cursor-pointer border border-white/10"
          >
            <Sparkles size={14} />
            <span>Generate New Post</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search copy elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-200 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>

        {/* Platform selectors */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActivePlatformFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
              activePlatformFilter === "all"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
            }`}
          >
            All Channels
          </button>
          <button
            onClick={() => setActivePlatformFilter("twitter")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
              activePlatformFilter === "twitter"
                ? "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
            }`}
          >
            <Twitter size={12} />
            <span>X</span>
          </button>
          <button
            onClick={() => setActivePlatformFilter("linkedin")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
              activePlatformFilter === "linkedin"
                ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
            }`}
          >
            <Linkedin size={12} />
            <span>LN</span>
          </button>
          <button
            onClick={() => setActivePlatformFilter("instagram")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
              activePlatformFilter === "instagram"
                ? "bg-pink-500/15 text-pink-600 dark:text-pink-400"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
            }`}
          >
            <Instagram size={12} />
            <span>IG</span>
          </button>
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[500px]">
        {columns.map((col) => {
          const colDrafts = filteredDrafts.filter((d) => (d.status || "draft") === col.id);
          return (
            <div
              key={col.id}
              className="flex flex-col bg-slate-100/60 dark:bg-slate-950/20 border border-slate-200 dark:border-white/5 rounded-2xl p-4 relative"
            >
              {/* Column Title Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/5">
                <span className={`text-xs font-bold font-display uppercase tracking-widest ${col.color}`}>
                  {col.label}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-md px-1.5 py-0.5">
                  {colDrafts.length}
                </span>
              </div>

              {/* Column Content Cards */}
              <div className="flex-1 space-y-3">
                <AnimatePresence>
                  {colDrafts.map((draft) => (
                    <motion.div
                      key={draft._id || draft.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 hover:shadow-lg transition-all space-y-3 group"
                    >
                      {/* Channel Indicators */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                          {draft.platform === "twitter" && <Twitter size={11} className="text-sky-400" />}
                          {draft.platform === "linkedin" && <Linkedin size={11} className="text-blue-500" />}
                          {draft.platform === "instagram" && <Instagram size={11} className="text-pink-400" />}
                          {draft.platform}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDeletePost(draft._id || draft.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                          <span className="text-[9px] text-slate-400 flex items-center gap-0.5 font-mono">
                            <Clock size={9} />
                            {draft.scheduledTime || (draft.createdAt ? new Date(draft.createdAt).toLocaleDateString() : "Just now")}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        {draft.title}
                      </h4>

                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {draft.content}
                      </p>

                      {col.next && (
                        <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex justify-end">
                          <button
                            onClick={() => handleMoveStatus(draft._id || draft.id, col.next)}
                            className="flex items-center gap-1 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                          >
                            <span>{col.nextLabel}</span>
                            <ArrowRight size={10} />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {colDrafts.length === 0 && (
                  <div className="h-24 flex items-center justify-center border border-dashed border-slate-300 dark:border-white/10 rounded-xl text-[10px] text-slate-400 font-semibold uppercase">
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
