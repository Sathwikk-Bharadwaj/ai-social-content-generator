export const generateContent = (req, res) => {
  const { platform, tone, topic, includeEmojis, creativity } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  // Pre-configured premium copy generation based on platform
  const emojis = includeEmojis ? "🚀✨🔥" : "";
  let resultCopy = "";

  if (platform === "twitter") {
    if (tone === "professional") {
      resultCopy = `Important milestones in development. We successfully resolved state management logs and optimized rendering times.\n\nOur system architecture is now standardized. Let's discuss performance targets. ${emojis}`;
    } else if (tone === "witty") {
      resultCopy = `Vibe coding is changing everything. 💻\n\nNo more syntax blockers, just pure intent, custom styling, and rapid iterations. Building this SaaS using Tailwind CSS v4 and Framer Motion in a single session.\n\nHow are you leveraging agentic coding this week? ${emojis}\n\n#VibeCoding #Tailwindv4 #SaaS`;
    } else {
      resultCopy = `Just updated our core copy engines. Topic of the day: ${topic}. Keeping code clean, responsive, and visual. ${emojis}`;
    }
  } else if (platform === "linkedin") {
    if (tone === "professional") {
      resultCopy = `Yesterday, I set out to build an interactive dashboard from scratch. No complex boilerplate, just pure developer intent.\n\nHere's what we built:\n1. Collapsible glassmorphic sidebar layout\n2. GPU-accelerated canvas background animation\n3. Responsive interactive SVG charts\n\nThe takeaway? Development is shifting from manual coding to design orchestration. The speed of iteration is now bounded only by creativity. ${emojis}\n\nHow is your team adapting to the future of AI-driven coding? Let's discuss in the comments below.\n\n#SoftwareEngineering #AI #UserExperience`;
    } else {
      resultCopy = `Exciting news! We are aligning brand-voice parameters directly into the compilation pipelines. \n\nFocusing on: ${topic} with a ${tone} tone constraint. Let's build something interactive today. ${emojis}`;
    }
  } else {
    // Instagram / default
    resultCopy = `The design of the future is glassmorphic. 💎 Smooth borders, ambient lighting overlays, and dynamic particles that follow the cursor.\n\nOur generator is built to help marketing agencies produce highly-converting visual layouts and brand-aligned copies instantly.\n\nSwipe to see details. ${emojis}\n\n#UIDesign #Branding #Copywriting #Topic_${topic.replace(/\s+/g, "")}`;
  }

  res.json({ result: resultCopy });
};
