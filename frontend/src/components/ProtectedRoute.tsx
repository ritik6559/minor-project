import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Role, ROLE_ROUTES } from "@/types/booking";

interface ProtectedRouteProps {
  allowedRole: Role;
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRole, children }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to={ROLE_ROUTES[user.role]} replace />;
  }

  return <>{children}</>;
}
