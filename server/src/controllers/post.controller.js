import mongoose from "mongoose";
import Post from "../models/Post.js";

const isDbConnected = () => mongoose.connection.readyState === 1;

// In-memory store fallback for offline database mode
let memoryPosts = [
  {
    _id: "demo-1",
    title: "Q2 Product Feature Launch",
    content: "Exciting update coming! We have successfully integrated a functional dashboard architecture using modern CSS. Check it out.",
    platform: "linkedin",
    status: "draft",
    tone: "professional",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-2",
    title: "Design Systems Thread",
    content: "Design systems are NOT static assets. They are living API contracts between code and style. 🧵👇",
    platform: "twitter",
    status: "review",
    tone: "witty",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-3",
    title: "Glassmorphism Art Reveal",
    content: "Modern styling highlights. What do you think about dark mode glassmorphism?",
    platform: "instagram",
    status: "approved",
    tone: "casual",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-4",
    title: "Agentic Workflows Article",
    content: "The developer's role is shifting. Development is shifting from manual coding to design orchestration.",
    platform: "linkedin",
    status: "scheduled",
    tone: "thought-provoking",
    scheduledTime: "Tomorrow, 10:00 AM",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-5",
    title: "Tailwind v4 Cheat Sheet",
    content: "Tailwind v4 is here! Custom configurations are now handled in standard CSS files.",
    platform: "twitter",
    status: "scheduled",
    tone: "educational",
    scheduledTime: "Friday, 2:00 PM",
    createdAt: new Date().toISOString(),
  },
];

export const createPost = async (req, res) => {
  try {
    const { title, content, platform, tone, status, scheduledTime, tags } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Post content is required" });
    }

    const postData = {
      title: title || `${(platform || "Post").toUpperCase()} - ${new Date().toLocaleDateString()}`,
      content,
      platform: platform || "twitter",
      tone: tone || "witty",
      status: status || "draft",
      scheduledTime: scheduledTime || null,
      tags: tags || [],
    };

    if (isDbConnected()) {
      try {
        const newPost = await Post.create(postData);
        return res.status(201).json({ success: true, post: newPost });
      } catch (err) {
        // Fall back below
      }
    }

    // In-memory fallback
    const fallbackPost = {
      _id: `mem-${Date.now()}`,
      ...postData,
      createdAt: new Date().toISOString(),
    };
    memoryPosts.unshift(fallbackPost);
    return res.status(201).json({ success: true, post: fallbackPost, isOfflineFallback: true });
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ error: "Failed to save post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { platform, status } = req.query;

    if (isDbConnected()) {
      try {
        const query = {};
        if (platform && platform !== "all") query.platform = platform;
        if (status && status !== "all") query.status = status;

        const posts = await Post.find(query).sort({ createdAt: -1 });
        return res.json({ posts: posts.length > 0 ? posts : memoryPosts });
      } catch (err) {
        // Fall back below
      }
    }

    let filtered = [...memoryPosts];
    if (platform && platform !== "all") {
      filtered = filtered.filter((p) => p.platform === platform);
    }
    if (status && status !== "all") {
      filtered = filtered.filter((p) => p.status === status);
    }
    return res.json({ posts: filtered, isOfflineFallback: true });
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const updatePostStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, scheduledTime } = req.body;

    try {
      const updated = await Post.findByIdAndUpdate(
        id,
        { status, ...(scheduledTime && { scheduledTime }) },
        { new: true }
      );
      if (updated) return res.json({ success: true, post: updated });
    } catch (dbErr) {
      // Fallback
    }

    const memPost = memoryPosts.find((p) => p._id === id);
    if (memPost) {
      memPost.status = status;
      if (scheduledTime) memPost.scheduledTime = scheduledTime;
      return res.json({ success: true, post: memPost });
    }

    return res.status(404).json({ error: "Post not found" });
  } catch (err) {
    console.error("Update post error:", err);
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await Post.findByIdAndDelete(id);
    } catch (dbErr) {
      // Fallback
    }

    memoryPosts = memoryPosts.filter((p) => p._id !== id);
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
