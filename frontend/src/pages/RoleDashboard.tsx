import { useState, useEffect, useCallback } from "react";
import { BookingRequest, Role, View } from "@/types/booking";
import { storageList, storageGet, storageSet, storageDel } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { AppHeader } from "@/components/AppHeader";
import { Dashboard } from "@/components/Dashboard";
import { NewRequestForm } from "@/components/NewRequestForm";
import { DetailView } from "@/components/DetailView";
import { PreviewForm } from "@/components/PreviewForm";
import { Loader2 } from "lucide-react";

interface RoleDashboardProps {
  role: Role;
}

export default function RoleDashboard({ role }: RoleDashboardProps) {
  const { user } = useAuth();
  const [view, setView] = useState<View>("dashboard");
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

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
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Role indicator */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            {role} Dashboard
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {!loaded ? (
          <div className="flex flex-col items-center justify-center py-20">
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
      </main>
    </div>
  );
}
