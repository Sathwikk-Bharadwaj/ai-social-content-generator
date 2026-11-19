import { motion } from "framer-motion";

const portalVariants = {
  initial: {
    opacity: 0,
    scale: 0.97,
    y: 20,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    y: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.35,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

export default function PageTransition({ children }) {
  return (
    <div className="min-h-full w-full relative">
      <motion.div
        variants={portalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
