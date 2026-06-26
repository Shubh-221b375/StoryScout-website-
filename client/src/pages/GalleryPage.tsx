import { useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getRandomTrekGalleryImages } from "@/lib/galleryPool";

export default function GalleryPage() {
  const galleryImages = useMemo(() => getRandomTrekGalleryImages(12), []);
  const duplicatedImages = useMemo(
    () => [...galleryImages, ...galleryImages, ...galleryImages],
    [galleryImages],
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Community
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-primary mb-6"
          >
            Captured Moments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-3xl mx-auto"
          >
            Real stories, real people. See the world through the eyes of our travelers as they explore the most beautiful destinations.
          </motion.p>
        </div>

        {/* Gallery Container */}
        <div className="relative w-full h-[600px] overflow-hidden bg-gradient-to-r from-background via-background/50 to-background rounded-3xl">
          {/* Gradient Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          
          {/* Gradient Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* Floating Images */}
          <motion.div
            className="flex gap-8 h-full items-center px-8"
            initial={{ x: 0 }}
            animate={{ x: "-33.333%" }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="group relative w-96 h-96 flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/60 transition-colors duration-500" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">StoryScout</span>
                  <h3 className="text-3xl font-display font-bold text-white">{image.caption}</h3>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-bold">
                    ✨ Trending
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gallery Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
      </main>

      <Footer />
    </div>
  );
}
