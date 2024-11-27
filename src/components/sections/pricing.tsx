import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const hostingPlans = [
  {
    name: "חבילה מקצועית",
    price: "2,999",
    originalPrice: "3,500",
    discount: "14%",
    duration: "זמן מחירון: 10 ימי עסקים",
    features: [
      "5 בלוקים",
      "הצגת העסק בצורה מפורטת ומקצועית",
      "תמונות ללא הגבלה + עיצוב",
      "אינטגרציה מקצועית לכל צורך",
      "תעודת SSL מובנית",
      "קישורים לרשתות חברתיות",
      "קישור ישיר להתכתבות בWhatsApp",
      "טופס מילוי פרטים"
    ]
  },
  {
    name: "חבילה מדמית",
    price: "1,650",
    originalPrice: "2,000",
    discount: "18%",
    duration: "זמן מחירון: 7 ימי עסקים",
    popular: true,
    features: [
      "3 בלוקים",
      "הצגת העסק בצורה מפורטת",
      "תמונות ללא הגבלה",
      "עיצוב רספונסיבי למובייל",
      "תעודת SSL מובנית",
      "קישורים לרשתות חברתיות",
      "קישור ישיר להתכתבות בWhatsApp"
    ]
  },
  {
      name: "חבילה בסיסית",
    price: "999",
    originalPrice: "1,200",
    discount: "17%",
    duration: "זמן מחירון: 5 ימי עסקים",
    features: [
      "בלוק אחד",
      "שימוש מוצר/שירות אחד",
      "תמונה אחת",
      "עיצוב רספונסיבי למובייל",
      "תעודת SSL מובנית",
      "קישורים לרשתות חברתיות"
    ]
  }
];

const marketingPlans = [
  {
    name: "קידום ממומן בפייסבוק ואינסטגרם",
    price: "1,500",
    originalPrice: "1,750",
    discount: "15%",
    features: [
      "ניהול קמפיינים ממומנים בפלטפורמות Meta",
      "אסטרטגיית פרסום מותאמת אישית",
      "הקמת קמפיינים ממוקדי מטרה",
      "הגדרת קהלים מותאמים",
      "התקנת פיקסל ומעקב המרות",
      "אופטימיזציה שוטפת",
      "ניתוח ביצועים מקיף"
    ],
    extraNote: "אפשרות לניהול דף פייסבוק עסקי בתוספת של ₪1,000"
  },
  {
    name: "חבילת גוגל משולב",
    price: "2,999",
    originalPrice: "3,300",
    discount: "10%",
    popular: true,
    features: [
      "כל היתרונות הקיימים בקידום אורגני (SEO)",
      "כל היתרונות הקיימים בקידום ממומן (PPC)",
      "סינרגיה בין הערוצים",
      "דוחות ביצועים משולבים",
      "אופטימיזציה כוללת",
      "חיסכון משמעותי בעלויות לעסק",
      "תמיכה וייעוץ שוטפים"
    ]
  },
  {

    name: "גוגל ממומן (PPC)",
    price: "2,500",
    originalPrice: "2,800",
    discount: "12%",
    features: [
      "ניהול עד 2 קמפיינים במקביל",
      "מחקר מילות מפתח והתאמת הצעות מחיר",
      "הגדרת קהלי יעד ורימרקטינג",
      "חיבור וניטור Google Analytics",
      "התקנת מעקב המרות",
      "ניתוח נתוני Search Data",
      "אופטימיזציה שוטפת של הקמפיינים"
    ]
  },
  {
    name: "גוגל אורגני (SEO)",
    price: "1,750",
    originalPrice: "2,000",
    discount: "20%",
    features: [
      "מחקר מילים של עד 5/8 מילות מפתח",
      "בדיקת ושיפור מהירות אתר",
      "בדיקת תאימות למובייל",
      "הטמעת מטא טאגז",
      "אופטמיזציית תוכן כוללת לאתר",
      "הגדרת Google Search Console",
      "הגדרת Google Analytics"
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">תוכניות ומחירים</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            בחר את התוכנית המתאימה לצרכים שלך
          </p>
        </div>

        <Tabs defaultValue="hosting" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="hosting">דפי נחיתה בהתאמה אישית</TabsTrigger>
            <TabsTrigger value="marketing">תוכניות וחבילות שיווק בדיגיטל</TabsTrigger>
          </TabsList>

          <TabsContent value="hosting" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">מחירי השקה מיוחדים - בתוקף עד 28.2.25 בלבד</h3>
              <p className="text-muted-foreground">
                רוצים להצעיד לעסק שלכם נראות מקצועית כמו של החברות הגדולות
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {hostingPlans.map((plan, index) => (
                <Card 
                  key={index}
                  className={`relative card-hover text-right ${
                    plan.popular ? 'border-primary shadow-lg scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 right-4 bg-gradient-to-r from-primary to-accent px-4 py-1 rounded-full text-primary-foreground text-sm font-medium">
                      הכי פופולרי
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4 space-y-2">
                      <div className="text-muted-foreground line-through">₪{plan.originalPrice}</div>
                      <div>
                        <span className="text-4xl font-bold gradient-text">₪{plan.price}</span>
                        <span className="text-primary mr-2">חיסכון של {plan.discount}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{plan.duration}</div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 flex-row-reverse">
                          <div className="w-5 h-5 mt-1 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={`w-full button-hover ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' 
                          : 'hover:bg-accent/10'
                      }`} 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      בחר תוכנית
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">מחירי השקה מיוחדים - בתוקף עד 28.2.25 בלבד</h3>
              <p className="text-muted-foreground">
                רוצים להגדיל את החשיפה של העסק שלכם ולהגיע ללקוחות חדשים?
              </p>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-8">
              {marketingPlans.map((plan, index) => (
                <Card 
                  key={index}
                  className={`relative card-hover text-right ${
                    plan.popular ? 'border-primary shadow-lg scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 right-4 bg-gradient-to-r from-primary to-accent px-4 py-1 rounded-full text-primary-foreground text-sm font-medium">
                      הכי פופולרי
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-xl lg:text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4 space-y-2">
                      <div className="text-muted-foreground line-through">₪{plan.originalPrice}</div>
                      <div>
                        <span className="text-4xl font-bold gradient-text">₪{plan.price}</span>
                        <span className="text-primary mr-2">חיסכון של {plan.discount}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 flex-row-reverse">
                          <div className="w-5 h-5 mt-1 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.extraNote && (
                      <div className="mt-6 p-4 bg-primary/10 rounded-lg text-sm">
                        {plan.extraNote}
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={`w-full button-hover ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' 
                          : 'hover:bg-accent/10'
                      }`} 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      בחר תוכנית
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}