import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { PreLoader } from "@/components/PreLoader";
import { Helmet } from "react-helmet-async";
import { PrivacyPolicy } from "@/components/pages/PrivacyPolicy";
import { TermsOfUse } from "@/components/pages/TermsOfUse";

// This will be used for SSG
export async function onBeforeRender() {
  return {
    pageContext: {
      // This will be available during SSG
      pageProps: {
        title: "יש דיגיטל - פתרונות דיגיטל מתקדמים לעסקים",
        description: "סוכנות דיגיטל מובילה המתמחה בקידום אתרים, פרסום ממומן וניהול מדיה חברתית",
        url: "https://yesdigital.co.il",
      },
    },
  };
}

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Stats />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a timeout as fallback
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds maximum loading time

    window.addEventListener('load', () => {
      setIsLoading(false);
      clearTimeout(timeoutId);
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', () => setIsLoading(false));
    };
  }, []);

  return (
    <Router>
      <Helmet>
        <html lang="he" dir="rtl" />
        <title>יש דיגיטל - פתרונות דיגיטל מתקדמים לעסקים</title>
        <meta name="description" content="סוכנות דיגיטל מובילה המתמחה בקידום אתרים, פרסום ממומן וניהול מדיה חברתית. אנו מספקים פתרונות דיגיטליים מקיפים להצלחת העסק שלך." />
        <meta name="keywords" content="קידום אתרים, פרסום ממומן, שיווק דיגיטלי, ניהול מדיה חברתית, קידום בגוגל, פרסום בפייסבוק" />
        <meta name="author" content="יש דיגיטל" />
        <link rel="canonical" href="https://yesdigital.co.il" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="יש דיגיטל - פתרונות דיגיטל מתקדמים" />
        <meta property="og:description" content="סוכנות דיגיטל מובילה המתמחה בקידום אתרים, פרסום ממומן וניהול מדיה חברתית" />
        <meta property="og:image" content="/yes-digital-logo.svg" />
        <meta property="og:url" content="https://yesdigital.co.il" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="יש דיגיטל - פתרונות דיגיטל מתקדמים" />
        <meta name="twitter:description" content="סוכנות דיגיטל מובילה המתמחה בקידום אתרים, פרסום ממומן וניהול מדיה חברתית" />
        <meta name="twitter:image" content="/yes-digital-logo.svg" />

        {/* Preload critical assets */}
        <link rel="preload" href="/yes-digital-logo.svg" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Helmet>

      <PreLoader />
      <div className={`min-h-screen bg-background text-foreground ${isLoading ? 'hidden' : ''}`}>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}