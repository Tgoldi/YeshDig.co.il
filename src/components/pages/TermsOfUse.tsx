import { Helmet } from "react-helmet-async";

export function TermsOfUse() {
    return (
        <>
            <Helmet>
                <title>תנאי שימוש - יש דיגיטל</title>
                <meta name="description" content="תנאי השימוש באתר יש דיגיטל" />
            </Helmet>

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-center">תנאי שימוש</h1>

                <div className="prose prose-lg max-w-none">
                    <p className="mb-6">
                        ברוכים הבאים לאתר שלנו. השימוש באתר זה כפוף לתנאים המפורטים להלן:
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">שימוש באתר</h2>
                    <p className="mb-6">
                        המידע המופיע באתר זה נועד לספק מידע על שירותי העסק בלבד. השימוש באתר מהווה הסכמה לתנאים המפורטים כאן.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">הסתייגות מאחריות</h2>
                    <p className="mb-6">
                        המידע באתר נכון לעת פרסומו, אך אנו שומרים על הזכות לעדכנו בכל עת. העסק אינו אחראי לטעויות, שגיאות או אי-דיוקים במידע המוצג באתר.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">קניין רוחני</h2>
                    <p className="mb-6">
                        כל התכנים באתר, לרבות טקסטים, תמונות ועיצובים, הם רכוש העסק ומוגנים בזכויות יוצרים. אין להעתיק, לשכפל או להשתמש בתכנים ללא אישור בכתב מאיתנו.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">קישורים חיצוניים</h2>
                    <p className="mb-6">
                        האתר עשוי לכלול קישורים לאתרים חיצוניים. איננו אחראים על תוכן האתרים הללו או על פעילותם.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">שינויים בתנאי השימוש</h2>
                    <p className="mb-6">
                        אנו שומרים לעצמנו את הזכות לשנות או לעדכן תנאים אלה בכל עת וללא הודעה מוקדמת.
                    </p>

                    <div className="mt-12 p-6 bg-gray-100 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">פרטי יצירת קשר</h2>
                        <p>לשאלות או פניות בנושא תנאי השימוש, ניתן ליצור איתנו קשר:</p>
                        <p className="mt-2">טלפון: 051-5353948</p>
                        <p>דוא"ל: yaniv@yeshdigital.co.il</p>
                    </div>
                </div>
            </div>
        </>
    );
} 