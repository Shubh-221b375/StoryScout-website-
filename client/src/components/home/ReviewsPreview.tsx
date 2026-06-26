import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const previewReviews = [
  {
    name: "Aarav Sharma",
    rating: 5,
    message: "Flawless logistics and stunning summit sunrise. StoryScout made Kuari Pass feel effortless.",
    createdAt: "3 days ago",
  },
  {
    name: "Riya Mehta",
    rating: 5,
    message: "Brahmatal in peak winter was magical—warm meals, cozy tents, and a super caring trek lead.",
    createdAt: "5 days ago",
  },
  {
    name: "Karan Verma",
    rating: 4,
    message: "Great briefing and safety focus. Would join again for Pangarchulla next season!",
    createdAt: "1 week ago",
  },
];

export function ReviewsPreview() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/40 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <p className="text-accent font-semibold uppercase tracking-[0.2em] mb-2">What travellers say</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-3">
              Reviews that spark the next trip
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Real stories from recent departures. Dive into more or share yours.
            </p>
          </div>
          <Link href="/reviews">
            <Button size="lg" className="px-6">See all reviews</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewReviews.map((review, idx) => (
            <motion.div
              key={review.name + idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="p-6 rounded-2xl bg-card border border-border/60 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.createdAt}</p>
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
              <p className="text-muted-foreground leading-relaxed">{review.message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


