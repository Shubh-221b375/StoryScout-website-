import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { RegionGrid } from "@/components/home/RegionGrid";
import { HotPackages } from "@/components/home/HotPackages";
import { SpecialOffers } from "@/components/home/SpecialOffers";
import { Founder } from "@/components/home/Founder";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Gallery } from "@/components/home/Gallery";
import { ReviewsPreview } from "@/components/home/ReviewsPreview";
import collageBackground from "@assets/generated_images/travel_adventure_photo_collage_background.png";
import { CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <main>
        <Hero />
        <RegionGrid />
        <section id="packages">
          <HotPackages />
        </section>
        <SpecialOffers />
        <ReviewsPreview />
        
        {/* Trust Section - Collage Background */}
        <section 
          className="py-16 md:py-32 relative overflow-hidden"
          style={{
            backgroundImage: `url(${collageBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        >
          {/* Layered Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-accent/30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="max-w-4xl mx-auto text-center mb-10 md:mb-20"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="inline-block mb-6 px-4 py-2 bg-accent/20 backdrop-blur-md rounded-full border border-accent/50"
              >
                <span className="text-accent font-bold tracking-widest uppercase text-sm">Travel Experiences Reimagined</span>
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">Why Travel With <span className="bg-gradient-to-r from-accent via-orange-400 to-accent bg-clip-text text-transparent">StoryScout?</span></h2>
              <p className="text-white/90 text-sm sm:text-base md:text-xl max-w-2xl mx-auto px-2">We don't just plan trips; we curate transformative experiences that reshape how you see the world and yourself.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
              {[
                { 
                  title: "10,000+ Happy Travellers", 
                  desc: "Trusted by thousands across India who explored with us." 
                },
                { 
                  title: "500+ Successful Departures", 
                  desc: "Experience in managing treks & trips with seamless execution." 
                },
                { 
                  title: "Best Price Guarantee", 
                  desc: "We deliver top-quality services at the most budget-friendly rates." 
                },
                { 
                  title: "Polite & Professional Staff", 
                  desc: "A caring team that makes your journey smooth, safe, and memorable." 
                },
                { 
                  title: "Community Travel", 
                  desc: "We focus on building community where every trip feels like traveling with friends." 
                },
                { 
                  title: "Authentic Adventure", 
                  desc: "From treks to offbeat trips, we ensure real experiences, not just sightseeing." 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring" }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-primary/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative p-6 md:p-10 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                    {/* Accent Dot */}
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-accent to-orange-400 rounded-full mb-4 md:mb-6" />
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white mb-2 md:mb-4">{item.title}</h3>
                    
                    {/* Description */}
                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 md:mb-6">{item.desc}</p>
                    
                    {/* Accent Line */}
                    <div className="h-1 bg-gradient-to-r from-accent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Feature Highlight */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-20 mx-auto max-w-3xl"
            >
              <div className="bg-gradient-to-r from-accent/20 via-white/10 to-primary/20 backdrop-blur-lg rounded-2xl border border-white/20 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {[
                    { number: "500+", label: "Adventurers" },
                    { number: "50+", label: "Destinations" },
                    { number: "98%", label: "Satisfaction" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">{stat.number}</div>
                      <div className="text-white/80 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Gallery />
        <Founder />
      </main>
      <Footer />
    </motion.div>
  );
}
