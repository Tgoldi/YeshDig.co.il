import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

const contactSchema = z.object({
    name: z.string().min(2, "השם חייב להכיל לפחות 2 תווים"),
    email: z.string().email("כתובת אימייל לא תקינה"),
    phone: z.string().min(9, "מספר טלפון לא תקין"),
    message: z.string().min(10, "ההודעה חייבת להכיל לפחות 10 תווים"),
    plan: z.string(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactDialogProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    planPrice: string;
    planType: "hosting" | "marketing";
}

export function ContactDialog({ isOpen, onClose, planName, planPrice, planType }: ContactDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            plan: `${planType} - ${planName} - ₪${planPrice}`,
        }
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('https://formspree.io/f/mrbgylra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    _subject: `בקשת הצעת מחיר - ${planName}`
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Network response was not ok');
            }

            const result = await response.json();
            if (result.ok) {
                reset();
                toast.success("ההודעה נשלחה בהצלחה!");
                onClose();
            }
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error("שגיאה בשליחת הטופס. אנא נסו שנית.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-right">בקשת הצעת מחיר - {planName}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input type="hidden" {...register("plan")} />

                    <div>
                        <Input
                            {...register("name")}
                            placeholder="שם מלא"
                            className="text-right"
                        />
                    </div>

                    <div>
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="אימייל"
                            className="text-right"
                        />
                    </div>

                    <div>
                        <Input
                            {...register("phone")}
                            placeholder="טלפון"
                            className="text-right"
                        />
                    </div>

                    <div>
                        <Textarea
                            {...register("message")}
                            placeholder="הודעה"
                            className="text-right min-h-[100px]"
                            defaultValue={`מעוניין לשמוע פרטים נוספים על ${planName}`}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full button-hover bg-gradient-to-r from-primary to-accent hover:opacity-90"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "שולח..." : "שלח בקשה"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
} 