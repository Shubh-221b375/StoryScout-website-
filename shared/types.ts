export type UserRole = "admin" | "employee" | "customer";

export interface SiteUser {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

export type PackageRegion =
  | "North"
  | "South"
  | "East"
  | "West"
  | "Foreign"
  | "Trekking";

export interface SitePackage {
  id: string;
  title: string;
  region: PackageRegion;
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  itineraryPdfUrl?: string;
  description: string;
  details?: { label: string; value: string }[];
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  whyChoose?: string[];
  isHot?: boolean;
  discount?: number;
}

export interface SiteRegion {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface SiteReview {
  id: string;
  name: string;
  rating: number;
  message: string;
  photos?: string[];
  approved: boolean;
  featured: boolean;
  createdAt: string;
}

export interface SiteBooking {
  id: string;
  packageId: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  preferredDate?: string;
  specialRequests?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export type PublicUser = Omit<SiteUser, "passwordHash">;

export interface PrivateTourInquiryPayload {
  fullName: string;
  email: string;
  contactNumber: string;
  cityState: string;
  maleAdults: string;
  femaleAdults: string;
  kids0to5: string;
  kids6to12: string;
  others: string;
  primaryDestination: string;
  alternativeDestination: string;
  tripStartDate: string;
  numberOfDays: string;
  flexibleDates: string;
  travelStyle: string;
  transportNeeded: string;
  transportType: string;
  budget: string;
  accommodation: string;
  roomType: string;
  meals: string;
  foodPreference: string;
  specialRequirements: string;
  preferredCallBackTime: string;
  howDidYouHear: string;
}

export interface SitePrivateTourInquiry extends PrivateTourInquiryPayload {
  id: string;
  createdAt: string;
}
