import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Building2,
  MessageSquare,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  BarChart3,
  GraduationCap,
  Home,
  Settings,
  History,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const sidebarLinks = [
  { icon: Home, label: "Overview", to: "/admin" },
  { icon: Building2, label: "Rooms", to: "/admin" },
  { icon: Calendar, label: "Bookings", to: "/admin" },
  { icon: BarChart3, label: "Analytics", to: "/admin" },
  { icon: Settings, label: "Settings", to: "/admin" },
];

const stats = [
  { label: "Total Bookings", value: "1,247", icon: Calendar, change: "+12%" },
  { label: "Active Rooms", value: "34", icon: Building2, change: "+2" },
  {
    label: "Chatbot Queries",
    value: "5,832",
    icon: MessageSquare,
    change: "+28%",
  },
  { label: "Active Users", value: "892", icon: Users, change: "+15%" },
];

const adminRooms = [
  {
    id: 1,
    name: "Seminar Hall A",
    building: "Main Block",
    type: "Seminar Hall",
    capacity: 120,
    status: "active",
  },
  {
    id: 2,
    name: "Lab 201",
    building: "CS Block",
    type: "Computer Lab",
    capacity: 60,
    status: "active",
  },
  {
    id: 3,
    name: "Room 305",
    building: "Main Block",
    type: "Classroom",
    capacity: 40,
    status: "maintenance",
  },
  {
    id: 4,
    name: "Conference Room B",
    building: "Admin Block",
    type: "Conference",
    capacity: 20,
    status: "active",
  },
  {
    id: 5,
    name: "Auditorium",
    building: "Main Block",
    type: "Auditorium",
    capacity: 500,
    status: "active",
  },
];

const pendingApprovals = [
  {
    id: 1,
    room: "Seminar Hall A",
    requestedBy: "Dr. Priya Sharma",
    date: "2026-02-26",
    time: "10:00 - 12:00",
    purpose: "Workshop on AI",
  },
  {
    id: 2,
    room: "Auditorium",
    requestedBy: "Student Council",
    date: "2026-02-28",
    time: "14:00 - 17:00",
    purpose: "Cultural Fest Rehearsal",
  },
  {
    id: 3,
    room: "Lab 201",
    requestedBy: "Prof. Ankit Verma",
    date: "2026-03-01",
    time: "09:00 - 11:00",
    purpose: "Coding Bootcamp",
  },
];

const Admin = () => {
  const [addRoomModal, setAddRoomModal] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-60 bg-sidebar text-sidebar-foreground flex-col border-r border-sidebar-border hidden md:flex">
        <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
          <div className="hero-gradient rounded-lg p-1.5">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm">Admin Panel</span>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <link.icon className="h-4 w-4 shrink-0" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage rooms, bookings, and monitor usage
            </p>
          </div>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Link>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success text-xs"
                  >
                    {s.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Room Management */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Room Management</h2>
              <Button
                onClick={() => setAddRoomModal(true)}
                className="hero-gradient text-primary-foreground hover:opacity-90"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Room
              </Button>
            </div>
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Room
                      </th>
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Building
                      </th>
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Capacity
                      </th>
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminRooms.map((room) => (
                      <tr
                        key={room.id}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-3 font-medium">{room.name}</td>
                        <td className="p-3 text-muted-foreground">
                          {room.building}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {room.type}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {room.capacity}
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="secondary"
                            className={
                              room.status === "active"
                                ? "bg-success/10 text-success"
                                : "bg-warning/10 text-warning"
                            }
                          >
                            {room.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pending Approvals */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Pending Approvals</h2>
            <div className="space-y-3">
              {pendingApprovals.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-medium">{a.purpose}</p>
                    <p className="text-sm text-muted-foreground">
                      {a.room} · {a.requestedBy} · {a.date}, {a.time}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="bg-success text-success-foreground hover:bg-success/90"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive border-destructive/30 hover:bg-destructive/10"
                    >
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add Room Modal */}
      {addRoomModal && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl shadow-2xl w-full max-w-md p-6"
          >
            <h2 className="text-lg font-bold mb-4">Add New Room</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setAddRoomModal(false);
              }}
            >
              <div className="space-y-2">
                <Label>Room Name</Label>
                <Input placeholder="e.g., Lab 301" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Building</Label>
                  <Input placeholder="e.g., CS Block" />
                </div>
                <div className="space-y-2">
                  <Label>Capacity</Label>
                  <Input type="number" placeholder="e.g., 60" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Room Type</Label>
                <Input placeholder="e.g., Computer Lab" />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddRoomModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 hero-gradient text-primary-foreground hover:opacity-90"
                >
                  Add Room
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
