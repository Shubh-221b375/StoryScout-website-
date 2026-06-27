import { companyConfig } from "./companyConfig";

export function buildWhatsAppUrl(message: string): string {
  try {
    const url = new URL(companyConfig.social.whatsappLink);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return `${companyConfig.social.whatsappLink}?text=${encodeURIComponent(message)}`;
  }
}
