import { motion } from "framer-motion";

const portalVariants = {
  initial: {
    opacity: 0,
    scale: 0.94,
    y: 40,
    rotateX: 10,
    z: -100,
    filter: "blur(10px) brightness(1.5)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    z: 0,
    filter: "blur(0px) brightness(1)",
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1], // Custom premium elastic-out deceleration
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    y: -35,
    rotateX: -8,
    z: 50,
    filter: "blur(8px) brightness(0.8)",
    transition: {
      duration: 0.45,
      ease: [0.7, 0, 0.84, 0], // Smooth acceleration out
    },
  },
};

export default function PageTransition({ children }) {
  return (
    <div className="min-h-full w-full relative" style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
      {/* Animated Portal sweep light bar that runs once across the screen on entry */}
      <motion.div 
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="portal-sweep absolute inset-0 pointer-events-none"
      />

      <motion.div
        variants={portalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
