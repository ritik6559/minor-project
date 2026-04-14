import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MessageSquare,
  Clock,
  Database,
  Brain,
  Search,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroCampus from "@/assets/hero-campus.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  }),
};

const features = [
  {
    icon: Calendar,
    title: "Room Booking",
    description:
      "Browse and book classrooms, labs, and seminar halls with real-time availability.",
  },
  {
    icon: MessageSquare,
    title: "AI College Assistant",
    description:
      "Get instant answers about timings, faculty, events, and more from college data.",
  },
  {
    icon: Clock,
    title: "Real-time Availability",
    description:
      "See which rooms are free right now with live status updates across campus.",
  },
];

const steps = [
  {
    icon: Search,
    title: "College Data Scraping",
    description:
      "We continuously collect and update information from official college sources.",
  },
  {
    icon: Database,
    title: "RAG Processing",
    description:
      "Data is indexed and processed using Retrieval-Augmented Generation for accuracy.",
  },
  {
    icon: Brain,
    title: "AI-Powered Answers",
    description:
      "Ask any college question and get precise, contextual answers instantly.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroCampus}
            alt="College campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.h1
              variants={fadeUp}
              custom={0}
              className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight"
            >
              Smart Room Booking &amp; AI College Assistant
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-4 text-lg md:text-xl text-primary-foreground/80"
            >
              Book rooms seamlessly and get instant answers from college data —
              all in one place.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/dashboard"
                className="hero-gradient text-primary-foreground px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Book a Room <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/chatbot"
                className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:bg-primary-foreground/20 transition-colors"
              >
                Ask the College Bot <MessageSquare className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl md:text-4xl font-bold"
            >
              Everything Your Campus Needs
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-3 text-muted-foreground max-w-lg mx-auto"
            >
              A unified platform for room management and intelligent campus
              assistance.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
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
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl md:text-4xl font-bold"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-3 text-muted-foreground max-w-lg mx-auto"
            >
              From data collection to intelligent answers — here's the pipeline.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
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
                <div className="text-sm font-bold text-primary mb-1">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* 
      <Footer /> */}
    </div>
  );
};

export default Index;
