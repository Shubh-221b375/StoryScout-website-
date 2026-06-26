import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Percent, Timer, MapPin, Clock, Users } from "lucide-react";
import { packages } from "@/lib/mockData";
import { getDiscountPercent, hasOffer, isLaunchingSoon, LAUNCHING_SOON_LABEL, showDiscount } from "@/lib/packageUtils";
import { useState } from "react";

const OfferCard = ({ pkg }: { pkg: (typeof packages)[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const launchingSoon = isLaunchingSoon(pkg);
  const discountPercent = getDiscountPercent(pkg);
  const showDiscountBadge = showDiscount(pkg);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[200px] h-[280px] sm:w-[240px] sm:h-[340px] md:w-[280px] md:h-[400px] rounded-xl md:rounded-2xl cursor-pointer flex-shrink-0 shadow-lg md:shadow-xl overflow-hidden group"
    >
      <img
        src={pkg.image}
        alt={pkg.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 flex flex-col gap-1.5 md:gap-2 items-end">
        {showDiscountBadge && (
          <div className="bg-red-500 text-white font-bold px-2 py-0.5 md:px-3 md:py-1 shadow-lg rounded-md md:rounded-lg text-[10px] md:text-xs flex items-center gap-1">
            <Percent className="w-2.5 h-2.5 md:w-3 md:h-3" /> {discountPercent}% OFF
          </div>
        )}
        {launchingSoon && (
          <div className="bg-accent text-white font-bold px-2 py-0.5 md:px-3 md:py-1 shadow-lg rounded-md md:rounded-lg text-[10px] md:text-xs">
            {LAUNCHING_SOON_LABEL}
          </div>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-6 text-white z-10"
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 20 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: "none" }}
      >
        <h3 className="text-base sm:text-lg md:text-2xl font-display font-bold mb-1 md:mb-2 leading-tight line-clamp-2">
          {pkg.title}
        </h3>
        <div className="flex items-center justify-between mt-2 md:mt-4 gap-2">
          <span className="flex items-baseline gap-1.5 md:gap-2 min-w-0">
            {showDiscountBadge && pkg.originalPrice && (
              <span className="text-[10px] sm:text-xs md:text-sm text-white/80 line-through shrink-0">
                ₹{pkg.originalPrice!.toLocaleString()}
              </span>
            )}
            <span className="text-sm sm:text-base md:text-lg font-bold text-accent truncate">
              ₹{pkg.price.toLocaleString()}
            </span>
          </span>
          <span className="text-[10px] md:text-xs text-white/80 flex items-center shrink-0 hidden sm:flex">
            Hover <ArrowRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90 p-4 md:p-6 flex flex-col justify-between text-white z-20 rounded-xl md:rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isHovered ? "auto" : "none" }}
      >
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-base md:text-xl font-display font-bold text-white leading-tight">
            {pkg.title}
          </h3>

          <div className="space-y-2 md:space-y-3">
            <div className="flex items-start gap-2 md:gap-3 bg-white/15 p-2 md:p-3 rounded-lg backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] md:text-xs text-white/70 uppercase tracking-wider font-bold mb-0.5">
                  Destination
                </p>
                <p className="text-xs md:text-sm font-medium text-white">{pkg.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 md:gap-3 bg-white/15 p-2 md:p-3 rounded-lg backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] md:text-xs text-white/70 uppercase tracking-wider font-bold mb-0.5">
                  Duration
                </p>
                <p className="text-xs md:text-sm font-medium text-white">{pkg.duration}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 md:gap-3 bg-white/15 p-2 md:p-3 rounded-lg backdrop-blur-sm">
              <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] md:text-xs text-white/70 uppercase tracking-wider font-bold mb-0.5">
                  Group Size
                </p>
                <p className="text-xs md:text-sm font-medium text-white">Min 4 - Max 12 People</p>
              </div>
            </div>
          </div>
        </div>

        <Link href={`/package/${pkg.id}`}>
          <a className="w-full block bg-white text-primary font-bold py-2 md:py-2.5 px-3 md:px-4 rounded-lg hover:bg-white/90 transition-colors text-center text-xs md:text-sm">
            View Details
          </a>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export function SpecialOffers() {
  const discountedPackages = packages.filter(hasOffer);

  return (
    <section className="py-12 md:py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6 border border-white/20"
          >
            <Timer className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400 animate-spin-slow" />
            <span className="text-xs md:text-sm font-bold tracking-wide text-yellow-400">
              Limited Time Deals
            </span>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-3 md:mb-6">
            Exclusive Offers
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-lg px-2">
            Grab these founder-led batches with unbeatable pricing—our founder personally guides
            these departures, making them the most curated, special experiences we offer.
          </p>
        </div>

        <div
          className="w-full overflow-x-auto pb-6 md:pb-8 pt-4 md:pt-8 px-2 md:px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          <div className="flex gap-4 sm:gap-6 md:gap-8 w-max mx-auto px-2 md:px-12 perspective-1000">
            {discountedPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              >
                <OfferCard pkg={pkg} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
