import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import SidebarLayout from "./layouts/SidebarLayout";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import ContentStudio from "./pages/ContentStudio";
import Library from "./pages/Library";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import BrandKit from "./pages/BrandKit";
import SocialAccounts from "./pages/SocialAccounts";
import Templates from "./pages/Templates";
import Workspace from "./pages/Workspace";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTransition from "./components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Shell */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          } />
          
          <Route path="generate" element={
            <PageTransition>
              <Generate />
            </PageTransition>
          } />

          <Route path="studio" element={
            <PageTransition>
              <ContentStudio />
            </PageTransition>
          } />

          <Route path="library" element={
            <PageTransition>
              <Library />
            </PageTransition>
          } />

          <Route path="calendar" element={
            <PageTransition>
              <Calendar />
            </PageTransition>
          } />

          <Route path="analytics" element={
            <PageTransition>
              <Analytics />
            </PageTransition>
          } />

          <Route path="brand-kit" element={
            <PageTransition>
              <BrandKit />
            </PageTransition>
          } />

          <Route path="social-accounts" element={
            <PageTransition>
              <SocialAccounts />
            </PageTransition>
          } />

          <Route path="templates" element={
            <PageTransition>
              <Templates />
            </PageTransition>
          } />

          <Route path="workspace" element={
            <PageTransition>
              <Workspace />
            </PageTransition>
          } />

          <Route path="settings" element={
            <PageTransition>
              <Settings />
            </PageTransition>
          } />
        </Route>

        {/* Wildcard Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
