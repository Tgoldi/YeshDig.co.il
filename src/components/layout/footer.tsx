import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (href: string) => {
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

  const handleLegalClick = () => {
    navigate('/legal');
  };

  return (
    <footer className="relative py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/50 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img 
              src="/yes-digital-logo.svg" 
              alt="יש דיגיטל" 
              className="h-10 mb-6 hover:opacity-80 transition-opacity cursor-pointer" 
              onClick={() => navigate('/')}
            />
            <p className="text-muted-foreground">
              פתרונות דיגיטל מתקדמים לעסקים
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-6 text-lg">קישורים מהירים</h3>
            <ul className="space-y-3">
              {["services", "about", "pricing", "contact"].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => scrollToSection(`#${link}`)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link === "services" && "שירותים"}
                    {link === "about" && "אודות"}
                    {link === "pricing" && "מחירים"}
                    {link === "contact" && "צור קשר"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-6 text-lg">שירותים</h3>
            <ul className="space-y-3">
              {[
                "קידום אורגני בגוגל (SEO)",
                "קידום ממומן בגוגל (PPC)",
                "ניהול תוכן ברשתות החברתיות",
                "ניהול קמפיינים ממומנים",
                "הקמת דפי נחיתה",
                "ייעוץ שיווקי דיגיטלי"
              ].map((service) => (
                <li key={service} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-6 text-lg">עקבו אחרינו</h3>
            <div className="grid grid-cols-5 gap-4 sm:gap-6 max-w-[280px] sm:max-w-none mx-auto">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61566661383182" },
                { Icon: Instagram, href: "https://www.instagram.com/yesh.digital/?fbclid=IwZXh0bgNhZW0CMTEAAR34phfdnFPsQSNW2yFuZGdhL5FrnKzoo0a11tFZWjFwgPoESNHB3m0SeU8_aem_7Du1IZp6UPO7N140Lvrp0w" },
                { Icon: TikTokIcon, href: "https://www.tiktok.com/@yeshdigital" },
                { Icon: Youtube, href: "https://www.youtube.com/channel/UC5EA24nn5o9kBgTQFeAvTaQ" },
                { Icon: Linkedin, href: "https://linkedin.com/company/%D7%99%D7%A9-%D7%A9%D7%99%D7%95%D7%95%D7%A7-%D7%91%D7%93%D7%99%D7%92%D7%99%D7%98%D7%9C/" }
              ].map(({ Icon, href }, index) => (
                <a 
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-primary transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-12 pt-8">
          <div className="text-center">
            <div className="flex justify-center gap-6 mb-4">
              <button
                onClick={handleLegalClick}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                מדיניות האתר
              </button>
            </div>
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} יש שיווק דיגיטל. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}