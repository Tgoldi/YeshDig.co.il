import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Service = {
  icon?: React.ElementType;  // for single icon
  icons?: React.ElementType[];  // for multiple icons
  title: string;
  description: string;
}

const GoogleIcon = () => (
  <img 
    src="/google.gif" 
    alt="Google Icon" 
    className="h-10 w-10"
  />
);

const InstagramIcon = () => (
  <img 
    src="/instagram.gif" 
    alt="Instagram Icon" 
    className="h-10 w-10"
  />
);

const FacebookIcon = () => (
  <img 
    src="/facebook.gif" 
    alt="Facebook Icon" 
    className="h-10 w-10"
  />
);

const GraphIcon = () => (
  <img 
    src="/graph.gif" 
    alt="Graph Icon" 
    className="h-10 w-10"
  />
);

const InternetIcon = () => (
  <img 
    src="/internet.gif" 
    alt="Internet Icon" 
    className="h-10 w-10"
  />
);

const SocialMediaIcon = () => (
  <img 
    src="/Social Media chat thumbs up.gif" 
    alt="Social Media Icon" 
    className="h-10 w-10"
  />
);

const PositiveIcon = () => (
  <img 
    src="/Positive Feedback.gif" 
    alt="Positive Feedback Icon" 
    className="h-10 w-10"
  />
);

const services: Service[] = [
  {
    icons: [InstagramIcon, FacebookIcon],
    title: "קמפיינים ממומנים ב<br/> Instagram & Facebook",
    description: "ניהול קמפיינים ממומנים בפלטפורמות Meta, אסטרטגיית פרסום מותאמת אישית בפייסבוק ואינסטגרם, הקמת קמפיינים ממוקדי מטרה, אופטימיזציה שוטפת וניתוח ביצועים. כולל הגדרת קהלים, התקנת פיקסל ומעקב המרות."
  },
  {
    icon: GraphIcon,
    title: "קידום ממומן בגוגל (PPC)",
    description: "ניהול קמפיינים, מחקר מילות מפתח והתאמת הצעות מחיר, הגדרת קהלי יעד ורימרקטינג, חיבור וניטור Google Analytics, התקנת מעקב המרות, ניתוח נתוני Search Data, אופטימיזציה שוטפת של הקמפיינים."
  },
  {
    icon: GoogleIcon,
    title: "קידום אורגני בגוגל (SEO)",
    description: "כולל מחקר מילים של עד 5/8 מילות מפתח, בדיקת מהירות אתר ושיפורה, בדיקת תאימות למובייל, הטמעת מטא טאגז, אופטמיזציית תוכן כוללת לאתר והגדרת Google Search Console & Google Analytics."
  },
  {
    icon: PositiveIcon,
    title: "ניהול תוכן ברשתות החברתיות </br> (Facebook & Instagram)",
    description: "יצירת והפקת תוכן מקצועי (צילומים, סרטונים ופוסטים) בפלטפורמות Meta, כולל קופירייטינג והעלאה שוטפת. שירות מענה במסנג'ר זמין כתוספת (חודש ראשון ללא עלות)."
  },
  {
    icon: InternetIcon,
    title: "הקמת דפי נחיתה",
    description: "בניית דפי נחיתה ואתרים מותאמים אישית, עיצוב רספונסיבי למובייל, תעודת אבטחה (SSL) מובנה, אנימציות מקצועיות, ואינטגרציה מלאה עם כלי שיווק דיגיטליים. כולל אופטימיזציה למנועי חיפוש וחיבור לפלטפורמות חברתיות."
  },
  {
    icon: SocialMediaIcon,
    title: "ייעוץ שיווקי דיגיטלי",
    description: "פגישת ייעוץ מקצועית לבניית אסטרטגיה שיווקית מקיפה, מיפוי ערוצי פרסום מתאימים, וגיבוש תכנית פעולה מותאמת אישית לצרכי העסק."
  }
];

const Services = () => (
  <section id="services" className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 gradient-text">השירותים שלנו</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          פתרונות דיגיטליים וקבלת מעטפת רחבה לטובת הצלחת העסק שלך
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="card-hover border-2 overflow-hidden">
            <CardHeader>
              <div className="mb-4 flex gap-2">
                {Array.isArray(service.icons) ? (
                  service.icons.map((Icon, i) => (
                    <div key={i} className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  ))
                ) : service.icon ? (
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    {service.icon && <service.icon className="h-6 w-6 text-primary" />}
                  </div>
                ) : null}
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

export default Services;