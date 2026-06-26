import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function AppShell() {
  const location = useLocation();

  return (
    <div className="h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </div>
  );
}
