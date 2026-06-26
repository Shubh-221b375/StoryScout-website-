import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useReviews } from "@/hooks/use-site-data";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";
import type { SiteReview } from "@shared/types";

const MAX_REVIEW_PHOTOS = 10;

type SelectedPhoto = {
  id: string;
  file: File;
  previewUrl: string;
};

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function compressImageToDataUrl(file: File, maxSide = 1280, quality = 0.75) {
  const dataUrl = await fileToDataUrl(file);
  const img = await loadImage(dataUrl);

  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  const scale = Math.min(1, maxSide / Math.max(w, h));

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));

  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  // JPEG gives good size reduction for localStorage; fine for review photos.
  return canvas.toDataURL("image/jpeg", quality);
}

const MOCK_REVIEWS: SiteReview[] = [
  {
    id: "mock-1",
    name: "Aarav Sharma",
    rating: 5,
    message: "Flawless logistics and stunning summit sunrise. StoryScout made Kuari Pass feel effortless.",
    approved: true,
    featured: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "mock-2",
    name: "Riya Mehta",
    rating: 5,
    message: "Brahmatal in peak winter was magical—warm meals, cozy tents, and a super caring trek lead.",
    approved: true,
    featured: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "mock-3",
    name: "Karan Verma",
    rating: 4,
    message: "Great briefing and safety focus. Would join again for Pangarchulla next season!",
    approved: true,
    featured: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

export default function ReviewsPage() {
  const queryClient = useQueryClient();
  const { data: apiReviews } = useReviews();
  const reviews = apiReviews && apiReviews.length > 0 ? apiReviews : MOCK_REVIEWS;
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sortedReviews = useMemo(
    () => [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [reviews],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setIsSubmitting(true);

    let photoDataUrls: string[] = [];
    try {
      if (selectedPhotos.length > 0) {
        photoDataUrls = await Promise.all(
          selectedPhotos.slice(0, MAX_REVIEW_PHOTOS).map((p) =>
            compressImageToDataUrl(p.file),
          ),
        );
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Photo upload failed",
        description: "Some photos could not be processed. Please try different images.",
      });
      setIsSubmitting(false);
      return;
    }

    const newReview = {
      name: name.trim(),
      rating,
      message: message.trim(),
      photos: photoDataUrls.length > 0 ? photoDataUrls : undefined,
    };
    try {
      await apiRequest("POST", "/api/site/reviews", newReview);
      queryClient.invalidateQueries({ queryKey: ["/api/site/reviews"] });
      toast({
        title: "Review submitted!",
        description: "Your review will appear after team approval.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later.",
      });
      setIsSubmitting(false);
      return;
    }
    setName("");
    setMessage("");
    setRating(5);
    selectedPhotos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setSelectedPhotos([]);
    setIsSubmitting(false);
  };

  const handleAddPhotos = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files);

    const nonImages = incoming.filter((f) => !isImageFile(f));
    if (nonImages.length > 0) {
      toast({
        variant: "destructive",
        title: "Unsupported file type",
        description: "Please upload image files only.",
      });
    }

    const imageFiles = incoming.filter(isImageFile);
    if (imageFiles.length === 0) return;

    const remaining = MAX_REVIEW_PHOTOS - selectedPhotos.length;
    if (remaining <= 0) {
      toast({
        title: "Photo limit reached",
        description: `You can upload up to ${MAX_REVIEW_PHOTOS} photos per review.`,
      });
      return;
    }

    const toAdd = imageFiles.slice(0, remaining).map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    if (imageFiles.length > remaining) {
      toast({
        title: "Only 10 photos allowed",
        description: `Extra photos were ignored. (${MAX_REVIEW_PHOTOS} max)`,
      });
    }

    setSelectedPhotos((prev) => [...prev, ...toAdd]);
  };

  const removeSelectedPhoto = (id: string) => {
    setSelectedPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="pt-40 pb-20 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-accent font-semibold uppercase tracking-[0.2em] mb-3">Real Voices</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              Reviews that spark your next adventure
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              See why travellers choose StoryScout. Share your experience and inspire the next summit.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 pb-20 space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 -mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 p-6 md:p-8 rounded-3xl bg-card shadow-2xl border border-border/70"
          >
            <h2 className="text-2xl font-display font-bold mb-2">Leave a review</h2>
            <p className="text-muted-foreground mb-6">
              Your story could help someone choose their next trek.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Rating</label>
                <div className="flex items-center gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-lg transition ${
                        rating >= star ? "text-accent" : "text-muted-foreground"
                      }`}
                      aria-label={`Rate ${star}`}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          rating >= star ? "fill-accent stroke-accent" : "stroke-current"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Your experience</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What made your trip special?"
                  className="mt-2 min-h-[140px]"
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Photos</label>
                  <span className="text-xs text-muted-foreground">
                    {selectedPhotos.length}/{MAX_REVIEW_PHOTOS}
                  </span>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="mt-2"
                  onChange={(e) => {
                    handleAddPhotos(e.target.files);
                    // allow re-selecting the same file(s)
                    e.currentTarget.value = "";
                  }}
                />
                {selectedPhotos.length > 0 && (
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {selectedPhotos.map((p) => (
                      <div key={p.id} className="relative">
                        <img
                          src={p.previewUrl}
                          alt="Selected"
                          className="h-14 w-14 rounded-lg object-cover border border-border"
                        />
                        <button
                          type="button"
                          aria-label="Remove photo"
                          onClick={() => removeSelectedPhoto(p.id)}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border border-border shadow grid place-items-center"
                        >
                          <X className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Upload up to {MAX_REVIEW_PHOTOS} photos (images only).
                </p>
              </div>
              <Button type="submit" className="w-full h-12 text-lg font-semibold">
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold">Latest</p>
                <h3 className="text-3xl font-display font-bold text-foreground mt-1">Traveler stories</h3>
              </div>
              <span className="text-sm text-muted-foreground">
                {sortedReviews.length} review{sortedReviews.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative p-5 rounded-2xl border border-border/60 bg-gradient-to-br from-background via-card to-background shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-accent">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            review.rating >= star ? "fill-accent stroke-accent" : "stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-4">
                    {review.message}
                  </p>
                  {review.photos && review.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {review.photos.slice(0, MAX_REVIEW_PHOTOS).map((src, i) => (
                        <img
                          key={src + i}
                          src={src}
                          alt={`Review photo ${i + 1}`}
                          className="w-full aspect-square object-cover rounded-lg border border-border/60"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

