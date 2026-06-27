import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { regions } from "@/lib/mockData";
import { Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, parseApiError } from "@/lib/queryClient";
import type { PrivateTourInquiryPayload } from "@shared/types";
import {
  emptyPrivateTourForm,
  formatPrivateTourWhatsAppMessage,
} from "@/lib/privateTourUtils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function PrivateToursPage() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<PrivateTourInquiryPayload>(emptyPrivateTourForm);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/site/private-tours", formData);
      const result = (await response.json()) as { sheetSynced?: boolean };

      const whatsappUrl = buildWhatsAppUrl(formatPrivateTourWhatsAppMessage(formData));
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      toast({
        title: "Enquiry submitted!",
        description: result.sheetSynced
          ? "Saved to our sheet. WhatsApp opened — tap Send to share your details with us."
          : "WhatsApp opened — tap Send to share your details with us.",
      });

      setFormData(emptyPrivateTourForm);
    } catch (error) {
      toast({
        title: "Could not submit enquiry",
        description: parseApiError(error),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const destinationOptions = [
    ...regions.map(r => r.name),
    "Other"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <header className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              Private / Customised Trips
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Plan your perfect adventure with personalized itineraries tailored to your preferences
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 pb-20">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12">
          
          {/* Section 1: Traveller Details */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
              <h2 className="text-2xl font-display font-bold">Traveller Details <span className="text-destructive">*</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Full Name <span className="text-destructive">*</span></Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email ID <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="contactNumber">Contact Number (WhatsApp preferred) <span className="text-destructive">*</span></Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleChange("contactNumber", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="cityState">City & State <span className="text-destructive">*</span></Label>
                <Input
                  id="cityState"
                  value={formData.cityState}
                  onChange={(e) => handleChange("cityState", e.target.value)}
                  placeholder="Mumbai, Maharashtra"
                  required
                  className="mt-2"
                />
              </div>
            </div>
          </motion.section>

          {/* Section 2: Group Composition */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
              <h2 className="text-2xl font-display font-bold">Group Composition <span className="text-destructive">*</span></h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">Adults</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="maleAdults">Male: Number <span className="text-destructive">*</span></Label>
                    <Input
                      id="maleAdults"
                      type="number"
                      min="0"
                      value={formData.maleAdults}
                      onChange={(e) => handleChange("maleAdults", e.target.value)}
                      placeholder="0"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="femaleAdults">Female: Number <span className="text-destructive">*</span></Label>
                    <Input
                      id="femaleAdults"
                      type="number"
                      min="0"
                      value={formData.femaleAdults}
                      onChange={(e) => handleChange("femaleAdults", e.target.value)}
                      placeholder="0"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-lg font-semibold mb-4 block">Kids</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="kids0to5">0–5 yrs: Number</Label>
                    <Input
                      id="kids0to5"
                      type="number"
                      min="0"
                      value={formData.kids0to5}
                      onChange={(e) => handleChange("kids0to5", e.target.value)}
                      placeholder="0"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="kids6to12">6–12 yrs: Number</Label>
                    <Input
                      id="kids6to12"
                      type="number"
                      min="0"
                      value={formData.kids6to12}
                      onChange={(e) => handleChange("kids6to12", e.target.value)}
                      placeholder="0"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="others">Others: Number</Label>
                <Input
                  id="others"
                  type="number"
                  min="0"
                  value={formData.others}
                  onChange={(e) => handleChange("others", e.target.value)}
                  placeholder="0"
                  className="mt-2"
                />
              </div>
            </div>
          </motion.section>

          {/* Section 3: Trip Preferences */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
              <h2 className="text-2xl font-display font-bold">Trip Preferences <span className="text-destructive">*</span></h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label htmlFor="primaryDestination">Primary Destination <span className="text-destructive">*</span></Label>
                <Select value={formData.primaryDestination} onValueChange={(value) => handleChange("primaryDestination", value)} required>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationOptions.map((dest) => (
                      <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="alternativeDestination">
                  🔁 Alternative Destination (Optional)
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  This helps us suggest a backup plan in case of weather, permits, or availability issues.
                </p>
                <Select value={formData.alternativeDestination} onValueChange={(value) => handleChange("alternativeDestination", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select alternative destination or 'Not sure / Suggest me'" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationOptions.map((dest) => (
                      <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                    ))}
                    <SelectItem value="not-sure">Not sure / Suggest me</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="tripStartDate">Trip Start Date <span className="text-destructive">*</span></Label>
                  <Input
                    id="tripStartDate"
                    type="date"
                    value={formData.tripStartDate}
                    onChange={(e) => handleChange("tripStartDate", e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfDays">Number of Days <span className="text-destructive">*</span></Label>
                  <Input
                    id="numberOfDays"
                    type="number"
                    min="1"
                    value={formData.numberOfDays}
                    onChange={(e) => handleChange("numberOfDays", e.target.value)}
                    placeholder="e.g., 5"
                    required
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label>Flexible Dates? <span className="text-destructive">*</span></Label>
                <RadioGroup value={formData.flexibleDates} onValueChange={(value) => handleChange("flexibleDates", value)} className="mt-2">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="flexible-yes" />
                      <Label htmlFor="flexible-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="flexible-no" />
                      <Label htmlFor="flexible-no">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="travelStyle">Travel Style <span className="text-destructive">*</span></Label>
                <Select value={formData.travelStyle} onValueChange={(value) => handleChange("travelStyle", value)} required>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select travel style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leisure-sightseeing">Leisure / Sightseeing</SelectItem>
                    <SelectItem value="adventure-trekking">Adventure / Trekking</SelectItem>
                    <SelectItem value="honeymoon">Honeymoon</SelectItem>
                    <SelectItem value="backpacking-budget">Backpacking / Budget</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="spiritual-pilgrimage">Spiritual / Pilgrimage</SelectItem>
                    <SelectItem value="photography-focused">Photography-focused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Transport Needed?</Label>
                <RadioGroup value={formData.transportNeeded} onValueChange={(value) => handleChange("transportNeeded", value)} className="mt-2">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="transport-yes" />
                      <Label htmlFor="transport-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="transport-no" />
                      <Label htmlFor="transport-no">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              {formData.transportNeeded === "yes" && (
                <div>
                  <Label htmlFor="transportType">Transport Type</Label>
                  <Select value={formData.transportType} onValueChange={(value) => handleChange("transportType", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select transport type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volvo">Volvo</SelectItem>
                      <SelectItem value="tempo-traveller">Tempo Traveller</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="bike-rental">Bike Rental</SelectItem>
                      <SelectItem value="self-drive">Self-drive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </motion.section>

          {/* Section 4: Budget Expectation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
              <h2 className="text-2xl font-display font-bold">Budget Expectation <span className="text-destructive">*</span></h2>
            </div>
            <RadioGroup value={formData.budget} onValueChange={(value) => handleChange("budget", value)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Under ₹10,000",
                "₹10,000 – ₹20,000",
                "₹20,000 – ₹35,000",
                "₹35,000 – ₹50,000",
                "₹50,000+",
                "Not sure (need guidance)"
              ].map((budget) => (
                <div key={budget} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50">
                  <RadioGroupItem value={budget.toLowerCase().replace(/\s+/g, "-")} id={budget} />
                  <Label htmlFor={budget} className="cursor-pointer w-full">{budget}</Label>
                </div>
              ))}
            </RadioGroup>
          </motion.section>

          {/* Section 5: Accommodation Preference */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">5</div>
              <h2 className="text-2xl font-display font-bold">Accommodation Preference</h2>
              <span className="text-sm text-muted-foreground">(Optional but Recommended)</span>
            </div>
            <div className="space-y-6">
              <div>
                <Label>Accommodation Type</Label>
                <RadioGroup value={formData.accommodation} onValueChange={(value) => handleChange("accommodation", value)} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Homestay / Guesthouse", "3★", "4★", "5★", "Mix of stays"].map((acc) => (
                    <div key={acc} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50">
                      <RadioGroupItem value={acc.toLowerCase().replace(/\s+/g, "-")} id={acc} />
                      <Label htmlFor={acc} className="cursor-pointer w-full">{acc}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={formData.roomType} onValueChange={(value) => handleChange("roomType", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="double">Double</SelectItem>
                    <SelectItem value="triple">Triple</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.section>

          {/* Section 6: Meals Preference */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">6</div>
              <h2 className="text-2xl font-display font-bold">Meals Preference</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label>Meals</Label>
                <RadioGroup value={formData.meals} onValueChange={(value) => handleChange("meals", value)} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Breakfast only", "Breakfast + Dinner", "All meals", "No meals"].map((meal) => (
                    <div key={meal} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50">
                      <RadioGroupItem value={meal.toLowerCase().replace(/\s+/g, "-")} id={meal} />
                      <Label htmlFor={meal} className="cursor-pointer w-full">{meal}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="foodPreference">Food Preference</Label>
                <Select value={formData.foodPreference} onValueChange={(value) => handleChange("foodPreference", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select food preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veg">Veg</SelectItem>
                    <SelectItem value="non-veg">Non-veg</SelectItem>
                    <SelectItem value="jain">Jain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.section>

          {/* Section 7: Special Requirements */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">7</div>
              <h2 className="text-2xl font-display font-bold">Special Requirements</h2>
              <span className="text-sm text-muted-foreground">(Optional)</span>
            </div>
            <div>
              <Label htmlFor="specialRequirements">Special Requests / Notes</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Elderly travellers, medical conditions, celebrations, child seat, snow preference, offbeat locations, trek difficulty, etc.
              </p>
              <Textarea
                id="specialRequirements"
                value={formData.specialRequirements}
                onChange={(e) => handleChange("specialRequirements", e.target.value)}
                placeholder="Enter any special requirements or notes..."
                className="mt-2 min-h-[120px]"
              />
            </div>
          </motion.section>

          {/* Section 8: Final Touch Points */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">8</div>
              <h2 className="text-2xl font-display font-bold">Final Touch Points</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label>Preferred Call Back Time</Label>
                <RadioGroup value={formData.preferredCallBackTime} onValueChange={(value) => handleChange("preferredCallBackTime", value)} className="mt-2">
                  <div className="flex items-center space-x-6">
                    {["Morning", "Evening", "Anytime"].map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <RadioGroupItem value={time.toLowerCase()} id={time} />
                        <Label htmlFor={time}>{time}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>How did you hear about us?</Label>
                <RadioGroup value={formData.howDidYouHear} onValueChange={(value) => handleChange("howDidYouHear", value)} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Instagram", "Google", "Friend / Referral", "Previous customer"].map((source) => (
                    <div key={source} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50">
                      <RadioGroupItem value={source.toLowerCase().replace(/\s+/g, "-")} id={source} />
                      <Label htmlFor={source} className="cursor-pointer w-full">{source}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </motion.section>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center pt-8"
          >
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full md:w-auto px-12 py-6 text-lg font-bold bg-primary hover:bg-primary/90"
            >
              {submitting ? "Submitting…" : "Get My Customised Itinerary"}
            </Button>
          </motion.div>
        </form>

        {/* Help & Support Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
        >
          <h3 className="text-2xl font-display font-bold mb-6 text-center">Help & Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Phone</p>
                <a href="tel:+919917724737" className="text-muted-foreground hover:text-primary">+91 991 772 4737</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:info@storyscout.com" className="text-muted-foreground hover:text-primary">info@storyscout.com</a>
              </div>
            </div>
            <div className="md:col-span-2 text-center text-sm text-muted-foreground">
              <p>Working hours: 10 AM to 06 PM Monday-Saturday (GMT +5:30)</p>
              <p>Sunday Closed</p>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

