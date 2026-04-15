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
              <span className="text-lg font-bold">JUIT RoomBook</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Streamlined room booking with multi-level digital approval workflow for JUIT campus.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Room Booking
              </Link>
              <a href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">University</h4>
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
              <span className="text-sm text-muted-foreground">Privacy Policy</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jaypee University of Information Technology, Waknaghat. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
