import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "./AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getQueryFn } from "@/lib/queryClient";
import type { SitePrivateTourInquiry } from "@shared/types";
import {
  formatPrivateTourFieldValue,
  formatPrivateTourWhatsAppMessage,
} from "@/lib/privateTourUtils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value || value === "—") return null;
  return (
    <p className="text-sm">
      <span className="text-muted-foreground">{label}: </span>
      <span>{value}</span>
    </p>
  );
}

function InquiryCard({ inquiry }: { inquiry: SitePrivateTourInquiry }) {
  const adults =
    Number(inquiry.maleAdults || 0) + Number(inquiry.femaleAdults || 0);
  const kids =
    Number(inquiry.kids0to5 || 0) + Number(inquiry.kids6to12 || 0);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <p className="font-semibold">{inquiry.fullName}</p>
              <Badge variant="secondary">Private tour</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {inquiry.email} · {inquiry.contactNumber}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(inquiry.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Traveller
              </p>
              <DetailRow label="City & state" value={inquiry.cityState} />
              <DetailRow
                label="Group"
                value={`${adults} adult${adults !== 1 ? "s" : ""}${
                  kids > 0 ? `, ${kids} kid${kids !== 1 ? "s" : ""}` : ""
                }${Number(inquiry.others || 0) > 0 ? `, ${inquiry.others} other` : ""}`}
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Trip
              </p>
              <DetailRow label="Destination" value={inquiry.primaryDestination} />
              <DetailRow
                label="Alternative"
                value={formatPrivateTourFieldValue(
                  "alternativeDestination",
                  inquiry.alternativeDestination,
                )}
              />
              <DetailRow
                label="Dates"
                value={`${inquiry.tripStartDate} · ${inquiry.numberOfDays} day${
                  inquiry.numberOfDays === "1" ? "" : "s"
                } · Flexible: ${formatPrivateTourFieldValue("flexibleDates", inquiry.flexibleDates)}`}
              />
              <DetailRow
                label="Style"
                value={formatPrivateTourFieldValue("travelStyle", inquiry.travelStyle)}
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Preferences
              </p>
              <DetailRow
                label="Budget"
                value={formatPrivateTourFieldValue("budget", inquiry.budget)}
              />
              <DetailRow
                label="Stay"
                value={formatPrivateTourFieldValue("accommodation", inquiry.accommodation)}
              />
              <DetailRow
                label="Meals"
                value={formatPrivateTourFieldValue("meals", inquiry.meals)}
              />
              <DetailRow
                label="Transport"
                value={
                  inquiry.transportNeeded === "yes"
                    ? formatPrivateTourFieldValue("transportType", inquiry.transportType)
                    : "No"
                }
              />
            </div>
          </div>

          {(inquiry.specialRequirements ||
            inquiry.preferredCallBackTime ||
            inquiry.howDidYouHear) && (
            <div className="space-y-1 border-t border-border pt-3">
              {inquiry.specialRequirements && (
                <p className="text-sm italic text-muted-foreground">
                  &ldquo;{inquiry.specialRequirements}&rdquo;
                </p>
              )}
              <DetailRow
                label="Call back"
                value={formatPrivateTourFieldValue(
                  "preferredCallBackTime",
                  inquiry.preferredCallBackTime,
                )}
              />
              <DetailRow
                label="Heard about us"
                value={formatPrivateTourFieldValue("howDidYouHear", inquiry.howDidYouHear)}
              />
            </div>
          )}
        </div>

        <Button
          size="sm"
          variant="outline"
          className="shrink-0 gap-2"
          asChild
        >
          <a
            href={buildWhatsAppUrl(formatPrivateTourWhatsAppMessage(inquiry))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}

export default function AdminPrivateTours() {
  const { data: inquiries = [] } = useQuery<SitePrivateTourInquiry[]>({
    queryKey: ["/api/admin/private-tours"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Private Tours</h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Custom trip enquiries submitted from the Private Tours form.
        </p>
      </div>

      <div className="space-y-3">
        {inquiries.map((inquiry) => (
          <InquiryCard key={inquiry.id} inquiry={inquiry} />
        ))}
        {inquiries.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            No private tour enquiries yet.
          </p>
        )}
      </div>
    </AdminLayout>
  );
}
