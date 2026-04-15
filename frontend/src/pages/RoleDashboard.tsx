import { useState, useEffect, useCallback } from "react";
import { BookingRequest, Role, View } from "@/types/booking";
import { storageList, storageGet, storageSet, storageDel } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { AppHeader } from "@/components/AppHeader";
import { Dashboard } from "@/components/Dashboard";
import { NewRequestForm } from "@/components/NewRequestForm";
import { DetailView } from "@/components/DetailView";
import { PreviewForm } from "@/components/PreviewForm";
import {
  Loader2,
  GraduationCap,
  Home,
  Calendar,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface RoleDashboardProps {
  role: Role;
}

const sidebarLinks = [
  { icon: Home, label: "Dashboard" },
  { icon: Calendar, label: "New Booking" },
  { icon: History, label: "History" },
  { icon: Settings, label: "Settings" },
];

export default function RoleDashboard({ role }: RoleDashboardProps) {
  const { user } = useAuth();
  const [view, setView] = useState<View>("dashboard");
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    (async () => {
      const keys = await storageList("req:");
      const items: BookingRequest[] = [];
      for (const k of keys) {
        const d = await storageGet<BookingRequest>(k);
        if (d) items.push(d);
      }
      setRequests(items.sort((a, b) => b.createdAt - a.createdAt));
      setLoaded(true);
    })();
  }, []);

  const saveRequest = useCallback(async (req: BookingRequest) => {
    await storageSet("req:" + req.id, req);
    setRequests((prev) => {
      const idx = prev.findIndex((r) => r.id === req.id);
      return idx >= 0 ? prev.map((r, i) => (i === idx ? req : r)) : [req, ...prev];
    });
  }, []);

  const deleteRequest = useCallback(async (id: string) => {
    await storageDel("req:" + id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setView("dashboard");
    setSelectedId(null);
  }, []);

  const selectedReq = requests.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-60" : "w-16"
        } bg-sidebar-background text-sidebar-foreground transition-all duration-300 flex flex-col border-r border-sidebar-border md:flex`}
      >
        <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
          <div className="hero-gradient rounded-lg p-1.5 shrink-0">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          {sidebarOpen && <span className="font-bold text-sm">JUIT RoomBook</span>}
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 mx-2 mt-2 rounded-lg hover:bg-sidebar-accent transition-colors self-end"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        <nav className="flex-1 p-2 space-y-1">
          {sidebarLinks.map((link, i) => {
            const active = (i === 0 && view === "dashboard") || (i === 1 && view === "new");
            return (
              <button
                key={link.label}
                onClick={() => {
                  if (i === 0) { setView("dashboard"); setSelectedId(null); }
                  else if (i === 1 && role === "Faculty (Requester)") setView("new");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span>{link.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          {sidebarOpen && (
            <div className="text-xs text-sidebar-foreground/50">
              <p className="font-medium text-sidebar-foreground/70">{user?.name}</p>
              <p>{role}</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto flex flex-col">
        <AppHeader />

        <div className="flex-1 p-6">
          {!loaded ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
              <p className="text-sm text-muted-foreground font-medium">Loading requests…</p>
            </div>
          ) : view === "dashboard" ? (
            <Dashboard
              requests={requests}
              role={role}
              onOpen={(id) => { setSelectedId(id); setView("detail"); }}
              onNew={() => setView("new")}
            />
          ) : view === "new" ? (
            <NewRequestForm
              onSubmit={async (req) => {
                await saveRequest(req);
                setSelectedId(req.id);
                setView("detail");
              }}
              onCancel={() => setView("dashboard")}
            />
          ) : view === "detail" && selectedReq ? (
            <DetailView
              req={selectedReq}
              role={role}
              userName={user?.name ?? ""}
              onUpdate={saveRequest}
              onDelete={deleteRequest}
              onPreview={() => setView("preview")}
              onBack={() => setView("dashboard")}
            />
          ) : view === "preview" && selectedReq ? (
            <PreviewForm req={selectedReq} onBack={() => setView("detail")} />
          ) : null}
        </div>
      </main>
    </div>
  );
}
