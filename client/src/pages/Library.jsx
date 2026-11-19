import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Copy, 
  Check, 
  Trash2, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Search, 
  Sparkles, 
  ArrowUpRight,
  FolderOpen
} from "lucide-react";
import apiClient from "../api/client";

export default function Library() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await apiClient.get("/api/posts");
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error("Failed to load library posts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSaved();
  }, []);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/api/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const filtered = posts.filter(
    (p) =>
      (p.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.content || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 relative z-10 text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 dark:from-white dark:via-slate-100 dark:to-indigo-200 bg-clip-text text-transparent">
            Saved Content Library
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Browse, manage, and repurpose your collection of saved AI-generated copy
          </p>
        </div>

        <Link
          to="/generate"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] transition-all cursor-pointer border border-white/10"
        >
          <Sparkles size={14} />
          <span>Generate More</span>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        <input
          type="text"
          placeholder="Filter saved copy by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-200 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500/50 transition-colors"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((post) => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 hover:border-indigo-500/30 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Channel & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    {post.platform === "twitter" && <Twitter size={12} className="text-sky-400" />}
                    {post.platform === "linkedin" && <Linkedin size={12} className="text-blue-500" />}
                    {post.platform === "instagram" && <Instagram size={12} className="text-pink-400" />}
                    {post.platform}
                  </span>

                  <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 uppercase">
                    {post.status || "draft"}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap line-clamp-4">
                  {post.content}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(post._id, post.content)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-white/5 text-slate-500 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer text-[10px] flex items-center gap-1 font-semibold"
                  >
                    {copiedId === post._id ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                    <span>{copiedId === post._id ? "Copied" : "Copy"}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-white/5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Delete Post"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>

                <Link
                  to="/studio"
                  className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Open in Studio</span>
                  <ArrowUpRight size={10} />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && !isLoading && (
        <div className="py-16 text-center text-slate-400 space-y-3">
          <FolderOpen size={36} className="mx-auto text-slate-400 opacity-60" />
          <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300">No saved content found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Generate posts in the AI Generator and click &quot;Save to Studio&quot; to build your library.
          </p>
        </div>
      )}

    </div>
  );
}
