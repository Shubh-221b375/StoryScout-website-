import type { PrivateTourInquiryPayload } from "@shared/types";

export async function appendPrivateTourToGoogleSheet(
  data: PrivateTourInquiryPayload,
  submittedAt: string,
): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    throw new Error("GOOGLE_SHEET_WEBHOOK_URL is not configured on the server");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, submittedAt }),
    redirect: "follow",
  });

  const text = await response.text().catch(() => "");

  if (!response.ok) {
    throw new Error(
      `Google Sheet webhook failed (${response.status}): ${text.slice(0, 200)}`,
    );
  }

  try {
    const payload = JSON.parse(text) as { ok?: boolean; error?: string };
    if (payload.ok === false) {
      throw new Error(payload.error || "Google Sheet script returned ok: false");
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("ok: false")) {
      throw error;
    }
    // Non-JSON success bodies are acceptable for some deployments.
  }
}
