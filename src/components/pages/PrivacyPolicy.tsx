import { Helmet } from "react-helmet-async";

export function PrivacyPolicy() {
    return (
        <>
            <Helmet>
                <title>מדיניות פרטיות - יש דיגיטל</title>
                <meta name="description" content="מדיניות הפרטיות של יש דיגיטל - כיצד אנו אוספים, שומרים ומשתמשים במידע" />
            </Helmet>

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-center">מדיניות פרטיות</h1>

                <div className="prose prose-lg max-w-none">
                    <p className="mb-6">
                        אנו מכבדים את פרטיות המשתמשים באתר זה. מטרת מדיניות פרטיות זו היא להבהיר כיצד אנו אוספים, שומרים ומשתמשים במידע שמתקבל דרך האתר.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">איסוף מידע אישי</h2>
                    <p className="mb-6">
                        אנו אוספים מידע אישי שנמסר על ידי המשתמשים באופן יזום, כגון שם, טלפון וכתובת דוא"ל, כאשר הם ממלאים את טופס יצירת הקשר באתר.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">שימוש במידע</h2>
                    <p className="mb-4">המידע שנאסף ישמש אך ורק למטרות הבאות:</p>
                    <ul className="list-disc mr-8 mb-6">
                        <li>יצירת קשר עם המשתמש בהתאם לבקשתו.</li>
                        <li>מתן מידע נוסף על שירותי העסק.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">שמירה ואבטחת מידע</h2>
                    <p className="mb-6">
                        אנו נוקטים צעדים סבירים כדי לשמור על המידע האישי של המשתמשים מוגן ובטוח. המידע לא יועבר לצדדים שלישיים ללא הסכמת המשתמש, אלא אם כן הדבר נדרש על פי חוק.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">זכויות המשתמשים</h2>
                    <p className="mb-4">למשתמשים יש זכות:</p>
                    <ul className="list-disc mr-8 mb-6">
                        <li>לבקש עיון במידע שנאסף עליהם.</li>
                        <li>לדרוש תיקון או מחיקה של המידע האישי.</li>
                        <li>לפנות אלינו בבקשות נוספות הקשורות למידע האישי באמצעות פרטי הקשר המופיעים באתר.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
                    <p className="mb-6">
                        באתר ייתכן שימוש ב-Cookies לשיפור חוויית המשתמש. המשתמש יכול להגדיר את דפדפנו לסרב לשימוש ב-Cookies, אם ירצה בכך.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">עדכונים למדיניות פרטיות זו</h2>
                    <p className="mb-6">
                        אנו שומרים את הזכות לעדכן מדיניות זו מעת לעת. כל שינוי יפורסם בעמוד זה.
                    </p>

                    <div className="mt-12 p-6 bg-gray-100 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">פרטי יצירת קשר</h2>
                        <p>לשאלות או פניות בנושא מדיניות הפרטיות, ניתן ליצור איתנו קשר:</p>
                        <p className="mt-2">טלפון: 051-5353948</p>
                        <p>דוא"ל: yaniv@yeshdigital.co.il</p>
                    </div>
                </div>
            </div>
        </>
    );
} 