import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut, User } from "lucide-react";

export function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="hero-gradient rounded-lg p-1.5">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold hidden sm:inline">JUIT RoomBook</span>
        </Link>
        {user && (
          <span className="text-sm text-muted-foreground ml-2 hidden sm:inline">
            / {user.role} Dashboard
          </span>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
            <User className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium hidden sm:inline">{user.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground h-8 px-2.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="ml-1.5 hidden sm:inline text-xs">Logout</span>
          </Button>
        </div>
      )}
    </header>
  );
}
