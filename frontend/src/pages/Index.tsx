import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  ShieldCheck,
  Users,
  ClipboardCheck,
  ArrowRight,
  Building2,
  Clock,
  CheckCircle2,
  Stamp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
};

const features = [
  {
    icon: Calendar,
    title: "Easy Room Booking",
    description: "Submit booking requests for Auditorium, Board Room, or Lecture Theatres in just a few clicks.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-Level Approval",
    description: "Requests flow through Faculty → HOD → Admin Officer → Registrar for complete oversight.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Each stakeholder gets a personalized dashboard tailored to their responsibilities.",
  },
  {
    icon: ClipboardCheck,
    title: "Digital Signatures",
    description: "Paperless approval with digital signature trail for every step of the process.",
  },
];

const steps = [
  {
    icon: Building2,
    title: "Faculty Submits Request",
    description: "Faculty members create and submit room booking requests with all necessary details.",
  },
  {
    icon: Clock,
    title: "HOD Reviews & Approves",
    description: "Department HOD reviews the request and provides first-level approval.",
  },
  {
    icon: CheckCircle2,
    title: "Admin Verifies Availability",
    description: "Admin Officer checks room availability and verifies logistics.",
  },
  {
    icon: Stamp,
    title: "Registrar Final Approval",
    description: "Registrar gives the final sign-off with comments and digital signature.",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={"src/assets/hero-campus.jpg"} alt="JUIT Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.h1
              variants={fadeUp}
              custom={0}
              className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight"
            >
              Smart Room Booking for JUIT Campus
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-4 text-lg md:text-xl text-primary-foreground/80"
            >
              Streamlined multi-level approval workflow for auditoriums, board rooms, and lecture theatres — all in one place.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="hero-gradient text-primary-foreground px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:bg-primary-foreground/20 transition-colors"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold">
              Everything Your Campus Needs
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="mt-3 text-muted-foreground max-w-lg mx-auto">
              A complete platform for managing room bookings with digital approvals and role-based access.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-xl p-6 hover:shadow-xl transition-shadow"
              >
                <div className="hero-gradient w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold">
              How It Works
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="mt-3 text-muted-foreground max-w-lg mx-auto">
              From request submission to final approval — a seamless 4-step workflow.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-sm font-bold text-primary mb-1">Step {i + 1}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
