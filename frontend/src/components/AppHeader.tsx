import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
    <header className="bg-primary text-primary-foreground">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-accent text-accent-foreground p-2.5 rounded-lg">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-sans tracking-tight">Room Booking System</h1>
            <p className="text-xs text-primary-foreground/70">
              Jaypee University of Information Technology, Waknaghat
            </p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-primary-foreground/70">{user.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary-foreground/10 p-2 rounded-lg sm:hidden">
                <User className="w-4 h-4" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
