import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Shield, 
  Activity, 
  Plus, 
  UserCheck, 
  Clock, 
  Sparkles,
  Bot
} from "lucide-react";

export default function Workspace() {
  const members = [
    { name: "Sathwik A", email: "sathwik@agency.com", role: "Workspace Admin", status: "online", avatar: "SA" },
    { name: "Jessica Chen", email: "jess@agency.com", role: "Copy Editor", status: "offline", avatar: "JC" },
    { name: "David Kim", email: "david@agency.com", role: "SEO Optimizer", status: "online", avatar: "DK" }
  ];

  const logs = [
    { time: "10m ago", user: "Sathwik A", action: "Generated Instagram copy for campaign 'Brand Reveal'", type: "ai" },
    { time: "2h ago", user: "Jessica Chen", action: "Approved Twitter thread structure for review", type: "system" },
    { time: "1d ago", user: "David Kim", action: "Linked LinkedIn Professional account integration", type: "connection" }
  ];

  return (
    <div className="space-y-8 relative z-10">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Team Workspace</h1>
          <p className="text-slate-400 text-xs mt-1">Manage workspace collaboration, assign permission roles, and track audit feeds</p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 active:scale-[0.98] transition-all cursor-pointer">
          <Plus size={14} />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Member Management (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display flex items-center gap-2">
              <Users size={16} className="text-indigo-400" />
              Active Workspace Members
            </h3>

            <div className="divide-y divide-white/5">
              {members.map((member) => (
                <div key={member.email} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center font-bold text-xs text-indigo-400">
                      {member.avatar}
                      <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-slate-900 ${member.status === "online" ? "bg-emerald-500" : "bg-slate-600"}`} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{member.name}</h4>
                      <p className="text-[10px] text-slate-500">{member.email}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 bg-white/5 border border-white/5 rounded-md px-2 py-0.8 flex items-center gap-1 font-mono">
                    <Shield size={10} className="text-indigo-400" />
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Activity log (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display flex items-center gap-2">
              <Activity size={16} className="text-indigo-400" />
              Workspace Activity logs
            </h3>

            <div className="space-y-4">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-3 text-xs last:pb-0">
                  <div className="mt-0.5">
                    {log.type === "ai" ? (
                      <Sparkles size={13} className="text-indigo-400" />
                    ) : log.type === "connection" ? (
                      <UserCheck size={13} className="text-cyan-400" />
                    ) : (
                      <Clock size={13} className="text-slate-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      <span className="font-bold text-slate-200">{log.user}</span> {log.action}
                    </p>
                    <span className="text-[9px] font-mono text-slate-500 mt-1.5 block">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
