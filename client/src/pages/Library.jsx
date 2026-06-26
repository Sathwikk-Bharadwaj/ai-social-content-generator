import { motion } from "framer-motion";

export default function Library() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">My Library</h1>

      <p className="text-gray-500 dark:text-gray-400">
        Your saved AI-generated content will appear here.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow text-center text-gray-400">
        No saved content yet.
      </div>
    </motion.div>
  );
}
