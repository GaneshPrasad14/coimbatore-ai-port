import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PortfolioManagement from "./pages/admin/PortfolioManagement";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import VelocityWrapper from "@/components/VelocityWrapper";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/portfolio"
          element={
            <ProtectedRoute>
              <PortfolioManagement />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

import CustomCursor from "@/components/CustomCursor";

// ... imports

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="noise-overlay" />
      <CustomCursor />
      {/* Removed VideoPreloader */}
      <Toaster />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <VelocityWrapper>
          <AnimatedRoutes />
        </VelocityWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
