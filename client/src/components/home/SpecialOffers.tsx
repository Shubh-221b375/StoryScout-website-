import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Percent, Timer, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { packages } from "@/lib/mockData";
import { useState } from "react";

const OfferCard = ({ pkg }: { pkg: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[280px] h-[400px] rounded-2xl cursor-pointer flex-shrink-0 shadow-xl overflow-hidden group"
    >
      {/* Image Background */}
      <img 
        src={pkg.image} 
        alt={pkg.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Base Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Discount Badge */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
        <div className="bg-red-500 hover:bg-red-600 border-none text-white font-bold px-3 py-1 shadow-lg rounded-lg animate-pulse flex items-center gap-1">
          <Percent className="w-3 h-3" /> {pkg.discount}% OFF
        </div>
        {pkg.region !== 'Trekking' && (
          <div className="bg-accent border-none text-white font-bold px-3 py-1 shadow-lg rounded-lg text-xs">
            Launching in February 2026
          </div>
        )}
      </div>

      {/* Front Content - Always Visible */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full p-6 text-white z-10"
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 20 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: "none" }}
      >
        <h3 className="text-2xl font-display font-bold mb-2 leading-tight">{pkg.title}</h3>
        <div className="flex items-center justify-between mt-4">
          <span className="flex items-baseline gap-2">
            {pkg.originalPrice && pkg.originalPrice > pkg.price && (
              <span className="text-sm text-white/80 line-through">
                ₹{pkg.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-lg font-bold text-accent">
              ₹{pkg.price.toLocaleString()}
            </span>
          </span>
          <span className="text-xs text-white/80 flex items-center">
            Hover <ArrowRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </motion.div>

      {/* Details Overlay - Shows on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90 p-6 flex flex-col justify-between text-white z-20 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isHovered ? "auto" : "none" }}
      >
        <div className="space-y-4">
          <h3 className="text-xl font-display font-bold text-white leading-tight">{pkg.title}</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/15 p-3 rounded-lg backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-white/70 uppercase tracking-wider font-bold mb-0.5">Destination</p>
                <p className="text-sm font-medium text-white">{pkg.destination || pkg.title}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/15 p-3 rounded-lg backdrop-blur-sm">
              <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-white/70 uppercase tracking-wider font-bold mb-0.5">Duration</p>
                <p className="text-sm font-medium text-white">{pkg.duration || "5-7 Days"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/15 p-3 rounded-lg backdrop-blur-sm">
              <Users className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-white/70 uppercase tracking-wider font-bold mb-0.5">Group Size</p>
                <p className="text-sm font-medium text-white">Min 4 - Max 12 People</p>
              </div>
            </div>
          </div>
        </div>

        <Link href={`/package/${pkg.id}`}>
          <a className="w-full block bg-white text-primary font-bold py-2.5 px-4 rounded-lg hover:bg-white/90 transition-colors text-center text-sm">
            View Details
          </a>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export function SpecialOffers() {
  const discountedPackages = packages.filter(p => p.discount);

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20"
          >
            <Timer className="w-4 h-4 text-yellow-400 animate-spin-slow" />
            <span className="text-sm font-bold tracking-wide text-yellow-400">Limited Time Deals</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Exclusive Offers</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Grab these founder-led batches with unbeatable pricing—our founder personally guides these departures,
            making them the most curated, special experiences we offer.
          </p>
        </div>

      {/* Horizontal Scroll Container */}
      <div className="w-full overflow-x-auto pb-8 pt-8 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex gap-8 w-max mx-auto px-4 md:px-12 perspective-1000">
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
