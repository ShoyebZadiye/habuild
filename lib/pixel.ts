declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const pixelEvent = (event: string, data?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, data);
  }
};
