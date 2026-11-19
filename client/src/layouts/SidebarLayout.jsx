import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  Calendar as CalendarIcon,
  BarChart3,
  Palette,
  Share2,
  FileText,
  Users,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sun,
  Moon,
  Zap,
  BookmarkCheck
} from "lucide-react";
import BackgroundParticles from "../components/BackgroundParticles";
import { useTheme } from "../context/ThemeContext";

export default function SidebarLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/generate", label: "AI Generator", icon: Sparkles },
    { to: "/studio", label: "Content Studio", icon: Layers },
    { to: "/library", label: "Library", icon: BookmarkCheck },
    { to: "/calendar", label: "Calendar", icon: CalendarIcon },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/brand-kit", label: "Brand Kit", icon: Palette },
    { to: "/social-accounts", label: "Social Accounts", icon: Share2 },
    { to: "/templates", label: "Templates", icon: FileText },
    { to: "/workspace", label: "Workspace", icon: Users },
    { to: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#070913] text-slate-900 dark:text-slate-100 relative transition-colors duration-300">
      {/* Background Interactive Particles */}
      <BackgroundParticles />

      {/* Cyber Grid Background Detail */}
      <div className="cyber-grid absolute inset-0 pointer-events-none z-0" />

      {/* Futuristic Ambient Glow Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 88 : 280 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel relative z-20 m-5 mr-0 flex flex-col h-[calc(100vh-2.5rem)] rounded-3xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-950/40 p-4 backdrop-blur-xl shadow-lg shrink-0"
      >
        {/* Sidebar Header */}
        <div className="flex h-14 items-center justify-between px-3">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
                  <Zap className="h-4.5 w-4.5 text-white animate-pulse" />
                </div>
                <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-lg font-bold tracking-wide text-transparent">
                  Content AI
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
              <Zap className="h-4.5 w-4.5 text-white" />
            </div>
          )}

          {/* Collapse/Expand Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Brand/Workspace selector (Quick mock) */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 px-3"
          >
            <div className="flex items-center justify-between rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-2 px-3 hover:bg-slate-200/60 dark:hover:bg-white/8 transition-colors cursor-pointer group">
              <div className="flex flex-col">
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">Active Workspace</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white">Aura Creative Agency</span>
              </div>
              <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.div>
        )}

        {/* Navigation Items */}
        <nav className="mt-8 flex-1 space-y-1.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all group relative overflow-hidden ${
                    isActive
                      ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-200 shadow-inner"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active highlight glow background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 pointer-events-none rounded-xl"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <Icon
                      size={18}
                      className={`relative z-10 transition-all duration-300 ${
                        isActive 
                          ? "text-indigo-600 dark:text-indigo-400 scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]" 
                          : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 group-hover:scale-105"
                      }`}
                    />

                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="relative z-10 whitespace-nowrap overflow-hidden font-display"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Tooltip for collapsed mode */}
                    {isCollapsed && (
                      <div className="absolute left-20 z-50 rounded-lg bg-slate-900 border border-slate-200 dark:border-white/10 px-2 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                        {item.label}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="mt-auto border-t border-slate-200 dark:border-white/5 pt-4 px-2 space-y-2">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all group relative cursor-pointer"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            {!isCollapsed && <span className="text-sm font-medium">Theme Mode</span>}
            {isCollapsed && (
              <div className="absolute left-20 z-50 rounded-lg bg-slate-900 border border-slate-200 dark:border-white/10 px-2 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Theme Mode
              </div>
            )}
          </button>

          {/* User Profile Card / LogOut */}
          <div className={`flex items-center gap-3 px-1 ${isCollapsed ? "justify-center" : "justify-between"}`}>
            {!isCollapsed && (
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="relative h-8 w-8 rounded-full border border-indigo-500/20 dark:border-indigo-500/30 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">
                  SA
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-slate-900" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Sathwik A</span>
                  <span className="text-[10px] text-slate-500 truncate">Pro Account</span>
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="relative h-8 w-8 rounded-full border border-indigo-500/20 dark:border-indigo-500/30 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                SA
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-slate-900" />
              </div>
            )}

            <button
              onClick={handleLogout}
              className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Panel */}
      <main className="flex-1 m-5 ml-0 flex flex-col min-h-0 h-[calc(100vh-2.5rem)] overflow-hidden glass-panel border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 rounded-3xl z-10 relative">
        <div className="flex-1 min-h-0 overflow-y-auto p-8 relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
