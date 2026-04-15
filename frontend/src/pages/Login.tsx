import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Role, ROLES, ROLE_ROUTES } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  LogIn,
  UserCircle,
  Shield,
  ClipboardCheck,
  Settings,
  Stamp,
  CheckCircle2,
} from "lucide-react";

const ROLE_META: Record<Role, { icon: typeof UserCircle; description: string }> = {
  "Faculty (Requester)": {
    icon: UserCircle,
    description: "Create and submit room booking requests",
  },
  "Faculty (Approver)": {
    icon: ClipboardCheck,
    description: "View and track all submitted requests",
  },
  HOD: {
    icon: Shield,
    description: "Approve or reject department requests",
  },
  "Admin Officer": {
    icon: Settings,
    description: "Verify availability and process bookings",
  },
  Registrar: {
    icon: Stamp,
    description: "Final approval authority with comments",
  },
};

export default function Login() {
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!selectedRole) {
      setError("Please select your role.");
      return;
    }
    login(name.trim(), selectedRole);
    navigate(ROLE_ROUTES[selectedRole]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="hero-gradient rounded-lg p-2">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">JUIT RoomBook</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to access your personalized dashboard
          </p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="space-y-5">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="h-11"
              />
            </div>

            <div className="space-y-2.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Select Your Role
              </Label>
              <div className="grid gap-2">
                {ROLES.map((role) => {
                  const meta = ROLE_META[role];
                  const Icon = meta.icon;
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      onClick={() => { setSelectedRole(role); setError(""); }}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/30 hover:bg-muted/30"
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${
                        isSelected ? "hero-gradient text-primary-foreground" : "bg-primary/10 text-primary"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold transition-colors ${
                          isSelected ? "text-primary" : "text-foreground"
                        }`}>
                          {role}
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-tight">{meta.description}</p>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full h-11 text-sm font-semibold hero-gradient text-primary-foreground hover:opacity-90"
              size="lg"
            >
              <LogIn className="w-4 h-4 mr-2" /> Sign In
            </Button>

            <p className="text-center text-[11px] text-muted-foreground">
              This is a demo — no password required
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
