import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Role, ROLES, ROLE_ROUTES } from "@/types/booking";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, LogIn, UserCircle, Shield, ClipboardCheck, Settings, Stamp } from "lucide-react";

const ROLE_META: Record<Role, { icon: typeof UserCircle; description: string }> = {
  "Faculty (Requester)": { icon: UserCircle, description: "Create and submit room booking requests" },
  "Faculty (Approver)": { icon: ClipboardCheck, description: "View and track all submitted requests" },
  "HOD": { icon: Shield, description: "Approve or reject department requests" },
  "Admin Officer": { icon: Settings, description: "Verify availability and process bookings" },
  "Registrar": { icon: Stamp, description: "Final approval authority with comments" },
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center gap-4">
          <div className="bg-accent text-accent-foreground p-3 rounded-xl">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-sans tracking-tight">Room Booking System</h1>
            <p className="text-sm text-primary-foreground/70">
              Jaypee University of Information Technology, Waknaghat
            </p>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-sans">Welcome</CardTitle>
            <CardDescription>Sign in to access the Room Booking System</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <div className="space-y-3">
              <Label>Select Your Role</Label>
              <div className="grid gap-2">
                {ROLES.map((role) => {
                  const meta = ROLE_META[role];
                  const Icon = meta.icon;
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      onClick={() => { setSelectedRole(role); setError(""); }}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30 hover:bg-muted/50"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>{role}</p>
                        <p className="text-xs text-muted-foreground">{meta.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button onClick={handleLogin} className="w-full" size="lg">
              <LogIn className="w-4 h-4 mr-2" /> Sign In
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
