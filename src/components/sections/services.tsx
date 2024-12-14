import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BarChart2, Globe, Target, Megaphone, AppWindow } from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "קמפיינים ממומנים ב<br/> Instagram & Facebook",
    description: "ניהול קמפיינים ממומנים בפלטפורמות Meta, אסטרטגיית פרסום מותאמת אישית בפייסבוק ואינסטגרם, הקמת קמפיינים ממוקדי מטרה, אופטימיזציה שוטפת וניתוח ביצועים. כולל הגדרת קהלים, התקנת פיקסל ומעקב המרות."
  },
  {
    icon: Target,
    title: "קידום ממומן בגוגל (PPC)",
    description: "ניהול עד 2 קמפיינים במקביל, מחקר מילות מפתח והתאמת הצעות מחיר, הגדרת קהלי יעד ורימרקטינג, חיבור וניטור Google Analytics, התקנת מעקב המרות, ניתוח נתוני Search Data, אופטימיזציה שוטפת של הקמפיינים."
  },
  {
    icon: BarChart2,
    title: "ניהול תוכן ברשתות החברתיות </br> (Facebook & Instagram)",
    description: "יצירת והפקת תוכן מקצועי (צילומים, סרטונים ופוסטים) בפלטפורמות Meta, כולל קופירייטינג והעלאה שוטפת. שירות מענה במסנג'ר זמין כתוספת (חודש ראשון ללא עלות)."
  },
  {
    icon: Search,
    title: "קידום אורגני בגוגל (SEO)",
    description: "כולל מחקר מילים של עד 5/8 מילות מפתח, בדיקת מהירות אתר ושיפורה, בדיקת תאימות למובייל, הטמעת מטא טאגז, אופטמיזציית תוכן כוללת לאתר והגדרת Google Search Console & Google Analytics."
  },
  {
    icon: AppWindow,
    title: "הקמת דפי נחיתה",
    description: "בניית דפי נחיתה ואתרים מותאמים אישית, עיצוב רספונסיבי למובייל, תעודת אבטחה (SSL) מובנה, אנימציות מקצועיות, ואינטגרציה מלאה עם כלי שיווק דיגיטליים. כולל אופטימיזציה למנועי חיפוש וחיבור לפלטפורמות חברתיות."
  },
  {
    icon: Globe,
    title: "ייעוץ שיווקי דיגיטלי",
    description: "פגישת ייעוץ מקצועית לבניית אסטרטגיה שיווקית מקיפה, מיפוי ערוצי פרסום מתאימים, וגיבוש תכנית פעולה מותאמת אישית לצרכי העסק."
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text text-center">השירותים שלנו</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            פתרונות דיגיטליים וקבלת מעטפת רחבה לטובת הצלחת העסק שלך
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex flex-col lg:flex-row">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="card-hover border-2 overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
                order: `${index}`
              }}
            >
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2" dangerouslySetInnerHTML={{ __html: service.title }} />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}