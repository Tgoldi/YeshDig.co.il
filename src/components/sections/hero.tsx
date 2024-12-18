import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "+972515353948";
const WHATSAPP_MESSAGE = "היי, ביקרתי באתר ואשמח לשמוע פרטים נוספים על השירותים שלכם";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center pt-20 pb-12">
      <div className="absolute inset-0 bg-gradient-to-l from-background/95 to-background/50" />

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div 
            className="w-full space-y-6 lg:space-y-8 text-center lg:text-right order-2 lg:order-1"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
              variants={item}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                יש תוצאות
              </motion.span>
              <motion.span 
                className="gradient-text block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                בדיגיטל
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-none mx-auto lg:mx-0"
              variants={item}
            >
              מתמחים בקידום אתרים אורגנית וממומן במגוון פלטפורמות. אצלנו תוכלו למצוא גם הקמת אתרים ודפי נחיתה.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={item}
            >
              <Button 
                size="lg" 
                className="text-lg group button-hover bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={scrollToContact}
              >
                קבל ייעוץ חינם
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg button-hover border-2 hover:bg-accent/50"
                onClick={openWhatsApp}
              >
                דבר איתנו בWhatsApp
                <MessageCircle className="mr-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 pt-4 border rounded-xl border-primary/20 p-4 bg-background/50 backdrop-blur-sm"
              variants={container}
            >
              {[
                { value: "מעטפת כוללת", label: "" },
                { value: "98%", label: "לקוחות מרוצים" },
                { value: "Value", label: "for Money" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className={`flex flex-col items-center justify-center card-hover p-4 rounded-lg border-2 border-transparent bg-transparent [background-clip:padding-box] relative
                    before:absolute before:inset-0 before:-z-10 before:m-[-2px] before:rounded-lg before:bg-gradient-to-r before:from-primary before:to-accent
                    ${index === 0 ? 'col-span-2 md:col-span-1 md:flex md:items-center md:justify-center' : 'col-span-1'}`}
                  variants={item}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 flex items-center justify-center w-full text-foreground
                      ${index === 0 ? 'text-right md:text-center' : ''}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className={`stats-label text-sm sm:text-base w-full ${index === 0 ? 'text-right md:text-center' : 'text-center'}`}>
                    <span className="text-shadow-sm">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Video */}
          <motion.div 
            className="w-full max-w-2xl lg:max-w-none mx-auto order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-md overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
              <div className="relative">
                <video 
                  className="w-full h-full object-cover bg-white dark:bg-black"
                  autoPlay
                  muted
                  playsInline
                >
                  <source src="/LogoAni1_1.webm" type="video/webm" />
                </video>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}