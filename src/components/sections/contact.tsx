import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, "השם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string()
    .min(10, "מספר טלפון לא תקין")
    .max(10, "מספר טלפון לא תקין"),
  message: z.string().min(10, "ההודעה חייבת להכיל לפחות 10 תווים"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const formUrl = window.location.href;
      const urlRefer = document.referrer;
      const channelId = "website";

      const apiUrl = `https://www.fixdigital.co.il/api/v1.2/lead/addApi?projectID=11860&projectTypeID=10&clientID=21350&tenantID=7768&FORMURL=${encodeURIComponent(formUrl)}&URLREFER=${encodeURIComponent(urlRefer)}&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&channelid=${encodeURIComponent(channelId)}&message=${encodeURIComponent(data.message)}&source=website`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseText = await response.text();
      let result;
      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        result = { success: true };
      }
      
      setIsSuccess(true);
      reset();
      toast.success("ההודעה נשלחה בהצלחה!");
    } catch (error) {
      toast.error('שגיאה בשליחת הטופס. אנא נסו שנית.');
    } finally {
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
              <div className="flex items-center gap-6 p-4 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-lg mb-1">טלפון</div>
                  <a href="tel:+972501234567" className="text-muted-foreground hover:text-primary transition-colors">051-5353-948</a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-lg mb-1">אימייל</div>
                  <a href="mailto:yaniv@yeshdigital.co.il" className="text-muted-foreground hover:text-primary transition-colors">yaniv@yeshdigital.co.il</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-primary/10">
            <AnimatePresence>
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-medium"
                  >
                    ההודעה נשלחה בהצלחה!
                  </motion.p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Anti-spam honeypot */}
                  <input type="text" name="_honey" style={{ display: 'none' }} />
                  
                  {/* Disable captcha */}
                  <input type="hidden" name="_captcha" value="false" />
                  
                  {/* Success page redirect */}
                  <input type="hidden" name="_next" value={window.location.href} />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input 
                        {...register("name")}
                        placeholder="שם מלא" 
                        className="bg-background/50 border-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        {...register("email")}
                        type="email" 
                        placeholder="אימייל"
                        className="bg-background/50 border-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Input 
                      {...register("phone")}
                      placeholder="טלפון"
                      className="bg-background/50 border-primary/20 focus:border-primary"
                      required
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
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full button-hover bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "שולח..." : "שלח"}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}