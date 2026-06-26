import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Users, 
  MousePointer, 
  Eye,
  CheckCircle2
} from "lucide-react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30d");
  const [activePlatform, setActivePlatform] = useState("all");

  const kpiData = [
    { title: "Followers", value: "24,840", growth: "+14.2%", icon: Users, color: "#6366f1", desc: "Gain of 2,420 users" },
    { title: "Impressions", value: "1,248,390", growth: "+22.5%", icon: Eye, color: "#06b6d4", desc: "Reach increased" },
    { title: "Clicks & Saves", value: "18,480", growth: "+8.6%", icon: MousePointer, color: "#a855f7", desc: "CTR averaging 2.4%" },
    { title: "Successful Posts", value: "84", growth: "100%", icon: CheckCircle2, color: "#ec4899", desc: "Zero publication errors" },
  ];

  // Chart data based on timeRange
  const charts = {
    "7d": [30, 45, 38, 62, 50, 75, 88],
    "30d": [20, 25, 18, 30, 28, 42, 35, 50, 48, 65, 58, 72, 68, 85, 78, 92, 88, 105, 95, 115, 110, 128, 120, 135, 130, 145, 138, 155, 150, 168],
    "90d": [30, 50, 45, 70, 60, 90, 80, 110, 95, 130, 115, 150, 135, 180, 160, 200, 180, 230, 210, 260, 240, 300, 280, 330, 310, 360, 340, 390]
  };

  const activePoints = charts[timeRange];
  const maxVal = Math.max(...activePoints);
  const minVal = Math.min(...activePoints);

  // Generate SVG path coordinate strings
  const getSvgCoordinates = () => {
    const width = 800;
    const height = 180;
    const step = width / (activePoints.length - 1);
    
    return activePoints.map((val, idx) => {
      const x = idx * step;
      // Normalize values to fit inside height
      const y = height - ((val - minVal) / (maxVal - minVal)) * (height - 30) - 15;
      return `${x},${y}`;
    }).join(" L ");
  };

  const svgPath = getSvgCoordinates();

  // Optimal Posting Times Heatmap (Mon-Sun, 9AM-9PM)
  const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const heatmapHours = ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM"];
  
  // Simulated heatmap density (0 = low, 3 = high)
  const heatmapData = [
    [1, 2, 1, 3, 2], // Mon
    [2, 3, 2, 2, 1], // Tue
    [1, 2, 3, 3, 2], // Wed
    [2, 2, 1, 3, 3], // Thu
    [3, 3, 2, 2, 2], // Fri
    [1, 1, 2, 1, 3], // Sat
    [1, 1, 1, 2, 2], // Sun
  ];

  // Platform comparisons
  const platforms = [
    { name: "Twitter / X", followers: "8.4K", engagement: "4.8%", posts: 36, color: "#38bdf8", icon: Twitter },
    { name: "LinkedIn", followers: "12.2K", engagement: "6.2%", posts: 28, color: "#3b82f6", icon: Linkedin },
    { name: "Instagram", followers: "4.2K", engagement: "8.4%", posts: 20, color: "#ec4899", icon: Instagram },
  ];

  return (
    <div className="space-y-8 relative z-10 text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white">Platform Analytics</h1>
          <p className="text-slate-650 dark:text-slate-400 text-xs mt-1">Audit content performance and audience acquisition metrics</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex rounded-xl bg-slate-200/60 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 p-1 text-xs self-start sm:self-center font-semibold">
          {["7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                timeRange === range
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200"
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <div 
                  className="h-10 w-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900 group-hover:scale-105 transition-transform"
                  style={{ color: kpi.color }}
                >
                  <Icon size={18} />
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold bg-emerald-500/10 rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
                  <TrendingUp size={10} />
                  {kpi.growth}
                </span>
              </div>
              
              <div className="mt-5">
                <span className="text-[10px] text-slate-500 dark:text-slate-450 font-bold uppercase tracking-wider font-display">{kpi.title}</span>
                <h3 className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-0.5">{kpi.value}</h3>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">{kpi.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Interactive Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Growth Graph Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 lg:col-span-2 space-y-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4">
            <div>
              <h3 className="text-md font-bold text-slate-900 dark:text-white font-display">Interactive Engagement Audit</h3>
              <p className="text-xs text-slate-650 dark:text-slate-400">Total clicks, saves, and likes over time</p>
            </div>
            
            <div className="flex items-center gap-1.5 bg-slate-200/60 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 p-1 rounded-xl text-[10px] font-bold">
              <button 
                onClick={() => setActivePlatform("all")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${activePlatform === "all" ? "bg-indigo-600 text-white" : "text-slate-650 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-350"}`}
              >
                ALL
              </button>
              <button 
                onClick={() => setActivePlatform("twitter")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${activePlatform === "twitter" ? "bg-sky-500/15 text-sky-600 dark:text-sky-400" : "text-slate-650 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-350"}`}
              >
                X
              </button>
              <button 
                onClick={() => setActivePlatform("linkedin")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${activePlatform === "linkedin" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" : "text-slate-650 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-350"}`}
              >
                LN
              </button>
            </div>
          </div>

          {/* SVG Animated Chart */}
          <div className="w-full h-48 relative pt-2">
            <svg className="w-full h-full" viewBox="0 0 800 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="800" y2="30" className="stroke-slate-200 dark:stroke-white/5" strokeWidth="1" />
              <line x1="0" y1="90" x2="800" y2="90" className="stroke-slate-200 dark:stroke-white/5" strokeWidth="1" />
              <line x1="0" y1="150" x2="800" y2="150" className="stroke-slate-200 dark:stroke-white/5" strokeWidth="1" />

              {/* Area */}
              <path
                d={`M 0,180 L ${svgPath} L 800,180 Z`}
                fill="url(#chart-fill)"
              />

              {/* Stroke */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                d={`M ${svgPath}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* Glowing active node circles */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* Mock active tracking indicators */}
              <div className="absolute h-2 w-2 rounded-full bg-indigo-400 border border-white shadow-[0_0_8px_rgba(99,102,241,1)]" style={{ left: "50%", top: "45%", transform: "translate(-50%, -50%)" }} />
              <div className="absolute h-2 w-2 rounded-full bg-indigo-400 border border-white shadow-[0_0_8px_rgba(99,102,241,1)]" style={{ right: "5%", top: "15%", transform: "translate(-50%, -50%)" }} />
            </div>
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold uppercase pt-2">
            <span>Interval Initial</span>
            <span>Mid Range Audit</span>
            <span>Terminal Reading</span>
          </div>
        </motion.div>

        {/* Platform Comparison */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-md font-bold text-slate-900 dark:text-white font-display">Social Platform Audit</h3>
            <p className="text-xs text-slate-650 dark:text-slate-400 mb-6">Cross-channel reach and engagement analysis</p>
          </div>

          <div className="space-y-5 flex-1 flex flex-col justify-center">
            {platforms.map((platform) => {
              const PlatformIcon = platform.icon;
              return (
                <div key={platform.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-7 w-7 rounded-lg flex items-center justify-center border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900"
                        style={{ color: platform.color }}
                      >
                        <PlatformIcon size={14} />
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{platform.name}</span>
                    </div>
                    <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">{platform.followers} / {platform.engagement} Eng</span>
                  </div>

                  {/* custom progress bar */}
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-950/60 overflow-hidden border border-slate-200 dark:border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: platform.followers.includes("12") ? "85%" : platform.followers.includes("8") ? "60%" : "35%" }}
                      transition={{ duration: 1.0, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: platform.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-200 dark:border-white/5 pt-4 mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Synchronized: 3m ago</span>
            <a href="#" className="text-indigo-650 dark:text-indigo-400 font-bold hover:underline flex items-center gap-0.5">
              Export CSV <ArrowUpRight size={10} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Heatmap Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-md font-bold text-slate-900 dark:text-white font-display">Optimal Posting Frequency</h3>
            <p className="text-xs text-slate-650 dark:text-slate-400">Audience density mapping based on hourly activity logs</p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
            <span>Low Engagement</span>
            <div className="flex gap-1">
              <span className="h-3.5 w-3.5 rounded bg-indigo-500/10 border border-slate-200 dark:border-white/5" />
              <span className="h-3.5 w-3.5 rounded bg-indigo-500/30 border border-slate-200 dark:border-white/5" />
              <span className="h-3.5 w-3.5 rounded bg-indigo-500/60 border border-slate-200 dark:border-white/5" />
              <span className="h-3.5 w-3.5 rounded bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            </div>
            <span>High Density</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[500px] grid grid-cols-6 gap-3 pt-2">
            
            {/* Corner header label */}
            <div className="text-[10px] font-mono text-slate-600 font-bold uppercase flex items-center">Weekday</div>
            
            {/* Hour labels */}
            {heatmapHours.map((hour) => (
              <div key={hour} className="text-center text-[10px] font-mono text-slate-500 font-bold uppercase">{hour}</div>
            ))}

            {/* Grid Cells */}
            {heatmapDays.map((day, dIdx) => (
              <>
                {/* Day row label */}
                <div key={`${day}-label`} className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center">{day}</div>
                
                {/* Data values */}
                {heatmapHours.map((_, hIdx) => {
                  const density = heatmapData[dIdx][hIdx];
                  const bgStyles = [
                    "bg-indigo-500/10 border-slate-200/50 dark:border-white/5 hover:bg-indigo-500/20",
                    "bg-indigo-500/30 border-indigo-500/10 hover:bg-indigo-500/40",
                    "bg-indigo-500/60 border-indigo-500/20 hover:bg-indigo-500/70",
                    "bg-indigo-500 border-indigo-400/40 shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                  ];

                  return (
                    <motion.div
                      key={`${day}-${hIdx}`}
                      whileHover={{ scale: 1.05 }}
                      className={`h-12 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${bgStyles[density]}`}
                    >
                      {density === 3 && (
                        <span className="text-[9px] font-mono font-bold text-slate-800 dark:text-white bg-white/70 dark:bg-slate-950/70 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/10 uppercase tracking-widest">PEAK</span>
                      )}
                    </motion.div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}
