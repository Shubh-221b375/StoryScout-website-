import { useEffect, useMemo, useState } from "react";
import { ArrowUp, Instagram } from "lucide-react";
import { companyConfig } from "@/lib/companyConfig";

function buildWhatsAppUrl(message: string) {
  try {
    const url = new URL(companyConfig.social.whatsappLink);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    // Fallback if URL parsing fails for any reason
    return `${companyConfig.social.whatsappLink}?text=${encodeURIComponent(message)}`;
  }
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = useMemo(
    () =>
      buildWhatsAppUrl(
        "Hi StoryScout! I want to enquire / book a package. Please share details.",
      ),
    [],
  );

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-center gap-3">
      {/* WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
        className="h-14 w-14 rounded-xl bg-[#25D366] shadow-lg hover:shadow-xl transition-shadow grid place-items-center"
      >
        {/* Simple WhatsApp mark (inline SVG to avoid extra deps) */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M16 3C9.372 3 4 8.104 4 14.4c0 2.43.797 4.684 2.158 6.54L5 29l8.553-1.064A12.64 12.64 0 0 0 16 25.8c6.628 0 12-5.104 12-11.4S22.628 3 16 3Z"
            fill="#fff"
            fillOpacity="0.0"
          />
          <path
            d="M16 5.2c-5.37 0-9.72 4.095-9.72 9.2 0 2.07.73 3.98 1.96 5.5l-.78 4.08 4.28-.54a10.47 10.47 0 0 0 4.26.9c5.37 0 9.72-4.095 9.72-9.2S21.37 5.2 16 5.2Z"
            fill="#fff"
            fillOpacity="0.18"
          />
          <path
            d="M22.01 18.76c-.25.7-1.23 1.33-2.02 1.5-.54.11-1.24.2-3.6-.72-3.02-1.18-4.96-4.13-5.11-4.32-.14-.18-1.23-1.52-1.23-2.9 0-1.37.77-2.04 1.04-2.32.27-.28.6-.35.8-.35h.58c.19 0 .45-.05.7.52.25.58.84 1.99.92 2.14.08.15.13.33.03.52-.1.2-.15.33-.3.5-.14.18-.3.4-.42.53-.15.16-.31.34-.14.62.17.28.76 1.22 1.64 1.98 1.12.95 2.06 1.24 2.36 1.38.3.13.48.11.66-.08.18-.2.76-.84.96-1.12.2-.28.4-.24.67-.14.27.1 1.7.74 1.99.88.29.14.48.22.55.34.07.12.07.7-.18 1.4Z"
            fill="#fff"
          />
        </svg>
      </a>

      {/* Instagram */}
      <a
        href={companyConfig.social.instagramLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Instagram"
        title="Instagram"
        className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] shadow-lg hover:shadow-xl transition-shadow grid place-items-center"
      >
        <Instagram className="h-7 w-7 text-white" />
      </a>

      {/* Scroll to top */}
      {showTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          title="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
          className="h-12 w-12 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow grid place-items-center border border-border"
        >
          <ArrowUp className="w-6 h-6 text-red-500" />
        </button>
      )}
    </div>
  );
}


