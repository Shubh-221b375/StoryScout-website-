import type { PrivateTourInquiryPayload } from "@shared/types";

export async function appendPrivateTourToGoogleSheet(
  data: PrivateTourInquiryPayload,
  submittedAt: string,
): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim();
  if (!webhookUrl) return;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, submittedAt }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Google Sheet webhook failed (${response.status}): ${text}`);
  }
}
