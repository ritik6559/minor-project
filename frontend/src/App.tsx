import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import RoleDashboard from "./pages/RoleDashboard";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faculty" element={<ProtectedRoute allowedRole="Faculty (Requester)"><RoleDashboard role="Faculty (Requester)" /></ProtectedRoute>} />
            <Route path="/approver" element={<ProtectedRoute allowedRole="Faculty (Approver)"><RoleDashboard role="Faculty (Approver)" /></ProtectedRoute>} />
            <Route path="/hod" element={<ProtectedRoute allowedRole="HOD"><RoleDashboard role="HOD" /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute allowedRole="Admin Officer"><RoleDashboard role="Admin Officer" /></ProtectedRoute>} />
            <Route path="/registrar" element={<ProtectedRoute allowedRole="Registrar"><RoleDashboard role="Registrar" /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
