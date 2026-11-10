// Basic anti-spam checks for the public lead forms.
// These run in the browser, so they stop form-filling bots and accidental
// floods, not someone calling the lead API directly.

const STORAGE_KEY = "lead_submissions";
const WINDOW_MS = 60 * 60 * 1000; // one hour
const DEFAULT_MAX_PER_HOUR = 5;
const MIN_FILL_MS = 3000; // a person cannot fill the form faster than this

// Name of the hidden honeypot field. People never see it; bots fill it.
export const HONEYPOT_FIELD = "hp_extra_info";

function maxPerHour(): number {
  const raw = Number(import.meta.env.VITE_LEAD_MAX_PER_HOUR);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_MAX_PER_HOUR;
}

function readRecent(now: number): number[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed)
      ? parsed.filter((t) => typeof t === "number" && now - t < WINDOW_MS)
      : [];
  } catch {
    return [];
  }
}

export type LeadCheck = "ok" | "bot" | "limited";

// Decide whether a submission may be sent.
// "bot": pretend success and send nothing. "limited": tell the user to wait.
export function checkLead(honeypotValue: string | undefined, startedAt: number): LeadCheck {
  if (honeypotValue && honeypotValue.trim() !== "") return "bot";
  const now = Date.now();
  if (now - startedAt < MIN_FILL_MS) return "bot";
  if (readRecent(now).length >= maxPerHour()) return "limited";
  return "ok";
}

// Remember a successful submission for the hourly cap.
export function recordLead(): void {
  try {
    const now = Date.now();
    const recent = readRecent(now);
    recent.push(now);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
  } catch {
    // storage unavailable: nothing to record
  }
}
