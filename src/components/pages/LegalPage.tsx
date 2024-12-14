import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

export function LegalPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>מדיניות פרטיות ותנאי שימוש - יש דיגיטל</title>
                <meta name="description" content="מדיניות הפרטיות ותנאי השימוש באתר יש דיגיטל" />
            </Helmet>

            <ScrollArea className="h-[calc(100vh-4rem)] pt-20" dir="rtl">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-right"
                    >
                        {/* Privacy Policy Section */}
                        <section className="mb-16">
                            <h1 className="text-4xl font-bold mb-8 text-center">מדיניות פרטיות</h1>

                            <div className="prose prose-lg max-w-none">
                                <p className="mb-6">
                                    אנו מכבדים את פרטיות המשתמשים באתר זה. מטרת מדיניות פרטיות זו היא להבהיר כיצד אנו אוספים, שומרים ומשתמשים במידע שמתקבל דרך האתר.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">איסוף מידע אישי</h2>
                                        <p>
                                            אנו אוספים מידע אישי שנמסר על ידי המשתמשים באופן יזום, כגון שם, טלפון וכתובת דוא"ל, כאשר הם ממלאים את טופס יצירת הקשר באתר.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">שימוש במידע</h2>
                                        <p>המידע שנאסף ישמש אך ורק למטרות הבאות:</p>
                                        <ul className="list-disc pr-6 mt-2">
                                            <li>יצירת קשר עם המשתמש בהתאם לבקשתו.</li>
                                            <li>מתן מידע נוסף על שירותי העסק.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">שמירה ואבטחת מידע</h2>
                                        <p>
                                            אנו נוקטים צעדים סבירים כדי לשמור על המידע האישי של המשתמשים מוגן ובטוח. המידע לא יועבר לצדדים שלישיים ללא הסכמת המשתמש, אלא אם כן הדבר נדרש על פי חוק.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">זכויות המשתמשים</h2>
                                        <p>למשתמשים יש זכות:</p>
                                        <ul className="list-disc pr-6 mt-2">
                                            <li>לבקש עיון במידע שנאסף עליהם.</li>
                                            <li>לדרוש תיקון או מחיקה של המידע האישי.</li>
                                            <li>לפנות אלינו בבקשות נוספות הקשורות למידע האישי באמצעות פרטי הקשר המופיעים באתר.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
                                        <p>
                                            באתר ייתכן שימוש ב-Cookies לשיפור חוויית המשתמש. המשתמש יכול להגדיר את דפדפנו לסרב לשימוש ב-Cookies, אם ירצה בכך.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">עדכונים למדיניות פרטיות זו</h2>
                                        <p>
                                            אנו שומרים את הזכות לעדכן מדיניות זו מעת לעת. כל שינוי יפורסם בעמוד זה.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Terms of Use Section */}
                        <section className="mt-16 pt-16 border-t border-primary/10">
                            <h1 className="text-4xl font-bold mb-8 text-center">תנאי שימוש</h1>

                            <div className="prose prose-lg max-w-none">
                                <p className="mb-6">
                                    ברוכים הבאים לאתר שלנו. השימוש באתר זה כפוף לתנאים המפורטים להלן:
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">שימוש באתר</h2>
                                        <p>
                                            המידע המופיע באתר זה נועד לספק מידע על שירותי העסק בלבד. השימוש באתר מהווה הסכמה לתנאים המפורטים כאן.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">הסתייגות מאחריות</h2>
                                        <p>
                                            המידע באתר נכון לעת פרסומו, אך אנו שומרים על הזכות לעדכנו בכל עת. העסק אינו אחראי לטעויות, שגיאות או אי-דיוקים במידע המוצג באתר.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">קניין רוחני</h2>
                                        <p>
                                            כל התכנים באתר, לרבות טקסטים, תמונות ועיצובים, הם רכוש העסק ומוגנים בזכויות יוצרים. אין להעתיק, לשכפל או להשתמש בתכנים ללא אישור בכתב מאיתנו.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">קישורים חיצוניים</h2>
                                        <p>
                                            האתר עשוי לכלול קישורים לאתרים חיצוניים. איננו אחראים על תוכן האתרים הללו או על פעילותם.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">שינויים בתנאי השימוש</h2>
                                        <p>
                                            אנו שומרים לעצמנו את הזכות לשנות או לעדכן תנאים אלה בכל עת וללא הודעה מוקדמת.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Contact Information */}
                        <div className="mt-16 p-6 bg-muted rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4">פרטי יצירת קשר</h2>
                            <p>לשאלות או פניות בנושא מנאי השימוש ומדיניות הפרטיות, ניתן ליצור איתנו קשר:</p>
                            <div className="mt-4 space-y-2">
                                <p>
                                    <span className="inline-block ml-2 font-medium">טלפון:</span>
                                    <span className="inline-block">051-5353948</span>
                                </p>
                                <p>
                                    <span className="inline-block ml-2 font-medium">דוא"ל:</span>
                                    <span className="inline-block">yaniv@yeshdigital.co.il</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </ScrollArea>
        </>
    );
} 