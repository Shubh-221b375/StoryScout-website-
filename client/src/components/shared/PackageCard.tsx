import { motion } from "framer-motion";
import { Link } from "wouter";
import { Package } from "@/lib/mockData";
import { isLaunchingSoon, LAUNCHING_SOON_LABEL, showOriginalPrice } from "@/lib/packageUtils";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const launchingSoon = isLaunchingSoon(pkg);

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
          <Card className="overflow-hidden border-none shadow-md md:shadow-lg h-full flex flex-col group cursor-pointer">
            <div className="relative h-44 sm:h-52 md:h-64 overflow-hidden">
              <motion.img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-primary shadow-sm">
                {pkg.region}
              </div>
              {launchingSoon && (
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-accent/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-white shadow-sm">
                  {LAUNCHING_SOON_LABEL}
                </div>
              )}
            </div>

            <CardHeader className="pb-2 px-4 pt-4 md:px-6 md:pt-6">
              <div className="flex justify-between items-start mb-1 md:mb-2">
                <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-foreground line-clamp-1">{pkg.title}</h3>
              </div>
              <div className="flex items-center text-muted-foreground text-xs md:text-sm gap-3 md:gap-4">
                <div className="flex items-center gap-1 min-w-0">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{pkg.location}</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{pkg.duration}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-grow px-4 md:px-6">
              <p className="text-muted-foreground text-xs md:text-sm line-clamp-2">
                {pkg.description}
              </p>
              <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5 md:gap-2">
                {pkg.highlights.slice(0, 2).map((highlight) => (
                  <span key={highlight} className="bg-secondary text-secondary-foreground text-[10px] md:text-xs px-2 py-0.5 md:py-1 rounded-sm">
                    {highlight}
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="pt-0 flex items-center justify-between border-t border-border/50 p-4 md:p-6 gap-3">
              <div className="min-w-0">
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Starting from</span>
                <div className="flex items-baseline gap-2">
                  {showOriginalPrice(pkg) && (
                    <span className="text-xs md:text-sm text-muted-foreground line-through">
                      ₹{pkg.originalPrice!.toLocaleString()}
                    </span>
                  )}
                  <span className="text-base md:text-lg font-bold text-primary">
                    ₹{pkg.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <Button
                asChild
                size="sm"
                className="flex-shrink-0 h-8 md:h-9 text-xs md:text-sm group-hover:bg-accent group-hover:text-white transition-colors"
              >
                <span>
                  View Details
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                </span>
              </Button>
            </CardFooter>
          </Card>
        </a>
      </Link>
    </motion.div>
  );
}
