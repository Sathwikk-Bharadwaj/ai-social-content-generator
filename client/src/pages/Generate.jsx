import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../api/client";
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  RotateCcw, 
  Smile, 
  Compass, 
  Eye, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Sliders,
  Maximize2,
  Minimize2,
  TrendingUp,
  FileText,
  Bot,
  BookmarkPlus
} from "lucide-react";

export default function Generate() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // States
  const [topic, setTopic] = useState(searchParams.get("topic") || "");
  const [platform, setPlatform] = useState(searchParams.get("platform") || "twitter");
  const [tone, setTone] = useState("witty");
  const [creativity, setCreativity] = useState(80);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [brandKit, setBrandKit] = useState("default");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedContent, setGeneratedContent] = useState("");
  const [displayedContent, setDisplayedContent] = useState(""); // For typing effect
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activePreview, setActivePreview] = useState("twitter");

  // Pipeline stepper steps
  const steps = [
    "Analyzing context & trend relevance",
    "Structuring structural logic & outline",
    "Optimizing brand copy & styling voice",
    "Auditing SEO metrics & reach score",
    "Polishing layout & metadata templates"
  ];

  // Scoring attributes
  const [scores, setScores] = useState({
    readability: 0,
    engagement: 0,
    seo: 0,
    sentiment: "Neutral"
  });

  // Watch query params
  useEffect(() => {
    const qTopic = searchParams.get("topic");
    const qPlatform = searchParams.get("platform");
    if (qTopic) setTopic(qTopic);
    if (qPlatform) {
      setPlatform(qPlatform);
      setActivePreview(qPlatform);
    }
  }, [location.search]);

  // Simulation typing effect
  useEffect(() => {
    if (!generatedContent) return;
    setDisplayedContent("");
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedContent((prev) => prev + generatedContent.charAt(index));
      index++;
      if (index >= generatedContent.length) {
        clearInterval(interval);
      }
    }, 12); // fast typewriter
    return () => clearInterval(interval);
  }, [generatedContent]);

  // Copy helper
  const handleCopy = () => {
    navigator.clipboard.writeText(displayedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save to Studio helper
  const handleSaveToStudio = async () => {
    if (!displayedContent || isSaving) return;
    setIsSaving(true);
    try {
      await apiClient.post("/api/posts", {
        title: topic || `${platform.toUpperCase()} Post`,
        content: displayedContent,
        platform,
        tone,
        status: "draft",
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setCurrentStep(0);
    setGeneratedContent("");
    setDisplayedContent("");
    
    // Simulate pipeline stepper
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setCurrentStep(i + 1);
    }

    try {
      // API request to backend
      const res = await apiClient.post("/api/generate", {
        platform,
        tone,
        topic,
        includeEmojis,
        creativity
      });
      
      let finalOutput = res.data.result;
      
      // Enhance mock details if backend returns generic strings
      if (res.data.result.startsWith("This is a")) {
        const emojiSymbol = includeEmojis ? "✨🚀" : "";
        if (platform === "twitter") {
          finalOutput = `Vibe coding is changing everything. 💻\n\nNo more syntax blockers, just pure intent, custom styling, and rapid iterations. Building this SaaS using Tailwind CSS v4 and Framer Motion in a single session. \n\nHow are you leveraging agentic coding this week? ${emojiSymbol}\n\n#VibeCoding #Tailwindv4 #SaaS`;
        } else if (platform === "linkedin") {
          finalOutput = `Yesterday, I set out to build an interactive dashboard from scratch. No complex boilerplate, just pure developer intent.\n\nHere's what we built:\n1. Collapsible glassmorphic sidebar layout\n2. GPU-accelerated canvas background animation\n3. Responsive interactive SVG charts\n\nThe takeaway? Development is shifting from manual coding to design orchestration. The speed of iteration is now bounded only by creativity. ${emojiSymbol}\n\nHow is your team adapting to the future of AI-driven coding? Let's discuss in the comments below.\n\n#SoftwareEngineering #AI #UserExperience`;
        } else {
          finalOutput = `The design of the future is glassmorphic. 💎 Smooth borders, ambient lighting overlays, and dynamic particles that follow the cursor. \n\nOur generator is built to help marketing agencies produce highly-converting visual layouts and brand-aligned copies instantly. \n\nSwipe to see details. ${emojiSymbol}\n\n#UIDesign #Branding #Copywriting`;
        }
      }

      setGeneratedContent(finalOutput);
      
      setScores({
        readability: Math.floor(Math.random() * 15) + 82,
        engagement: Math.floor(Math.random() * 20) + 78,
        seo: Math.floor(Math.random() * 12) + 85,
        sentiment: tone === "professional" ? "Confident" : tone === "witty" ? "Positive" : "Energetic"
      });
    } catch (err) {
      const mockResult = `Failed to connect to backend server, loaded emergency fallback content.\n\nTopic: ${topic}\nTone: ${tone}\nPlatform: ${platform}\n\n"The future is built on interactive layouts. Design isn't just how it looks, it's how it feels." ✨`;
      setGeneratedContent(mockResult);
      setScores({ readability: 78, engagement: 82, seo: 80, sentiment: "Positive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = (action) => {
    if (!displayedContent) return;
    setIsGenerating(true);
    setTimeout(() => {
      let refined = displayedContent;
      if (action === "shorten") {
        refined = refined.split("\n")[0] + " 🚀 #SaaS";
      } else if (action === "expand") {
        refined = refined + "\n\nAdditionally, implementing responsive configurations ensures standard viewing compliance across desktop and mobile devices. Let me know your feedback!";
      } else if (action === "emojis") {
        refined = "🔥💡 " + refined.replace(/\n/g, " ⚡\n") + " 🔥";
      } else if (action === "professional") {
        refined = `We have successfully integrated a functional dashboard architecture using modern CSS. We will continue optimizing performance metrics.`;
      }
      setGeneratedContent(refined);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-8 relative z-10 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-white/5 pb-4">
        <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white">AI Content Engine</h1>
        <p className="text-slate-650 dark:text-slate-400 text-xs mt-1">Orchestrate custom posts, select voice parameters, and optimize reach</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Parameters Editor Form (5 cols) */}
        <form onSubmit={handleGenerate} className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 space-y-5">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-display flex items-center gap-2">
              <Sliders size={15} className="text-indigo-650 dark:text-indigo-400" />
              Generator Parameters
            </h3>

            {/* Prompt Editor */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider pl-1">What is your post about?</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Describe your topic, trend, or outline (e.g. sharing details about launching our new design toolkit)..."
                className="w-full h-32 p-3 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-950/40 focus:ring-4 focus:ring-indigo-500/10 transition-all font-sans"
                required
              />
            </div>

            {/* Platform Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-555 dark:text-slate-450 uppercase tracking-wider pl-1">Target Channel</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "twitter", label: "X / Twitter", icon: Twitter, color: "text-sky-400" },
                  { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-blue-500" },
                  { id: "instagram", label: "Instagram", icon: Instagram, color: "text-pink-400" }
                ].map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setPlatform(p.id);
                        setActivePreview(p.id);
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                        platform === p.id
                          ? "bg-indigo-600/15 border-indigo-500/50 text-indigo-750 dark:text-indigo-200"
                          : "bg-slate-100/50 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:bg-slate-200/50 dark:hover:bg-white/8 hover:border-slate-300 dark:hover:border-white/10 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <Icon size={16} className={`${p.color} mb-1`} />
                      <span className="text-[10px] font-semibold">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tone Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-555 dark:text-slate-450 uppercase tracking-wider pl-1">Tone & Character</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-300 text-xs focus:outline-none focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-950/40 transition-all cursor-pointer font-sans"
              >
                <option value="professional">🏢 Professional & Confident</option>
                <option value="witty">✨ Creative & Witty</option>
                <option value="casual">☕ Casual & Approachable</option>
                <option value="bold">🔥 Bold & Inspiring</option>
                <option value="educational">🧠 Informative & Technical</option>
              </select>
            </div>

            {/* Slider Creativity */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center pl-1 text-[11px] font-bold text-slate-555 dark:text-slate-450 uppercase">
                <span>Creativity Level</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{creativity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={creativity}
                onChange={(e) => setCreativity(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-950/60 rounded-lg appearance-none border border-slate-200 dark:border-white/5"
              />
            </div>

            {/* Emojis & Brand Kit Toggles */}
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-4 text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="emojis"
                  checked={includeEmojis}
                  onChange={(e) => setIncludeEmojis(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 dark:border-white/5 bg-slate-100 dark:bg-white/5 text-indigo-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="emojis" className="text-slate-700 dark:text-slate-300 font-semibold cursor-pointer select-none">Include Emojis</label>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 dark:text-slate-500 font-bold uppercase text-[9px]">Brand Voice</span>
                <select 
                  value={brandKit} 
                  onChange={(e) => setBrandKit(e.target.value)}
                  className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg px-2.5 py-1 text-[10px] text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="default">Aura Creative</option>
                  <option value="minimal">Minimalist Tech</option>
                  <option value="enterprise">Corporate HQ</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
            >
              <Sparkles size={16} className="animate-pulse" />
              <span>Compile Copywriting</span>
            </button>
          </div>
        </form>

        {/* Right Side: Visual Output, Previews & Stepper (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Output Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 flex flex-col min-h-[420px] relative overflow-hidden">
            
            {isGenerating && <div className="portal-sweep absolute inset-0" />}

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Bot size={13} />
                </div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider font-display">Generation Terminal</h3>
              </div>

              {/* Utility Buttons */}
              <div className="flex items-center gap-2">
                {displayedContent && (
                  <>
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5 font-semibold"
                    >
                      {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                      onClick={handleSaveToStudio}
                      disabled={isSaving}
                      className="p-2 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer text-xs flex items-center gap-1.5 font-semibold"
                      title="Save to Content Studio"
                    >
                      {saved ? <Check size={13} className="text-emerald-500" /> : <BookmarkPlus size={13} />}
                      <span>{saved ? "Saved to Studio" : isSaving ? "Saving..." : "Save to Studio"}</span>
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                      title="Recompile"
                    >
                      <RotateCcw size={13} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Content Display Panel */}
            <div className="flex-1 flex flex-col justify-center">
              
              {/* Active Pipeline Stepper */}
              {isGenerating && (
                <div className="space-y-4 max-w-sm mx-auto">
                  <p className="text-center text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider animate-pulse flex items-center justify-center gap-2">
                    <span className="h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    Assembling Content...
                  </p>
                  
                  <div className="space-y-2.5 pt-4">
                    {steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs">
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center font-bold text-[9px] transition-colors ${
                          currentStep > idx
                            ? "bg-emerald-500 border-emerald-400 text-white"
                            : currentStep === idx
                              ? "bg-indigo-600 border-indigo-400 text-white shadow-[0_0_8px_rgba(99,102,241,1)]"
                              : "bg-slate-200 dark:bg-slate-900 border-slate-350 dark:border-white/5 text-slate-500"
                        }`}>
                          {currentStep > idx ? "✓" : idx + 1}
                        </div>
                        <span className={`font-semibold ${
                          currentStep >= idx ? "text-slate-800 dark:text-slate-200" : "text-slate-400 dark:text-slate-600"
                        }`}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Typed Copy Area */}
              {!isGenerating && displayedContent && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 rounded-2xl min-h-[160px] text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-sans select-all">
                    {displayedContent}
                  </div>

                  {/* Refinement Toolbar */}
                  <div className="border-t border-slate-200 dark:border-white/5 pt-4 flex flex-wrap gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    {["shorten", "expand", "emojis", "professional"].map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => handleRefine(action)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer uppercase"
                      >
                        {action === "emojis" ? "Add Emojis" : action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Initial Empty View */}
              {!isGenerating && !displayedContent && (
                <div className="text-center py-12 text-slate-500 space-y-3">
                  <Bot size={40} className="mx-auto text-slate-400" />
                  <p className="text-xs font-semibold max-w-xs mx-auto leading-relaxed">
                    Adjust copy configuration and trigger compilation. High-converting drafts will output here.
                  </p>
                </div>
              )}
            </div>

            {/* Score Widgets at the bottom */}
            {!isGenerating && displayedContent && (
              <div className="mt-auto border-t border-slate-200 dark:border-white/5 pt-6 grid grid-cols-4 gap-4 text-center">
                {[
                  { label: "Engagement", val: scores.engagement, color: "text-indigo-600 dark:text-indigo-400" },
                  { label: "Readability", val: scores.readability, color: "text-cyan-600 dark:text-cyan-405" },
                  { label: "SEO Score", val: scores.seo, color: "text-pink-600 dark:text-pink-400" },
                  { label: "Sentiment", val: scores.sentiment, color: "text-emerald-600 dark:text-emerald-400", isTxt: true }
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider font-display">{item.label}</span>
                    <p className={`text-md font-extrabold font-mono ${item.color}`}>
                      {item.isTxt ? item.val : `${item.val}%`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Social Mockup Preview Card */}
          {!isGenerating && displayedContent && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-3">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Eye size={12} />
                  Live Platform Preview Rendering
                </span>
                
                {/* Platform select mini-tabs */}
                <div className="flex rounded-lg bg-slate-200/60 dark:bg-slate-950/60 p-0.5 text-[10px] font-bold">
                  {["twitter", "linkedin", "instagram"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActivePreview(tab)}
                      className={`px-2 py-1 rounded transition-colors uppercase cursor-pointer ${
                        activePreview === tab ? "bg-indigo-600 text-white shadow-sm" : "text-slate-550 dark:text-slate-500 hover:text-slate-905"
                      }`}
                    >
                      {tab === "twitter" ? "X" : tab === "linkedin" ? "LN" : "IG"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed Card Mockup */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-4 rounded-xl text-xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-650 dark:text-indigo-400 flex items-center justify-center font-bold font-mono">SA</div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-slate-200">Sathwik A</h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {activePreview === "twitter" ? "@sathwik_design" : "UX Designer"}
                    </p>
                  </div>
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{displayedContent}</p>
              </div>
            </motion.div>
          )}
        </div>

      </div>

    </div>
  );
}
