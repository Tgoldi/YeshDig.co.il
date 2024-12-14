import { CheckCircle2 } from "lucide-react";

const benefits = [
  " שירות אישי ומותאם לצרכי העסק שלך",
  "זמינות גבוהה ומענה מהיר ללקוחות",
  "שקיפות מלאה ומתן דוחות חודשיים",
  "מחירים מעולים ויחס עלות-תועלת מצוין",
  "התמחות במגוון פלטפורמות דיגיטליות",
  "התאמת חבילת השירות המתאימה לעסק שלך",
];

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold gradient-text text-center">למה לבחור בנו?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              אנחנו מאמינים בשילוב של מקצועיות, חשיבה מחוץ לקופסא ושירות אישי. הצוות שלנו מורכב מאנשים מומחים בתחומם שחשוב להם הצלחת הלקוח לפני הכל.
            </p>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative group hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
            <img
              src="/new business partners shaking hands.png"
              alt="צוות העבודה שלנו"
              className="rounded-lg shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}