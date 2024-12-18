import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ContactDialog } from "@/components/contact-dialog";

const hostingPlans = [
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
  },
  {
    name: "חבילה תדמית",
    price: "1,650",
    originalPrice: "2,000",
    discount: "18%",
    duration: "זמן מחירון: 7 ימי עסקים",
    popular: true,
    features: [
      "שלוש בלוקים",
      "הצגת העסק בצורה מפורטת",
      "תמונות ללא הגבלה",
      "עיצוב רספונסיבי למובייל",
      "תעודת SSL מובנית",
      "קישורים לרשתות חברתיות",
      "WhatsApp קישור ישיר להתכתבות ב "
    ]
  },
  {
    name: "חבילה מקצועית",
    price: "2,999",
    originalPrice: "3,500",
    discount: "14%",
    duration: "זמן מחירון: 10 ימי עסקים",
    features: [
      "חמש בלוקים",
      "הצגת העסק בצורה מפורטת ומקצועית",
      "תמונות ללא הגבלה + עיצוב",
      "אינטגרציה מקצועית לכל צורך",
      "תעודת SSL מובנית",
      "קישורים לרשתות חברתיות",
      "WhatsApp קישור ישיר להתכתבות ב ",
      "טופס מילוי פרטים"
    ]
  }
];

const marketingPlans = [
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
      "Google Search Console הגדרת",
      "Google Analytics הגדרת"
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
      "Google Analytics חיבור וניטור",
      "התקנת מעקב המרות",
      "Search Data ניתוח נתוני",
      "אופטימיזציה שוטפת של הקמפיינים"
    ]
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
    name: "קידום ממומן בפייסבוק ואינסטגרם",
    price: "1,500",
    originalPrice: "1,750",
    discount: "15%",
    features: [
      "Meta ניהול קמפיינים ממומנים בפלטפורמות",
      "אסטרטגיית פרסום מותאמת אישית",
      "הקמת קמפיינים ממוקדי מטרה",
      "הגדרת קהלים מותאמים",
      "התקנת פיקסל ומעקב המרות",
      "אופטימיזציה שוטפת",
      "ניתוח ביצועים מקיף"
    ],
    extraNote: "אפשרות לניהול דף פייסבוק עסקי בתוספת של ₪1,000"
  }
];

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    type: "hosting" | "marketing";
  } | null>(null);

  const handlePlanSelect = (plan: typeof selectedPlan) => {
    setSelectedPlan(plan);
  };

  return (
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text"> חבילות ומחירים </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            בחרו את החבילה המושלמת לקידום העסק שלכם
          </p>
        </div>

        <Tabs defaultValue="marketing" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="hosting">דפי נחיתה בהתאמה אישית</TabsTrigger>
            <TabsTrigger value="marketing">שירותי שיווק בדיגיטל </TabsTrigger>
          </TabsList>

          <TabsContent value="hosting" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">מחירי השיווק מיוחדים - בתוקף עד 28.2.25 בלבד</h3>
              <p className="text-muted-foreground">
                בואו להפוך את העסק שלכם למגנט לידים עם נראות מקצועית כמו של החברות הגדולות בהתאמה אישית
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-none md:flex md:flex-row-reverse gap-8">
              {hostingPlans.map((plan, index) => (
                <Card 
                  key={index}
                  className={`relative card-hover text-right md:w-1/3 ${
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
                      <div className="space-y-1">
                        <div className="text-4xl font-bold gradient-text">₪{plan.price}</div>
                        <div className="text-destructive font-medium">חיסכון של {plan.discount}</div>
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
                      onClick={() => handlePlanSelect({
                        name: plan.name,
                        price: plan.price,
                        type: "hosting"
                      })}
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
              <h3 className="text-2xl font-bold mb-2">מחירי השיווק מיוחדים - בתוקף עד 28.2.25 בלבד</h3>
              <p className="text-muted-foreground text-base lg:text-lg whitespace-normal">
                רוצים להגדיל את החשיפה של העסק שלכם ולהגיע
                <br />
                ?ללקוחות חדשים
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-none lg:flex lg:flex-row-reverse gap-8">
              {marketingPlans.map((plan, index) => (
                <Card 
                  key={index}
                  className={`relative card-hover text-right lg:w-1/4 ${
                    plan.popular ? 'border-primary shadow-lg scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 right-4 bg-gradient-to-r from-primary to-accent px-4 py-1 rounded-full text-primary-foreground text-sm font-medium">
                      הכי פופולרי
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-xl lg:text-2xl whitespace-normal">{plan.name}</CardTitle>
                    <div className="mt-4 space-y-2">
                      <div className="text-muted-foreground line-through whitespace-nowrap">₪{plan.originalPrice}</div>
                      <div className="space-y-1">
                        <div className="text-4xl font-bold gradient-text whitespace-nowrap">₪{plan.price}</div>
                        <div className="text-destructive font-medium whitespace-nowrap">חיסכון של {plan.discount}</div>
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
                          <span className="whitespace-normal text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.extraNote && (
                      <div className="mt-6 p-4 bg-primary/10 rounded-lg text-sm whitespace-normal">
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
                      onClick={() => handlePlanSelect({
                        name: plan.name,
                        price: plan.price,
                        type: "marketing"
                      })}
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
      
      {selectedPlan && (
        <ContactDialog
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          planType={selectedPlan.type}
        />
      )}
    </section>
  );
}