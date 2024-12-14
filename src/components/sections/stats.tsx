import { Card } from "@/components/ui/card";
import { ClipboardCheck, PhoneIncoming, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "ליווי אישי",
    label: "תכנית שיווקית מותאמת לעסק",
  },
  {
    icon: PhoneIncoming,
    value: "זמינות",
    label: "מענה מהיר ומקצועי",
  },
  {
    icon: ClipboardCheck,
    value: "שקיפות",
    label: "דוחות ביצועים חודשיים",
  }
];

export function Stats() {
  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">הערכים המובילים אותנו</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          העקרונות שמנחים אותנו בליווי הלקוחות שלנו
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="p-8 text-center card-hover bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center transform hover:scale-110 transition-transform">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-5xl font-bold gradient-text mb-4">{stat.value}</div>
              <div className="font-medium text-xl mb-3">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}