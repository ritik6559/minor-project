import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

const exampleQueries = [
  "What are the library timings?",
  "How to book a seminar hall?",
  "Who is the HOD of CSE?",
  "When is the next exam schedule?",
];

const botResponses: Record<string, string> = {
  "What are the library timings?":
    "The college library is open from **9:00 AM to 12:00 PM** on weekdays and **9:00 AM to 8:00 PM** on weekends. It remains closed on public holidays.",
  "How to book a seminar hall?":
    "You can book a seminar hall through the **Room Booking** section of CampusHub. Select the hall, choose your date and time slot, fill in the purpose, and submit. Approval is usually granted within 24 hours.",
  "Who is the HOD of CSE?":
    "The current Head of Department (HOD) of Computer Science & Engineering is **Dr. Vivek Kumar Sehgal**.",
  "When is the next exam schedule?":
    "The T-2 examinations are scheduled from **March 24 to April 2, 2026**. Detailed timetables will be available on the college portal one week prior.",
};

const defaultResponse =
  "I'm sorry, I don't have specific information about that in my current database. Please try rephrasing your question or contact the college office for more details.";

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "👋 Hello! I'm the CampusHub AI Assistant. I can answer questions about college timings, departments, facilities, and more. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = botResponses[text] || defaultResponse;
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: response,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel */}
      <aside className="hidden md:flex w-72 bg-card border-r flex-col">
        <div className="p-4 border-b">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="hero-gradient rounded-lg p-1.5">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm">AI Assistant</span>
          </div>
        </div>
        <div className="p-4 flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Try asking
          </p>
          <div className="space-y-2">
            {exampleQueries.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="hero-gradient rounded-lg p-2">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold">College AI Assistant</h1>
              <p className="text-xs text-muted-foreground">
                Powered by RAG • Official College Data
              </p>
            </div>
          </div>
          <Link to="/" className="md:hidden text-sm text-muted-foreground">
            ← Home
          </Link>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 md:p-6 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "bot" && (
                <div className="hero-gradient w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "hero-gradient text-primary-foreground"
                    : "glass-card"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.role === "bot" && msg.id !== 0 && (
                  <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Answer generated from
                    official college data
                  </p>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-1">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-3 items-start">
              <div className="hero-gradient w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="glass-card rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Mobile example queries */}
        <div className="md:hidden px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {exampleQueries.slice(0, 3).map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t bg-card p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2 max-w-3xl mx-auto"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the college..."
              className="flex-1 bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
            <Button
              type="submit"
              disabled={!input.trim()}
              className="hero-gradient text-primary-foreground hover:opacity-90 px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
