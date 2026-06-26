import { motion } from "framer-motion";
import { Link } from "wouter";
import { Package } from "@/lib/mockData";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/package/${pkg.id}`}>
        <a className="block h-full">
          <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col group cursor-pointer">
            <div className="relative h-64 overflow-hidden">
              <motion.img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                {pkg.region}
              </div>
              {pkg.region !== 'Trekking' && (
                <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                  Launching in February 2026
                </div>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-xl font-bold text-foreground line-clamp-1">{pkg.title}</h3>
              </div>
              <div className="flex items-center text-muted-foreground text-sm gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{pkg.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{pkg.duration}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm line-clamp-2">
                {pkg.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {pkg.highlights.slice(0, 2).map((highlight) => (
                  <span key={highlight} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-sm">
                    {highlight}
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="pt-0 flex items-center justify-between border-t border-border/50 p-6">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Starting from</span>
                <div className="flex items-baseline gap-2">
                  {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{pkg.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-lg font-bold text-primary">
                    ₹{pkg.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <Button
                asChild
                size="sm"
                className="group-hover:bg-accent group-hover:text-white transition-colors"
              >
                <span>
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </Button>
            </CardFooter>
          </Card>
        </a>
      </Link>
    </motion.div>
  );
}
