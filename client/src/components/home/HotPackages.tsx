import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { packages } from "@/lib/mockData";
import { Link } from "wouter";
import { ArrowRight, Flame, Star, MapPin, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Card3D = ({ pkg }: { pkg: any }) => {
  const [isHovered, setIsHovered] = useState(false);
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
      className="relative w-[300px] md:w-[350px] h-[450px] rounded-2xl cursor-pointer flex-shrink-0 shadow-xl overflow-hidden group"
    >
      {/* Image Background */}
      <img 
        src={pkg.image} 
        alt={pkg.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Base Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* HOT Badge */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
        <Badge className="bg-orange-500 hover:bg-orange-600 border-none text-white font-bold px-3 py-1 shadow-lg animate-pulse">
          <Flame className="w-3 h-3 mr-1 fill-white" /> HOT
        </Badge>
        {pkg.region !== 'Trekking' && (
          <Badge className="bg-accent border-none text-white font-bold px-3 py-1 shadow-lg text-xs">
            Launching in February 2026
          </Badge>
        )}
      </div>

      {/* Front Content - Always Visible */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full p-6 text-white z-10"
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 20 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: "none" }}
      >
        <div className="flex items-center gap-1 text-yellow-400 mb-2 text-xs font-bold tracking-wider uppercase">
          <Star className="w-3 h-3 fill-yellow-400" /> Trending Now
        </div>
        <h3 className="text-2xl font-display font-bold mb-2 leading-tight">{pkg.title}</h3>
        <div className="flex items-center justify-between mt-4">
          <span className="flex items-baseline gap-2">
            {pkg.originalPrice && pkg.originalPrice > pkg.price && (
              <span className="text-sm text-white/70 line-through">
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

export function HotPackages() {
  const hotPackages = packages.filter(p => p.isHot);

  return (
    <section className="pt-8 pb-24 bg-background overflow-hidden relative">
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block">Don't Miss Out</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Trending Now</h2>
          </div>
          <Link href="/region/all">
            <a className="hidden md:flex items-center text-primary font-medium hover:text-accent transition-colors">
              View All Packages <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Link>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="w-full overflow-x-auto pb-12 pt-8 px-4 no-scrollbar">
        <div className="flex gap-8 w-max mx-auto px-4 md:px-12 perspective-1000">
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
