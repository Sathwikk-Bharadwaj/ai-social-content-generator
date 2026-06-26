import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Share2, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Plus, 
  RefreshCw, 
  Settings2, 
  CheckCircle2, 
  AlertCircle,
  Link2
} from "lucide-react";

export default function SocialAccounts() {
  const [channels, setChannels] = useState([
    { id: "twitter", name: "Twitter / X", handle: "@sathwik_design", avatar: "SA", followers: "8,420", status: "connected", color: "sky", icon: Twitter },
    { id: "linkedin", name: "LinkedIn Professional", handle: "Sathwik A (Agency Owner)", avatar: "SA", followers: "12,180", status: "connected", color: "blue", icon: Linkedin },
    { id: "instagram", name: "Instagram Brand", handle: "sathwik.creates", avatar: "SA", followers: "4,190", status: "connected", color: "pink", icon: Instagram },
    { id: "tiktok", name: "TikTok Account", handle: "Not connected", avatar: null, followers: "0", status: "offline", color: "teal", icon: Share2 }
  ]);

  const handleSync = (idx) => {
    // Quick mock sync trigger
    const updated = [...channels];
    updated[idx].status = "syncing";
    setChannels(updated);

    setTimeout(() => {
      const finished = [...channels];
      finished[idx].status = "connected";
      setChannels(finished);
    }, 1500);
  };

  return (
    <div className="space-y-8 relative z-10">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Social Connections</h1>
          <p className="text-slate-400 text-xs mt-1">Authorize publishing integrations, sync metadata stats, and configure webhook credentials</p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 active:scale-[0.98] transition-all cursor-pointer">
          <Plus size={14} />
          <span>Connect New Profile</span>
        </button>
      </div>

      {/* Grid listing social profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((chan, idx) => {
          const Icon = chan.icon;
          const isConnected = chan.status === "connected";
          const isSyncing = chan.status === "syncing";
          
          return (
            <motion.div
              key={chan.id}
              whileHover={{ y: -3 }}
              className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Visual brand backglow */}
              <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-[40px] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none ${
                chan.color === "sky" ? "bg-sky-400" : chan.color === "blue" ? "bg-blue-500" : chan.color === "pink" ? "bg-pink-500" : "bg-teal-500"
              }`} />

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center border border-white/5 bg-slate-900 ${
                    chan.color === "sky" ? "text-sky-400" : chan.color === "blue" ? "text-blue-500" : chan.color === "pink" ? "text-pink-400" : "text-slate-500"
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{chan.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{chan.handle}</p>
                  </div>
                </div>

                {/* Connection Status Badge */}
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${isConnected ? "bg-emerald-500" : isSyncing ? "bg-indigo-500 animate-ping" : "bg-slate-600"}`} />
                  <span className="text-[10px] font-bold font-mono uppercase text-slate-400">
                    {chan.status}
                  </span>
                </div>
              </div>

              {/* Middle Section stats */}
              {isConnected && (
                <div className="mt-6 flex gap-8 border-y border-white/5 py-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Followers</span>
                    <h4 className="text-md font-bold text-white font-mono">{chan.followers}</h4>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Reach Score</span>
                    <h4 className="text-md font-bold text-indigo-400 font-mono">100/100</h4>
                  </div>
                </div>
              )}

              {!isConnected && !isSyncing && (
                <div className="mt-6 border-y border-dashed border-white/5 py-4 flex flex-col items-center justify-center text-center text-slate-600">
                  <Link2 size={16} className="text-slate-600 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Integration Required</span>
                </div>
              )}

              {isSyncing && (
                <div className="mt-6 border-y border-white/5 py-4 flex items-center justify-center text-indigo-400 text-xs font-semibold gap-2">
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Syncing credentials database...</span>
                </div>
              )}

              {/* Bottom buttons */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => handleSync(idx)}
                  disabled={!isConnected || isSyncing}
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <RefreshCw size={11} className={isSyncing ? "animate-spin" : ""} />
                  <span>Sync Data</span>
                </button>
                
                <button
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Settings2 size={11} />
                  <span>Configure Settings</span>
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
