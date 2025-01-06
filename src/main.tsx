import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme-provider';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Auto-generated static site
if (import.meta.env.PROD) {
  const helmetContext = {};
  const app = (
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>
  );

  createRoot(document.getElementById('root')!).render(app);
} else {
  // Development mode
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}