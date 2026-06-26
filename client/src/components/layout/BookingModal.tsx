import { useState } from "react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import type { SitePackage } from "@shared/types";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pkg: SitePackage;
}

export function BookingModal({ open, onOpenChange, pkg }: BookingModalProps) {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [preferredDate, setPreferredDate] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenChange(false);
      setLocation(`/login?redirect=/package/${pkg.id}`);
      return;
    }
    setLoading(true);
    try {
      await apiRequest("POST", "/api/bookings", {
        packageId: pkg.id,
        numberOfPeople,
        preferredDate: preferredDate || undefined,
        phone: phone || undefined,
        specialRequests: specialRequests || undefined,
      });
      toast({
        title: "Booking request submitted!",
        description: "Our team will contact you shortly to confirm.",
      });
      onOpenChange(false);
    } catch {
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: "Please try again or contact us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to book</DialogTitle>
            <DialogDescription>
              Please login or register to book {pkg.title}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button onClick={() => { onOpenChange(false); setLocation(`/login?redirect=/package/${pkg.id}`); }}>
              Sign in
            </Button>
            <Button variant="outline" onClick={() => { onOpenChange(false); setLocation(`/register?redirect=/package/${pkg.id}`); }}>
              Create account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book {pkg.title}</DialogTitle>
          <DialogDescription>
            ₹{pkg.price.toLocaleString()} per person · {pkg.duration}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleBook} className="space-y-4 mt-2">
          <div>
            <Label>Number of travellers</Label>
            <Input
              type="number"
              min={1}
              max={20}
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Number(e.target.value))}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label>Preferred travel date</Label>
            <Input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label>Special requests</Label>
            <Textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="mt-1"
              placeholder="Dietary needs, group details, etc."
            />
          </div>
          <div className="p-3 rounded-lg bg-muted/50 text-sm">
            <span className="text-muted-foreground">Estimated total: </span>
            <span className="font-bold text-primary">
              ₹{(pkg.price * numberOfPeople).toLocaleString()}
            </span>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Confirm booking request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
