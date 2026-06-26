import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, Zap } from "lucide-react";
import BackgroundParticles from "../components/BackgroundParticles";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registration failed. Try using a different email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-slate-950 overflow-hidden text-slate-100 font-sans">
      {/* Background Interactive Particles */}
      <BackgroundParticles />

      {/* Grid overlay */}
      <div className="cyber-grid absolute inset-0 pointer-events-none z-0" />

      {/* Floating backlights */}
      <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel z-10 w-full max-w-md p-8 rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl shadow-2xl relative"
      >
        {/* Portal scanner light effect */}
        <div className="portal-sweep absolute inset-0 rounded-3xl" />

        {/* Header Logo */}
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 mb-3">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            Create Access Credentials
          </h1>
          <p className="text-slate-400 text-xs mt-1 text-center font-display">
            Initialize your AI-driven social content dashboard
          </p>
        </div>

        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-300 text-xs text-center font-medium"
          >
            {errorMsg}
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 relative z-10">
          {/* Email field */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="email"
                placeholder="name@agency.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-slate-950/40 focus:ring-4 focus:ring-indigo-500/10 transition-all font-sans"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Choose Password</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-slate-950/40 focus:ring-4 focus:ring-indigo-500/10 transition-all font-sans"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Confirm Password field */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Confirm Password</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-slate-950/40 focus:ring-4 focus:ring-indigo-500/10 transition-all font-sans"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                <UserPlus size={16} />
                <span>Initialize Platform Account</span>
              </>
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="text-xs text-center text-slate-500 mt-6 relative z-10 font-display">
          Already registered?{" "}
          <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
            Access Account Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
