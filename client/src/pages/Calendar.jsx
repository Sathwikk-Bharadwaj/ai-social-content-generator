import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Calendar as CalendarIcon
} from "lucide-react";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState("June 2026");

  // Scheduled posts mock data
  const scheduledItems = [
    { day: 8, platform: "twitter", time: "9:00 AM", title: "Productivity Tips Thread" },
    { day: 10, platform: "linkedin", time: "11:00 AM", title: "Design Architecture Share" },
    { day: 14, platform: "instagram", time: "3:00 PM", title: "Aesthetics Showcase Post" },
    { day: 18, platform: "twitter", time: "10:30 AM", title: "Tailwind v4 Update Hook" },
    { day: 22, platform: "linkedin", time: "8:00 AM", title: "Career Growth Article" }
  ];

  // Grid for standard month layout
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-8 relative z-10">
      
      {/* Header Calendar controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Content Calendar</h1>
          <p className="text-slate-400 text-xs mt-1">Plan and verify scheduled post configurations across time zones</p>
        </div>

        {/* Navigation & Add */}
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-slate-950/60 border border-white/5 p-1 text-xs">
            <button className="p-2 text-slate-400 hover:text-white cursor-pointer"><ChevronLeft size={14} /></button>
            <span className="px-3 py-2 text-slate-300 font-bold font-display">{currentMonth}</span>
            <button className="p-2 text-slate-400 hover:text-white cursor-pointer"><ChevronRight size={14} /></button>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 active:scale-[0.98] transition-all cursor-pointer">
            <Plus size={14} />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-3 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Monthly grid */}
      <div className="grid grid-cols-7 gap-3 h-[500px]">
        {daysInMonth.map((day) => {
          const items = scheduledItems.filter((item) => item.day === day);
          
          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.02, borderColor: "rgba(99,102,241,0.25)" }}
              className="glass-panel p-3 rounded-2xl border border-white/5 bg-slate-950/10 flex flex-col justify-between h-full overflow-hidden transition-all group cursor-pointer relative"
            >
              {/* Day count number label */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold font-mono text-slate-500 group-hover:text-indigo-400 transition-colors">{day}</span>
                {day === 7 && (
                  <span className="text-[9px] font-bold text-indigo-400 font-mono border border-indigo-500/20 bg-indigo-500/10 rounded-md px-1 py-0.2">TODAY</span>
                )}
              </div>

              {/* Scheduled blocks inside cell */}
              <div className="flex-1 mt-2.5 space-y-1.5 overflow-y-auto">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-1.5 rounded-lg border text-[9px] leading-snug flex flex-col justify-between gap-1 transition-all ${
                      item.platform === "twitter"
                        ? "bg-sky-500/10 border-sky-500/20 text-sky-300"
                        : item.platform === "linkedin"
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-300"
                          : "bg-pink-500/10 border-pink-500/20 text-pink-300"
                    }`}
                  >
                    <div className="flex items-center gap-1 font-bold">
                      {item.platform === "twitter" && <Twitter size={9} />}
                      {item.platform === "linkedin" && <Linkedin size={9} />}
                      {item.platform === "instagram" && <Instagram size={9} />}
                      <span className="truncate max-w-[50px]">{item.time}</span>
                    </div>
                    <p className="truncate font-semibold">{item.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
