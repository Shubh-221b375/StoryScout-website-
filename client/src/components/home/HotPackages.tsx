import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { packages } from "@/lib/mockData";
import { isLaunchingSoon, LAUNCHING_SOON_LABEL, showOriginalPrice } from "@/lib/packageUtils";
import { Link } from "wouter";
import { ArrowRight, Flame, Star, MapPin, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Card3D = ({ pkg }: { pkg: (typeof packages)[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const launchingSoon = isLaunchingSoon(pkg);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  function onMouseEnter() {
    setIsHovered(true);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative w-[200px] h-[280px] sm:w-[240px] sm:h-[340px] md:w-[350px] md:h-[450px] rounded-xl md:rounded-2xl cursor-pointer flex-shrink-0 shadow-lg md:shadow-xl overflow-hidden group"
    >
      <img
        src={pkg.image}
        alt={pkg.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 flex flex-col gap-1.5 md:gap-2 items-end">
        {!launchingSoon && pkg.isHot && (
          <Badge className="bg-orange-500 hover:bg-orange-600 border-none text-white font-bold px-2 py-0.5 md:px-3 md:py-1 shadow-lg animate-pulse text-[10px] md:text-xs">
            <Flame className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1 fill-white" /> HOT
          </Badge>
        )}
        {launchingSoon && (
          <Badge className="bg-accent border-none text-white font-bold px-2 py-0.5 md:px-3 md:py-1 shadow-lg text-[10px] md:text-xs">
            {LAUNCHING_SOON_LABEL}
          </Badge>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-6 text-white z-10"
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 20 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: "none" }}
      >
        {!launchingSoon && (
          <div className="flex items-center gap-1 text-yellow-400 mb-1.5 md:mb-2 text-[10px] md:text-xs font-bold tracking-wider uppercase">
            <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-yellow-400" /> Trending Now
          </div>
        )}
        <h3 className="text-base sm:text-lg md:text-2xl font-display font-bold mb-1 md:mb-2 leading-tight line-clamp-2">
          {pkg.title}
        </h3>
        <div className="flex items-center justify-between mt-2 md:mt-4 gap-2">
          <span className="flex items-baseline gap-1.5 md:gap-2 min-w-0">
            {showOriginalPrice(pkg) && (
              <span className="text-[10px] sm:text-xs md:text-sm text-white/70 line-through shrink-0">
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

export function HotPackages() {
  const hotPackages = packages.filter((p) => p.isHot && !isLaunchingSoon(p));

  return (
    <section className="pt-6 md:pt-8 pb-12 md:pb-24 bg-background overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 mb-6 md:mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="text-orange-500 font-bold tracking-widest uppercase text-xs md:text-sm mb-1 md:mb-2 block">
              Don't Miss Out
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-primary">
              Trending Now
            </h2>
          </div>
          <Link href="/region/all">
            <a className="hidden md:flex items-center text-primary font-medium hover:text-accent transition-colors">
              View All Packages <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Link>
        </motion.div>
      </div>

      <div className="w-full overflow-x-auto pb-8 md:pb-12 pt-4 md:pt-8 px-2 md:px-4 no-scrollbar">
        <div className="flex gap-4 sm:gap-6 md:gap-8 w-max mx-auto px-2 md:px-12 perspective-1000">
          {hotPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            >
              <Card3D pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
