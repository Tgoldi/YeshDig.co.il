import { Facebook, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (to: string) => {
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              className="h-10 mb-6 hover:opacity-80 transition-opacity" 
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
                  <a 
                    href={`#${link}`} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link === "services" && "שירותים"}
                    {link === "about" && "אודות"}
                    {link === "pricing" && "מחירים"}
                    {link === "contact" && "צור קשר"}
                  </a>
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
                " ייעוץ שיווקי דיגיטלי"
              ].map((service) => (
                <li key={service} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-6 text-lg">עקבו אחרינו</h3>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61566661383182" },
                { Icon: Instagram, href: "https://www.instagram.com/yesh.digital/?fbclid=IwZXh0bgNhZW0CMTEAAR34phfdnFPsQSNW2yFuZGdhL5FrnKzoo0a11tFZWjFwgPoESNHB3m0SeU8_aem_7Du1IZp6UPO7N140Lvrp0w" },
              ].map(({ Icon, href }, index) => (
                <a 
                  key={index}
                  href={href} 
                  className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors"
                >
                  <Icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-12 pt-8">
          <div className="text-center">
            <div className="flex justify-center gap-6 mb-4">
              <button
                onClick={() => handleNavigation('/privacy-policy')}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                מדיניות פרטיות
              </button>
              <button
                onClick={() => handleNavigation('/terms-of-use')}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                תנאי שימוש
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