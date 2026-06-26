import { useMemo } from "react";
import { motion } from "framer-motion";
import { getRandomTrekGalleryImages, type GalleryImage } from "@/lib/galleryPool";

const GalleryCard = ({ image }: { image: GalleryImage }) => (
  <div className="group relative w-80 h-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl">
    {/* Image */}
    <img
      src={image.src}
      alt={image.caption}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
  </div>
);

export function Gallery() {
  const galleryImages = useMemo(() => getRandomTrekGalleryImages(12), []);
  const lane1Images = useMemo(
    () => [...galleryImages.slice(0, 6), ...galleryImages.slice(0, 6), ...galleryImages.slice(0, 6)],
    [galleryImages],
  );
  const lane2Images = useMemo(
    () => [...galleryImages.slice(6), ...galleryImages.slice(6), ...galleryImages.slice(6)],
    [galleryImages],
  );

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block"
        >
          Community
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-display font-bold text-primary mb-6"
        >
          Captured Moments
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-3xl mx-auto"
        >
          Real stories, real people. See the world through the eyes of our travelers as they explore the most beautiful destinations.
        </motion.p>
      </div>

      {/* Dual Lane Gallery */}
      <div className="space-y-8">
        {/* Lane 1 - Fast Speed */}
        <div className="relative w-full h-[320px] overflow-hidden rounded-2xl">
          {/* Gradient Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          
          {/* Gradient Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* Floating Images */}
          <motion.div
            className="flex gap-6 h-full items-center px-6"
            initial={{ x: 0 }}
            animate={{ x: "-33.333%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {lane1Images.map((image, index) => (
              <GalleryCard key={index} image={image} />
            ))}
          </motion.div>
        </div>

        {/* Lane 2 - Faster Speed, Opposite Direction */}
        <div className="relative w-full h-[320px] overflow-hidden rounded-2xl">
          {/* Gradient Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          
          {/* Gradient Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* Floating Images - Reverse Direction */}
          <motion.div
            className="flex gap-6 h-full items-center px-6"
            initial={{ x: "-33.333%" }}
            animate={{ x: 0 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {lane2Images.map((image, index) => (
              <GalleryCard key={index} image={image} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gallery Stats */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {[
          { number: "500+", label: "Happy Travelers" },
          { number: "50+", label: "Destinations" },
          { number: "1000+", label: "Memories Captured" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6 bg-secondary/30 rounded-2xl border border-border/50"
          >
            <div className="text-4xl font-display font-bold text-primary mb-2">{stat.number}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
