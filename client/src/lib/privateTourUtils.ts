import type { PrivateTourInquiryPayload } from "@shared/types";

const LABELS: Record<string, Record<string, string>> = {
  flexibleDates: { yes: "Yes", no: "No" },
  transportNeeded: { yes: "Yes", no: "No" },
  travelStyle: {
    "leisure-sightseeing": "Leisure / Sightseeing",
    "adventure-trekking": "Adventure / Trekking",
    honeymoon: "Honeymoon",
    "backpacking-budget": "Backpacking / Budget",
    luxury: "Luxury",
    "spiritual-pilgrimage": "Spiritual / Pilgrimage",
    "photography-focused": "Photography-focused",
  },
  budget: {
    "under-₹10,000": "Under ₹10,000",
    "₹10,000-–-₹20,000": "₹10,000 – ₹20,000",
    "₹20,000-–-₹35,000": "₹20,000 – ₹35,000",
    "₹35,000-–-₹50,000": "₹35,000 – ₹50,000",
    "₹50,000+": "₹50,000+",
    "not-sure-(need-guidance)": "Not sure (need guidance)",
  },
  accommodation: {
    "homestay-/-guesthouse": "Homestay / Guesthouse",
    "3★": "3★",
    "4★": "4★",
    "5★": "5★",
    "mix-of-stays": "Mix of stays",
  },
  meals: {
    "breakfast-only": "Breakfast only",
    "breakfast-+-dinner": "Breakfast + Dinner",
    "all-meals": "All meals",
    "no-meals": "No meals",
  },
  foodPreference: { veg: "Veg", "non-veg": "Non-veg", jain: "Jain" },
  roomType: { single: "Single", double: "Double", triple: "Triple", family: "Family" },
  transportType: {
    volvo: "Volvo",
    "tempo-traveller": "Tempo Traveller",
    suv: "SUV",
    sedan: "Sedan",
    "bike-rental": "Bike Rental",
    "self-drive": "Self-drive",
  },
  preferredCallBackTime: { morning: "Morning", evening: "Evening", anytime: "Anytime" },
  howDidYouHear: {
    instagram: "Instagram",
    google: "Google",
    "friend-/-referral": "Friend / Referral",
    "previous-customer": "Previous customer",
  },
  alternativeDestination: { "not-sure": "Not sure / Suggest me" },
};

export function formatPrivateTourFieldValue(
  group: keyof typeof LABELS,
  value: string,
): string {
  if (!value) return "—";
  return LABELS[group]?.[value] ?? value;
}

function label(group: keyof typeof LABELS, value: string): string {
  return formatPrivateTourFieldValue(group, value);
}

function line(labelText: string, value: string): string {
  return value.trim() ? `• ${labelText}: ${value.trim()}` : "";
}

export function formatPrivateTourWhatsAppMessage(data: PrivateTourInquiryPayload): string {
  const kids =
    Number(data.kids0to5 || 0) + Number(data.kids6to12 || 0) > 0
      ? `0–5 yrs: ${data.kids0to5 || 0}, 6–12 yrs: ${data.kids6to12 || 0}`
      : "None";

  const lines = [
    "Hi StoryScout! I submitted a Private / Customised Trip enquiry.",
    "",
    "*Traveller details*",
    line("Name", data.fullName),
    line("Email", data.email),
    line("Phone", data.contactNumber),
    line("City & State", data.cityState),
    "",
    "*Group*",
    line("Male adults", data.maleAdults),
    line("Female adults", data.femaleAdults),
    line("Kids", kids),
    line("Others", data.others || "0"),
    "",
    "*Trip preferences*",
    line("Primary destination", data.primaryDestination),
    line("Alternative destination", label("alternativeDestination", data.alternativeDestination)),
    line("Start date", data.tripStartDate),
    line("Duration (days)", data.numberOfDays),
    line("Flexible dates", label("flexibleDates", data.flexibleDates)),
    line("Travel style", label("travelStyle", data.travelStyle)),
    line("Transport needed", label("transportNeeded", data.transportNeeded)),
    data.transportNeeded === "yes"
      ? line("Transport type", label("transportType", data.transportType))
      : "",
    "",
    "*Budget & stay*",
    line("Budget", label("budget", data.budget)),
    line("Accommodation", label("accommodation", data.accommodation)),
    line("Room type", label("roomType", data.roomType)),
    line("Meals", label("meals", data.meals)),
    line("Food preference", label("foodPreference", data.foodPreference)),
    "",
    "*Other*",
    line("Special requirements", data.specialRequirements || "None"),
    line("Call back time", label("preferredCallBackTime", data.preferredCallBackTime)),
    line("Heard about us", label("howDidYouHear", data.howDidYouHear)),
    "",
    "Please share a customised itinerary. Thank you!",
  ];

  return lines.filter(Boolean).join("\n");
}

export const emptyPrivateTourForm: PrivateTourInquiryPayload = {
  fullName: "",
  email: "",
  contactNumber: "",
  cityState: "",
  maleAdults: "",
  femaleAdults: "",
  kids0to5: "",
  kids6to12: "",
  others: "",
  primaryDestination: "",
  alternativeDestination: "",
  tripStartDate: "",
  numberOfDays: "",
  flexibleDates: "",
  travelStyle: "",
  transportNeeded: "",
  transportType: "",
  budget: "",
  accommodation: "",
  roomType: "",
  meals: "",
  foodPreference: "",
  specialRequirements: "",
  preferredCallBackTime: "",
  howDidYouHear: "",
};
