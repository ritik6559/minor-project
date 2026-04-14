import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Building2,
  Users,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  History,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sidebarLinks = [
  { icon: Home, label: "Dashboard", to: "/dashboard" },
  { icon: Calendar, label: "Book Room", to: "/dashboard" },
  { icon: History, label: "My Bookings", to: "/dashboard" },
  { icon: MessageSquare, label: "AI Assistant", to: "/chatbot" },
  { icon: Settings, label: "Settings", to: "/dashboard" },
];

const rooms = [
  {
    id: 1,
    name: "Lecture Theatre 1",
    building: "Vivekanand Bhawan",
    type: "Lecture Hall",
    capacity: 200,
    status: "available",
  },
  {
    id: 2,
    name: "Computer Lab 10",
    building: "Vivekanand Bhawan",
    type: "Computer Lab",
    capacity: 60,
    status: "available",
  },
  {
    id: 3,
    name: "Class Room 10",
    building: "Vivekanand Bhawan",
    type: "Classroom",
    capacity: 40,
    status: "booked",
  },
  {
    id: 4,
    name: "Board Room",
    building: "Vivekanand Bhawan",
    type: "Conference",
    capacity: 20,
    status: "available",
  },
  {
    id: 5,
    name: "Auditorium",
    building: "Vivekanand Bhawan",
    type: "Auditorium",
    capacity: 500,
    status: "booked",
  },
  {
    id: 6,
    name: "Electronics Lab 6",
    building: "Vivekanand Bhawan",
    type: "Electronics Lab",
    capacity: 40,
    status: "available",
  },
];

const bookingHistory = [
  {
    id: 1,
    room: "Lecture Theatre 1",
    date: "2026-02-20",
    time: "10:00 - 12:00",
    purpose: "Guest Lecture",
    status: "confirmed",
  },
  {
    id: 2,
    room: "Computer Lab 10",
    date: "2026-02-22",
    time: "14:00 - 16:00",
    purpose: "Workshop",
    status: "pending",
  },
  {
    id: 3,
    room: "Board Room",
    date: "2026-02-18",
    time: "09:00 - 10:00",
    purpose: "Committee Meeting",
    status: "completed",
  },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<(typeof rooms)[0] | null>(
    null,
  );
  const location = useLocation();

  const openBooking = (room: (typeof rooms)[0]) => {
    setSelectedRoom(room);
    setBookingModal(true);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside
        className={`${
          sidebarOpen ? "w-60" : "w-16"
        } bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col border-r border-sidebar-border`}
      >
        <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
          <div className="hero-gradient rounded-lg p-1.5 shrink-0">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          {sidebarOpen && <span className="font-bold text-sm">CampusHub</span>}
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 mx-2 mt-2 rounded-lg hover:bg-sidebar-accent transition-colors self-end"
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        <nav className="flex-1 p-2 space-y-1">
          {sidebarLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Room Booking</h1>
            <p className="text-sm text-muted-foreground">
              Browse and book available rooms
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
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Select>
                <SelectTrigger>
                  <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Building" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Block</SelectItem>
                  <SelectItem value="cs">CS Block</SelectItem>
                  <SelectItem value="admin">Admin Block</SelectItem>
                  <SelectItem value="ee">EE Block</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classroom">Classroom</SelectItem>
                  <SelectItem value="lab">Lab</SelectItem>
                  <SelectItem value="seminar">Seminar Hall</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">Up to 20</SelectItem>
                  <SelectItem value="50">Up to 50</SelectItem>
                  <SelectItem value="100">Up to 100</SelectItem>
                  <SelectItem value="500">100+</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" className="w-full" />
            </div>
          </motion.div>

          {/* Room Grid */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Available Rooms</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map((room, i) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-5 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{room.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {room.building}
                      </p>
                    </div>
                    <Badge
                      variant={
                        room.status === "available" ? "default" : "secondary"
                      }
                      className={
                        room.status === "available"
                          ? "bg-success text-success-foreground"
                          : ""
                      }
                    >
                      {room.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" /> {room.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {room.capacity}
                    </span>
                  </div>
                  <Button
                    className="w-full hero-gradient text-primary-foreground hover:opacity-90"
                    disabled={room.status === "booked"}
                    onClick={() => openBooking(room)}
                  >
                    {room.status === "available" ? "Book Now" : "Unavailable"}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Booking History */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Booking History</h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Room
                      </th>
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Time
                      </th>
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Purpose
                      </th>
                      <th className="text-left p-3 font-medium text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingHistory.map((b) => (
                      <tr
                        key={b.id}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-3 font-medium">{b.room}</td>
                        <td className="p-3 text-muted-foreground">{b.date}</td>
                        <td className="p-3 text-muted-foreground">{b.time}</td>
                        <td className="p-3 text-muted-foreground">
                          {b.purpose}
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="secondary"
                            className={
                              b.status === "confirmed"
                                ? "bg-success/10 text-success"
                                : b.status === "pending"
                                  ? "bg-warning/10 text-warning"
                                  : "bg-muted text-muted-foreground"
                            }
                          >
                            {b.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {bookingModal && selectedRoom && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Book {selectedRoom.name}</h2>
              <button
                onClick={() => setBookingModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setBookingModal(false);
              }}
            >
              <div className="space-y-2">
                <Label>Purpose of Booking</Label>
                <Input placeholder="e.g., Guest Lecture, Workshop" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Time Slot</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09-10">09:00 - 10:00</SelectItem>
                      <SelectItem value="10-12">10:00 - 12:00</SelectItem>
                      <SelectItem value="14-16">14:00 - 16:00</SelectItem>
                      <SelectItem value="16-18">16:00 - 18:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 text-sm">
                <p className="font-medium">{selectedRoom.name}</p>
                <p className="text-muted-foreground">
                  {selectedRoom.building} · {selectedRoom.type} ·{" "}
                  {selectedRoom.capacity} seats
                </p>
              </div>
              <Button
                type="submit"
                className="w-full hero-gradient text-primary-foreground hover:opacity-90"
              >
                Confirm Booking
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
