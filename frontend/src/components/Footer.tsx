import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="hero-gradient rounded-lg p-1.5">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">CampusHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Smart room booking and AI-powered college assistant for modern
              campuses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Room Booking
              </Link>
              <Link
                to="/chatbot"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                AI Chatbot
              </Link>
              <Link
                to="/admin"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">College</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Admissions</span>
              <span className="text-sm text-muted-foreground">Departments</span>
              <span className="text-sm text-muted-foreground">Library</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Support</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Help Center</span>
              <span className="text-sm text-muted-foreground">Contact Us</span>
              <span className="text-sm text-muted-foreground">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2026 CampusHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;