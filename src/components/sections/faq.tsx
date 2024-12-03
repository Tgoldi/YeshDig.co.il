import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "למה חברות אחרות מבטיחות תוצאות מהירות ואתם לא?",
    answer: "קידום אורגני (SEO) מקצועי דורש מחקר מילים, אופטימיזציית תוכן וחקר שוק מעמיק. אנו מאמינים בשקיפות ובבניית נוכחות דיגיטלית יציבה, תוך הצגת האמת על התהליך והזמן הנדרש. גוגל מתגמל עבודה מקצועית ויסודית – וזו הדרך שלנו."
  },
  {
    question: "האם אתם מתחייבים למיקום ראשון בגוגל?",
    answer: "איננו מתחייבים למיקום ספציפי בגוגל כי זה לא אתי ולא מציאותי. אנחנו מתחייבים לעבודה מקצועית ושקופה שתביא לשיפור משמעותי בדירוג האתר ולאופטימיזציה מתמדת. אנו שולחים דוחות חודשיים לכל בעל עסק שעובד איתנו לטובת הנושא."
  },
  {
    question: "האם אפשר להפסיק את השירות?",
    answer: "בקידום אורגני (SEO) נדרשת התחייבות למינימום חודשים בגלל אופי העבודה והתהליכים ארוכי הטווח. עם זאת, אפשר לסיים את ההתקשרות בכפוף לתנאי החוזה. בשירותים אחרים יש גמישות רבה יותר."
  },
  {
    question: "מה כולל הליווי השוטף שלכם?",
    answer: "הליווי כולל דוחות ביצועים חודשיים, פגישות סטטוס קבועות לבחינת התקדמות והתאמת אסטרטגיה, מענה שוטף לשאלות ועדכונים. אנחנו עוקבים אחר שינויים בשוק ומתאימים את האסטרטגיה בהתאם למגמות ואירועים רלוונטיים."
  },
  {
    question: "האם מקבלים דוחות ביצועים?",
    answer: "כל לקוח מקבל דוח חודשי מפורט הכולל מדדי ביצוע עיקריים והמלצות לשיפור."
  },
  {
    question: "כמה זמן עד שרואים תוצאות בקמפיינים ממומנים?",
    answer: "בקמפיינים ממומנים התנועה מתחילה מיד עם הפעלת הקמפיין. עם זאת, לקבלת תוצאות אופטימליות נדרש תהליך למידה ואופטימיזציה של 2-3 שבועות בהם אנו מכוונים את הקמפיין לקהלים המתאימים ביותר ,משפרים את יחס ההמרה ונותנים לאלגוריתמים השונים להכיר את התוכן שלנו ולנתב אותו."
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">שאלות נפוצות</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            התשובות לשאלות הנפוצות ביותר
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-sm rounded-lg border border-primary/10 px-6 text-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="hover:text-primary transition-colors py-4 text-lg text-right w-full justify-end flex-row-reverse">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-right">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}