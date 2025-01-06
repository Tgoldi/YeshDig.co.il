import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { PreLoader } from "@/components/PreLoader";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/hero";

// Lazy load other components with prefetch
const Services = React.lazy(() => import("@/components/sections/services"));
const About = React.lazy(() => import("@/components/sections/about"));
const Stats = React.lazy(() => import("@/components/sections/stats"));
const Pricing = React.lazy(() => import("@/components/sections/pricing"));
const FAQ = React.lazy(() => import("@/components/sections/faq"));
const Contact = React.lazy(() => import("@/components/sections/contact"));
const LegalPage = React.lazy(() => import("@/components/pages/LegalPage"));

// Prefetch critical assets
const prefetchAssets = () => {
  const assets = ['/LogoAni1_1.gif', '/yes-digital-logo.svg'];
  assets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = asset;
    document.head.appendChild(link);
  });
};

function HomePage() {
  useEffect(() => {
    // Prefetch components in the background
    const prefetchComponents = () => {
      import("@/components/sections/services");
      import("@/components/sections/about");
      import("@/components/sections/stats");
      import("@/components/sections/pricing");
      import("@/components/sections/faq");
      import("@/components/sections/contact");
    };
    prefetchComponents();
  }, []);

  return (
    <>
      <Hero />
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Services />
        <About />
        <Stats />
        <Pricing />
        <FAQ />
        <Contact />
      </Suspense>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduce initial loading time and prefetch assets
    prefetchAssets();
    const timeoutId = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Router>
      <Helmet>
        <html lang="he" dir="rtl" />
        <title>יש דיגיטל - פתרונות דיגיטל מתקדמים לעסקים</title>
        <meta name="description" content="סוכנות דיגיטל מובילה המתמחה בקידום אתרים, פרסום ממומן וניהול מדיה חברתית. אנו מספקים פתרונות דיגיטליים מקיפים להצלחת העסק שלך." />
        <meta name="keywords" content="קידום א��רים, פרסום ממומן, שיווק דיגיטלי, ניהול מדיה חברתית, קידום בגוגל, פרסום בפייסבוק" />
        <meta name="author" content="יש דיגיטל" />
        <link rel="canonical" href="https://yesdigital.co.il" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="יש יגיטל - פתרונות דיגיטל מתקדמים" />
        <meta property="og:description" content="סוכנות דיגיטל מובילה המתמחה בקידום אתרים, פרסום ממומן וניהול מדיה חברתית" />
        <meta property="og:image" content="/yes-digital-logo.svg" />
        <meta property="og:url" content="https://yesdigital.co.il" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="יש יגיטל - פתרונות דיגיטל מתקדמים" />
        <meta name="twitter:description" content="סוכנות דיגיטל מובילה המתמחה בקידום אתרים, פרסום ממומן וניהול מדיה חברתית" />
        <meta name="twitter:image" content="/yes-digital-logo.svg" />
        <link rel="preload" href="/yes-digital-logo.svg" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" href="/yes-digital-logo.svg" as="image" />
        <link rel="preload" href="/LogoAni1_1.gif" as="image" />
        <style>{`
          .skip-to-content {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -100%;
            background: white;
            color: black;
            padding: 0.5rem 1rem;
            z-index: 100;
            transition: top 0.2s;
          }
          .skip-to-content:focus {
            top: 0;
          }
        `}</style>
      </Helmet>

      {isLoading ? (
        <PreLoader aria-label="טוען את האתר..." />
      ) : (
        <div className="min-h-screen bg-background text-foreground">
          <a href="#main" className="skip-to-content" aria-label="דלג לתוכן הראשי של האתר">
            דלג לתוכן הראשי
          </a>
          <Navbar />
          <main id="main" tabIndex={-1} aria-label="תוכן ראשי">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/legal" element={
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                }>
                  <LegalPage />
                </Suspense>
              } />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      )}
    </Router>
  );
}