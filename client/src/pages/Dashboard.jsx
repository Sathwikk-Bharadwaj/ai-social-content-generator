import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowUpRight, 
  TrendingUp, 
  Zap, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Plus, 
  Calendar, 
  Share2, 
  Bot,
  Heart,
  MessageCircle,
  Repeat2
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Hello");
  const [activePreviewTab, setActivePreviewTab] = useState("twitter");
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Sparkline data
  const metrics = [
    { title: "Total Reach", value: "482.9K", growth: "+12.4%", trend: [20, 35, 25, 40, 38, 55, 60], color: "#6366f1" },
    { title: "Engagements", value: "32.4K", growth: "+8.2%", trend: [10, 15, 12, 25, 20, 30, 34], color: "#a855f7" },
    { title: "Conversion Rate", value: "3.24%", growth: "+1.8%", trend: [5, 12, 8, 15, 10, 18, 22], color: "#06b6d4" },
  ];

  // Quick Recommendations from AI Assistant
  const aiRecommendations = [
    { id: 1, text: "Generate a multi-step Twitter thread about building responsive layouts in Tailwind CSS v4.", platform: "twitter", difficulty: "High Impact" },
    { id: 2, text: "Write a high-converting LinkedIn post sharing your agency's product design philosophy.", platform: "linkedin", difficulty: "Recommended" },
    { id: 3, text: "Draft an engaging Instagram carousel outline presenting the benefits of AI content automation.", platform: "instagram", difficulty: "Trending" },
  ];

  // Trend list
  const trendingInsights = [
    { tag: "#VibeCoding", growth: "94%", volume: "42.1K posts", platform: "twitter" },
    { tag: "Generative UI Kits", growth: "78%", volume: "18.3K impressions", platform: "linkedin" },
    { tag: "Glassmorphism Aesthetics", growth: "62%", volume: "89.2K engagements", platform: "instagram" },
  ];

  // Mock social previews
  const socialPreviews = {
    twitter: {
      author: "Sathwik A",
      handle: "@sathwik_design",
      avatar: "SA",
      content: "Just designed a futuristic SaaS dashboard utilizing Tailwind v4 and Framer Motion. The UI is completely glassmorphic with interactive canvas neural networks. Can't wait to launch this tool! ✨ #SaaS #UIDesign #AI",
      time: "2h ago",
      likes: "1,240",
      retweets: "348",
      replies: "42"
    },
    linkedin: {
      author: "Sathwik A",
      handle: "UI/UX Architect & SaaS Developer",
      avatar: "SA",
      content: "🚀 Excited to share a sneak peek of our new dashboard interface. In modern product design, user experience isn't just about utility — it's about delight. We focused on micro-animations, GPU-accelerated canvas grids, and custom transitions to create an immersive feeling. What do you think about dark mode glassmorphism?",
      time: "4h ago",
      likes: "890",
      comments: "154",
      shares: "28"
    },
    instagram: {
      author: "sathwik.creates",
      handle: "Aura Design Labs",
      avatar: "SA",
      content: "The future is glassmorphic. 💎 Shading, borders, and ambient light highlights are what make modern web panels look and feel premium. Our new AI Social Content Generator helps developers produce custom assets and copy in seconds. Link in bio!",
      time: "1d ago",
      likes: "3,480",
      comments: "92"
    }
  };

  return (
    <div className="space-y-8 relative z-10 text-slate-900 dark:text-slate-100">
      {/* Top Welcome / Hero */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">System Online</span>
          </div>
          <h1 className="text-4.5xl font-extrabold tracking-tight font-display bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 dark:from-white dark:via-slate-100 dark:to-indigo-200 bg-clip-text text-transparent">
            {greeting}, Sathwik
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Ready to generate content and optimize your social media presence?
          </p>
        </motion.div>

        {/* Quick Actions Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <Link
            to="/generate"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] transition-all cursor-pointer border border-white/10"
          >
            <Sparkles size={16} />
            <span>Generate Post</span>
          </Link>
          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer">
            <Calendar size={18} />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer">
            <Share2 size={18} />
          </button>
        </motion.div>
      </div>

      {/* Real-time Analytics Metric Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 relative overflow-hidden group"
          >
            {/* Sparkline background glow */}
            <div 
              className="absolute inset-x-0 bottom-0 h-16 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity"
              style={{ background: `linear-gradient(0deg, ${item.color}, transparent)` }}
            />
            
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{item.title}</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 rounded-md px-1.5 py-0.5 flex items-center gap-1 font-mono">
                <TrendingUp size={10} />
                {item.growth}
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-bold font-display tracking-tight text-slate-900 dark:text-white">{item.value}</span>
              
              {/* Sparkline Chart */}
              <div className="w-24 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <defs>
                    <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={item.color} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={item.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M ${item.trend.map((val, idx) => `${idx * 16.6}, ${30 - val / 2.2}`).join(" L ")}`}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M 0,30 L ${item.trend.map((val, idx) => `${idx * 16.6}, ${30 - val / 2.2}`).join(" L ")} L 100,30 Z`}
                    fill={`url(#grad-${i})`}
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: AI Assistant & Social Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Holographic AI Assistant & Recommendations (Col 2) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-gradient-to-br dark:from-indigo-950/20 dark:via-slate-950/40 dark:to-violet-950/20 relative overflow-hidden"
          >
            {/* Visual AI Brain graphic - Morphing Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 rounded-full blur-[30px] -mr-8 -mt-8 animate-spin-slow pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-650 dark:text-indigo-400">
                <Bot size={20} className="animate-bounce" />
              </div>
              <div>
                <h3 className="text-md font-bold text-slate-900 dark:text-white font-display">Aura Assistant</h3>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Holographic Advisor</span>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">
              "Based on your profile, scheduling LinkedIn copy during morning hours sees 40% higher clicks. Here are some optimized recommendations:"
            </p>

            {/* AI Recommendation Cards */}
            <div className="space-y-3">
              {aiRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecommendation(rec.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs relative group flex gap-3 items-start ${
                    selectedRecommendation === rec.id
                      ? "bg-indigo-600/15 border-indigo-500/50 text-indigo-700 dark:text-indigo-200"
                      : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-200/50 dark:hover:bg-white/8"
                  }`}
                >
                  <div className="mt-0.5">
                    {rec.platform === "twitter" && <Twitter size={14} className="text-sky-400" />}
                    {rec.platform === "linkedin" && <Linkedin size={14} className="text-blue-500" />}
                    {rec.platform === "instagram" && <Instagram size={14} className="text-pink-400" />}
                  </div>
                  
                  <div className="flex-1">
                    <p className="line-clamp-2">{rec.text}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">{rec.difficulty}</span>
                      <Link 
                        to={`/generate?topic=${encodeURIComponent(rec.text)}&platform=${rec.platform}`}
                        className="text-[9px] font-bold text-slate-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 hover:underline"
                      >
                        Launch Prompt <ArrowUpRight size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trending content Insights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20"
          >
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 font-display flex items-center gap-2">
              <TrendingUp size={16} className="text-indigo-650 dark:text-indigo-400" />
              Trending Social Hooks
            </h4>
            <div className="space-y-4">
              {trendingInsights.map((insight) => (
                <div key={insight.tag} className="flex items-center justify-between text-xs border-b border-slate-200 dark:border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    {insight.platform === "twitter" && <Twitter size={12} className="text-slate-500" />}
                    {insight.platform === "linkedin" && <Linkedin size={12} className="text-slate-500" />}
                    {insight.platform === "instagram" && <Instagram size={12} className="text-slate-500" />}
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{insight.tag}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono text-[10px]">{insight.growth} Growth</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{insight.volume}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Social Media Draft Previews (Col 3) */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 flex flex-col h-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/5 pb-4 mb-6">
              <div>
                <h3 className="text-md font-bold text-slate-850 dark:text-white font-display">Active Queue Drafts</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Live feed rendering of mock previews</p>
              </div>

              {/* Tabs */}
              <div className="flex rounded-xl bg-slate-200/60 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 p-1 text-xs self-start sm:self-center">
                {["twitter", "linkedin", "instagram"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePreviewTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activePreviewTab === tab
                        ? "bg-indigo-600 text-white font-semibold shadow-sm"
                        : "text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {tab === "twitter" && <Twitter size={12} />}
                    {tab === "linkedin" && <Linkedin size={12} />}
                    {tab === "instagram" && <Instagram size={12} />}
                    <span className="capitalize">{tab === "twitter" ? "X" : tab}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Post Card */}
            <div className="flex-1 flex items-center justify-center bg-slate-100 dark:bg-slate-950/30 border border-slate-200 dark:border-white/5 rounded-2xl p-6 min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePreviewTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-xl text-slate-800 dark:text-slate-350"
                >
                  {/* Account Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full border border-indigo-500/20 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-650 dark:text-indigo-400 text-sm">
                        {socialPreviews[activePreviewTab].avatar}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          {socialPreviews[activePreviewTab].author}
                          {activePreviewTab === "twitter" && (
                            <span className="inline-block h-3.5 w-3.5 text-sky-500 dark:text-sky-400 font-mono text-[9px] border border-sky-500/20 bg-sky-500/10 rounded-full text-center leading-3">✓</span>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs">{socialPreviews[activePreviewTab].handle}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-605">{socialPreviews[activePreviewTab].time}</span>
                  </div>

                  {/* Body Copy */}
                  <p className="mt-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans">
                    {socialPreviews[activePreviewTab].content}
                  </p>

                  {/* Mock Visual (for Instagram/Linkedin) */}
                  {activePreviewTab !== "twitter" && (
                    <div className="mt-4 rounded-xl overflow-hidden aspect-video bg-slate-200/50 dark:bg-gradient-to-tr dark:from-indigo-950/40 dark:via-violet-900/10 dark:to-pink-900/10 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center relative group cursor-pointer">
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] text-slate-800 dark:text-white font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-md">Edit Media File</span>
                      </div>
                      <Bot className="h-8 w-8 text-indigo-500/40 dark:text-indigo-400/40 animate-pulse" />
                      <span className="text-[10px] text-slate-500 dark:text-slate-500 mt-2 font-mono">Simulated Carousel Cover Art</span>
                    </div>
                  )}

                  {/* Feed Interaction Buttons */}
                  <div className="flex items-center gap-6 mt-5 pt-4 border-t border-slate-200 dark:border-white/5 text-[10px] text-slate-500 dark:text-slate-400 font-semibold font-mono">
                    {activePreviewTab === "twitter" && (
                      <>
                        <span className="flex items-center gap-1 hover:text-sky-500 transition-colors cursor-pointer"><MessageCircle size={13} /> {socialPreviews.twitter.replies}</span>
                        <span className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer"><Repeat2 size={13} /> {socialPreviews.twitter.retweets}</span>
                        <span className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer"><Heart size={13} /> {socialPreviews.twitter.likes}</span>
                      </>
                    )}
                    {activePreviewTab === "linkedin" && (
                      <>
                        <span className="flex items-center gap-1 hover:text-indigo-500 transition-colors cursor-pointer"><Heart size={13} /> Likes ({socialPreviews.linkedin.likes})</span>
                        <span className="flex items-center gap-1 hover:text-indigo-500 transition-colors cursor-pointer"><MessageCircle size={13} /> Comments ({socialPreviews.linkedin.comments})</span>
                        <span className="flex items-center gap-1 hover:text-indigo-500 transition-colors cursor-pointer"><Repeat2 size={13} /> Shares ({socialPreviews.linkedin.shares})</span>
                      </>
                    )}
                    {activePreviewTab === "instagram" && (
                      <>
                        <span className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer"><Heart size={13} /> {socialPreviews.instagram.likes} Likes</span>
                        <span className="flex items-center gap-1 hover:text-pink-500 transition-colors cursor-pointer"><MessageCircle size={13} /> {socialPreviews.instagram.comments} Comments</span>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold font-mono uppercase">Queue Sync Time: every 15 min</span>
              <Link to="/studio" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-750 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors">
                Manage Studio Queue <ArrowUpRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Campaign Performance Charts (Visual Mock) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-md font-bold text-slate-800 dark:text-white font-display">Performance Projection</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Weekly reach growth comparison across core platforms</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-sky-400" /> Twitter</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> LinkedIn</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-pink-500" /> Instagram</span>
          </div>
        </div>

        {/* Large SVG Gradient Chart */}
        <div className="w-full h-56 relative">
          <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="glow-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="glow-blue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="glow-pink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="40" x2="800" y2="40" className="stroke-slate-200 dark:stroke-white/5" strokeWidth="1" />
            <line x1="0" y1="90" x2="800" y2="90" className="stroke-slate-200 dark:stroke-white/5" strokeWidth="1" />
            <line x1="0" y1="140" x2="800" y2="140" className="stroke-slate-200 dark:stroke-white/5" strokeWidth="1" />

            {/* SVG Area Paths */}
            {/* Instagram (pink) */}
            <path
              d="M 0,160 Q 150,140 300,90 T 600,60 T 800,40 L 800,200 L 0,200 Z"
              fill="url(#glow-pink)"
            />
            {/* LinkedIn (blue) */}
            <path
              d="M 0,180 Q 150,170 300,130 T 600,80 T 800,50 L 800,200 L 0,200 Z"
              fill="url(#glow-blue)"
            />
            {/* Twitter (sky) */}
            <path
              d="M 0,190 Q 150,180 300,160 T 600,120 T 800,70 L 800,200 L 0,200 Z"
              fill="url(#glow-sky)"
            />

            {/* Line Paths */}
            <path
              d="M 0,160 Q 150,140 300,90 T 600,60 T 800,40"
              fill="none"
              stroke="#ec4899"
              strokeWidth="2.5"
            />
            <path
              d="M 0,180 Q 150,170 300,130 T 600,80 T 800,50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
            />
            <path
              d="M 0,190 Q 150,180 300,160 T 600,120 T 800,70"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="4 2"
            />

            {/* Highlights nodes */}
            <circle cx="300" cy="90" r="4" fill="#ec4899" stroke="#fff" strokeWidth="1.5" />
            <circle cx="600" cy="80" r="4" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
          </svg>
          
          {/* Label overlays */}
          <div className="absolute left-2 top-8 text-[9px] font-mono text-slate-500 font-bold uppercase">100K Reach</div>
          <div className="absolute left-2 top-20 text-[9px] font-mono text-slate-500 font-bold uppercase">50K Reach</div>
          <div className="absolute left-2 top-32 text-[9px] font-mono text-slate-500 font-bold uppercase">10K Reach</div>
        </div>

        {/* Time X-axis Labels */}
        <div className="flex justify-between px-2 mt-2 text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
          <span>Week 5</span>
          <span>Week 6</span>
        </div>
      </motion.div>
    </div>
  );
}
