import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HERO_VIDEO_URL =
  import.meta.env.VITE_HERO_VIDEO_URL?.trim() ||
  "https://yojzhktrfehcfaxkckfi.supabase.co/storage/v1/object/public/media/bg_video_1763829371002%20(1).mp4";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToRegions = () => {
    document.getElementById("regions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
           <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-bold tracking-widest uppercase">
            Premium Travel Experiences
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-3 md:mb-4 leading-tight drop-shadow-2xl"
        >
          Your Ticket to Adventure
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-display text-white/90 mb-6 md:mb-8 drop-shadow-lg"
        >
          with StoryScout
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button 
            size="lg" 
            onClick={scrollToRegions}
            className="bg-accent hover:bg-accent/90 text-white px-6 py-5 md:px-10 md:py-7 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-0"
          >
            Explore Regions
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 z-20 text-white cursor-pointer"
        onClick={scrollToRegions}
      >
        <ChevronDown className="w-10 h-10 opacity-80 hover:opacity-100 transition-opacity" />
      </motion.div>

      {/* Gradient Overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}
