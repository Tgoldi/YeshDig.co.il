// Cloudflare Turnstile widget for the lead forms.
// Shown only when the site is built with both VITE_LEAD_ENDPOINT (the server relay)
// and VITE_TURNSTILE_SITE_KEY; the relay checks the token when TURNSTILE_SECRET_KEY is set.
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || "";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export const captchaEnabled = Boolean(SITE_KEY && import.meta.env.VITE_LEAD_ENDPOINT);

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

function turnstile(): TurnstileApi | undefined {
  return (window as unknown as { turnstile?: TurnstileApi }).turnstile;
}

let scriptPromise: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (turnstile()) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("captcha script failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export interface LeadCaptchaHandle {
  getToken: () => string;
  reset: () => void;
}

export const LeadCaptcha = forwardRef<LeadCaptchaHandle>(function LeadCaptcha(_props, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenRef = useRef("");

  useImperativeHandle(ref, () => ({
    getToken: () => tokenRef.current,
    reset: () => {
      tokenRef.current = "";
      const api = turnstile();
      if (api && widgetIdRef.current) api.reset(widgetIdRef.current);
    },
  }), []);

  useEffect(() => {
    if (!captchaEnabled) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        const api = turnstile();
        if (cancelled || !api || !containerRef.current) return;
        widgetIdRef.current = api.render(containerRef.current, {
          sitekey: SITE_KEY,
          callback: (token: string) => {
            tokenRef.current = token;
          },
          "expired-callback": () => {
            tokenRef.current = "";
          },
          "error-callback": () => {
            tokenRef.current = "";
          },
        });
      })
      .catch(() => {
        // script blocked or offline: no token, the relay will refuse the lead
      });
    return () => {
      cancelled = true;
      const api = turnstile();
      if (api && widgetIdRef.current) api.remove(widgetIdRef.current);
      widgetIdRef.current = null;
      tokenRef.current = "";
    };
  }, []);

  if (!captchaEnabled) return null;
  return <div ref={containerRef} className="flex justify-center" />;
});
