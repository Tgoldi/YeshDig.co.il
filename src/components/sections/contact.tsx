import { useRef, useState } from "react";
import { HONEYPOT_FIELD, checkLead, recordLead } from "@/lib/lead-guard";
import { postLead } from "@/lib/lead-submit";
import { LeadCaptcha, type LeadCaptchaHandle, captchaEnabled } from "@/components/lead-captcha";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail } from "lucide-react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "השם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().min(10, "מספר טלפון לא תקין").max(10, "מספר טלפון לא תקין"),
  message: z.string().min(10, "ההודעה חייבת להכיל לפחות 10 תווים"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef<number>(Date.now());
  const captchaRef = useRef<LeadCaptchaHandle>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const check = checkLead(honeypotRef.current?.value, startedAtRef.current);
    if (check === "bot") {
      reset();
      toast.success("ההודעה נשלחה בהצלחה!");
      return;
    }
    if (check === "limited") {
      toast.error('נשלחו יותר מדי פניות. אנא נסו שוב מאוחר יותר.');
      return;
    }
    const captchaToken = captchaRef.current?.getToken() ?? "";
    if (captchaEnabled && !captchaToken) {
      toast.error('אנא השלימו את אימות האבטחה ונסו שנית.');
      return;
    }
    setIsSubmitting(true);
    try {
      if (import.meta.env.VITE_LEAD_ENDPOINT) {
        // Lead goes by POST to the site's own relay, which holds the fixdigital IDs
        await postLead(import.meta.env.VITE_LEAD_ENDPOINT, {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          captchaToken,
          honeypot: honeypotRef.current?.value ?? "",
        });
      } else {
        const apiUrl = `https://www.fixdigital.co.il/api/v1.2/lead/addApi?projectID=11860&projectTypeID=10&clientID=21350&tenantID=7768&FORMURL=${encodeURIComponent(window.location.href)}&URLREFER=${encodeURIComponent(document.referrer)}&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&channelid=website&message=${encodeURIComponent(data.message)}&source=website`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
      }
      
      recordLead();
      reset();
      toast.success("ההודעה נשלחה בהצלחה!");
    } catch (error) {
      toast.error('שגיאה בשליחת הטופס. אנא נסו שנית.');
    } finally {
      // A captcha token works once; get a fresh one for the next send
      captchaRef.current?.reset();
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/50 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 gradient-text">צור קשר</h2>
              <p className="text-muted-foreground text-lg">
                נשמח לשמוע ממך ולעזור לך להגדיל את העסק שלך
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-4 rounded-xl bg-card/50 backdrop-blur-sm">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-lg mb-1">טלפון</div>
                  <a href="tel:+972501234567" className="text-muted-foreground hover:text-primary">051-5353-948</a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 rounded-xl bg-card/50 backdrop-blur-sm">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-lg mb-1">אימייל</div>
                  <a href="mailto:yaniv@yeshdigital.co.il" className="text-muted-foreground hover:text-primary">yaniv@yeshdigital.co.il</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-primary/10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <input
                ref={honeypotRef}
                type="text"
                name={HONEYPOT_FIELD}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  {...register("name")}
                  placeholder="שם מלא" 
                  className="bg-background/50 border-primary/20 focus:border-primary"
                />
                <Input 
                  {...register("email")}
                  type="email" 
                  placeholder="אימייל"
                  className="bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <Input 
                  {...register("phone")}
                  placeholder="טלפון"
                  className="bg-background/50 border-primary/20 focus:border-primary"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Textarea 
                  {...register("message")}
                  placeholder="הודעה" 
                  className="min-h-[150px] bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>
              <LeadCaptcha ref={captchaRef} />
              <Button 
                type="submit" 
                className="w-full button-hover bg-gradient-to-r from-primary to-accent hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "שולח..." : "שלח"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;