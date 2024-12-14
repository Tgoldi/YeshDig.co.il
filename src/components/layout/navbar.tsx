import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { href: "#services", label: "שירותים" },
  { href: "#about", label: "אודות" },
  { href: "#pricing", label: "מחירים" },
  { href: "#faq", label: "שאלות נפוצות" },
];

const legalItems = [
  { to: "/legal", label: "מדיניות פרטיות ותנאי שימוש" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only track sections on home page
      if (location.pathname === '/') {
        const sections = menuItems.map(item => item.href.slice(1));
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        
        setActiveSection(currentSection || "");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    
    // If we're not on the home page, navigate home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If we're already on the home page, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNavigation = (to: string) => {
    setIsOpen(false);
    navigate(to);
  };

  return (
    <motion.nav 
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? "bg-background/95 backdrop-blur-md shadow-lg" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu - Left Side */}
          <div className="md:hidden flex items-center gap-4 order-2">
            <ThemeToggle />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isScrolled ? 1 : 0 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              {isScrolled && (
                <button 
                  onClick={() => navigate('/')} 
                  className="flex items-center gap-2"
                >
                  <img 
                    src="/yes-digital-logo.svg" 
                    alt="יש דיגיטל" 
                    className="h-8 w-auto transition-transform hover:scale-105"
                  />
                </button>
              )}
            </motion.div>
          </div>

          {/* Hamburger - Right Side */}
          <div className="md:hidden order-1">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetTitle className="text-right">תפריט ניווט</SheetTitle>
                <SheetDescription className="text-right">
                  ניווט מהיר לכל חלקי האתר
                </SheetDescription>
                <div className="flex flex-col gap-4 mt-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`text-right w-full px-4 py-2 rounded-lg transition-colors font-bold ${
                        activeSection === item.href.slice(1) && location.pathname === '/'
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/70 hover:text-foreground hover:bg-accent/10"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button 
                    onClick={() => scrollToSection("#contact")}
                    className="mt-4 w-full button-hover bg-gradient-to-r from-primary to-accent hover:opacity-90 font-bold"
                  >
                    צור קשר
                  </Button>
                  
                  <div className="border-t border-primary/10 mt-4 pt-4">
                    {legalItems.map((item) => (
                      <button
                        key={item.to}
                        onClick={() => handleNavigation(item.to)}
                        className={`text-right w-full px-4 py-2 rounded-lg transition-colors font-bold ${
                          location.pathname === item.to
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:text-foreground hover:bg-accent/10"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Logo - Left Side (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-4 w-1/4">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2"
            >
              <img 
                src="/yes-digital-logo.svg" 
                alt="יש דיגיטל" 
                className="h-10 w-auto transition-transform hover:scale-105"
              />
            </button>
          </div>

          {/* Desktop Menu - Centered (Hidden on mobile) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <motion.div 
              className="flex items-center gap-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-bold transition-colors relative ${
                    activeSection === item.href.slice(1) && location.pathname === '/'
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && location.pathname === '/' && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="activeSection"
                    />
                  )}
                </motion.button>
              ))}
              
              {/* Legal Links */}
              {legalItems.map((item, index) => (
                <motion.button
                  key={item.to}
                  onClick={() => handleNavigation(item.to)}
                  className={`text-sm font-bold transition-colors relative ${
                    location.pathname === item.to
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (index + menuItems.length) }}
                >
                  {item.label}
                  {location.pathname === item.to && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="activeSection"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Theme Toggle and Contact Button - Right Side (Hidden on mobile) */}
          <motion.div 
            className="hidden md:flex items-center gap-4 justify-end w-1/4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ThemeToggle />
            <Button 
              onClick={() => scrollToSection("#contact")}
              className="button-hover bg-gradient-to-r from-primary to-accent hover:opacity-90 font-bold"
            >
              צור קשר
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}