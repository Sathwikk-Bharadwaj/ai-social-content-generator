import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/client";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Zap } from "lucide-react";
import BackgroundParticles from "../components/BackgroundParticles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await apiClient.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/"); // Redirect to root protected dashboard
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Background Interactive Particles */}
      <BackgroundParticles />

      {/* Grid overlay */}
      <div className="cyber-grid absolute inset-0 pointer-events-none z-0" />

      {/* Floating backlights */}
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel z-10 w-full max-w-md p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-950/40 backdrop-blur-xl shadow-2xl relative"
      >
        {/* Portal scanner light effect */}
        <div className="portal-sweep absolute inset-0 rounded-3xl" />

        {/* Header Logo */}
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 mb-3">
            <Zap className="h-6 w-6 text-white animate-pulse" />
          </div>
          <h1 className="bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 dark:from-white dark:via-slate-200 dark:to-indigo-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            Welcome to Content AI
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 text-center font-display">
            The next-generation operating system for content creators
          </p>
        </div>

        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-300 text-xs text-center font-medium"
          >
            {errorMsg}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          {/* Email field */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-450 group-focus-within:text-indigo-650 transition-colors" />
              <input
                type="email"
                placeholder="name@agency.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-550 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-950/40 focus:ring-4 focus:ring-indigo-500/10 transition-all font-sans"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <div className="flex items-center justify-between pl-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
              <a href="#" className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold transition-colors">Forgot password?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-455 group-focus-within:text-indigo-650 transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-200 placeholder-slate-450 dark:placeholder-slate-550 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-950/40 focus:ring-4 focus:ring-indigo-500/10 transition-all font-sans"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer relative group overflow-hidden border border-white/10"
          >
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            
            {isLoading ? (
              <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={16} />
                <span>Enter Terminal</span>
              </>
            )}
          </button>
        </form>

        {/* Register link */}
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6 relative z-10 font-display">
          New to the system?{" "}
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
            Initialize Access Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
