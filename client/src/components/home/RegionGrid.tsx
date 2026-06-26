import { motion } from "framer-motion";
import { regions } from "@/lib/mockData";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function RegionGrid() {
  return (
    <section id="regions" className="pt-16 md:pt-32 pb-6 md:pb-8 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl transform translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-20 max-w-3xl mx-auto px-2">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-medium tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-3 block"
          >
            Discover Incredible India & Beyond
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-3 md:mb-6"
          >
            Destinations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base md:text-xl leading-relaxed"
          >
            From the snowy peaks of the North to the tranquil backwaters of the South, choose your next adventure from our curated selection of paradise.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[320px] lg:auto-rows-[400px]">
          {/* Trekking - Main Feature (Large) */}
          <div className="md:col-span-8 md:row-span-1">
            <Link href={`/region/${regions[0].id}`}>
              <a className="block h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                  className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-xl md:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                  <img 
                    src={regions[0].image} 
                    alt={regions[0].name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-10 z-20 w-full">
                    <span className="text-white/80 uppercase tracking-widest text-[10px] md:text-xs font-bold mb-1 md:mb-2 block">Most Popular</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2 md:mb-3">{regions[0].name}</h3>
                    <p className="text-white/90 text-sm md:text-lg max-w-xl mb-3 md:mb-6 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 line-clamp-2 md:line-clamp-none">
                      {regions[0].description}
                    </p>
                    <div className="inline-flex items-center text-white border border-white/30 rounded-full px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
                      Explore Packages <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </a>
            </Link>
          </div>

          {/* North India - Secondary Feature (Tall) */}
          <div className="md:col-span-4 md:row-span-2">
             <Link href={`/region/${regions[1].id}`}>
              <a className="block h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                  className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-xl md:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                  <img 
                    src={regions[1].image} 
                    alt={regions[1].name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 z-20 w-full">
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-display font-bold text-white mb-2 md:mb-3">{regions[1].name}</h3>
                    <p className="text-white/90 text-sm md:text-base mb-3 md:mb-6 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 line-clamp-2 md:line-clamp-3">
                      {regions[1].description}
                    </p>
                    <div className="inline-flex items-center text-white border border-white/30 rounded-full px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
                      Explore Packages <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </a>
            </Link>
          </div>

          {/* South India - Standard Card */}
          <div className="md:col-span-4 md:row-span-1">
            <Link href={`/region/${regions[2].id}`}>
              <a className="block h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-lg md:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src={regions[2].image} 
                    alt={regions[2].name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-4 md:p-8 z-20 w-full">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white mb-2 md:mb-4">{regions[2].name}</h3>
                    <div className="inline-flex items-center text-white border border-white/30 rounded-full px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
                      Explore Packages <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </a>
            </Link>
          </div>

          {/* West India - Standard Card */}
          <div className="md:col-span-4 md:row-span-1">
            <Link href={`/region/${regions[3].id}`}>
              <a className="block h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-lg md:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src={regions[3].image} 
                    alt={regions[3].name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-4 md:p-8 z-20 w-full">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white mb-2 md:mb-4">{regions[3].name}</h3>
                    <div className="inline-flex items-center text-white border border-white/30 rounded-full px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
                      Explore Packages <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </a>
            </Link>
          </div>

          {/* East India - Half Width Banner */}
          <div className="md:col-span-6 h-[160px] sm:h-[200px] md:h-[280px]">
            <Link href={`/region/${regions[4].id}`}>
              <a className="block h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                  className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-xl md:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                  <img 
                    src={regions[4].image} 
                    alt={regions[4].name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center p-4 md:p-6 gap-2 md:gap-4">
                    <span className="text-white/90 uppercase tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-sm font-bold">Mist-Covered Valleys</span>
                    <h3 className="text-2xl sm:text-3xl md:text-6xl font-display font-bold text-white">{regions[4].name}</h3>
                    <div className="inline-flex items-center justify-center text-white border border-white/30 rounded-full px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
                      Explore Packages <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </a>
            </Link>
          </div>

          {/* International - Half Width Banner */}
          <div className="md:col-span-6 h-[160px] sm:h-[200px] md:h-[280px]">
            <Link href={`/region/${regions[5].id}`}>
              <a className="block h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 }}
                  whileHover={{ scale: 1.01 }}
                  className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-xl md:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                  <img 
                    src={regions[5].image} 
                    alt={regions[5].name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center p-4 md:p-6 gap-2 md:gap-4">
                    <span className="text-white/90 uppercase tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-sm font-bold">Go Beyond Borders</span>
                    <h3 className="text-2xl sm:text-3xl md:text-6xl font-display font-bold text-white">{regions[5].name}</h3>
                    <div className="inline-flex items-center justify-center text-white border border-white/30 rounded-full px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
                      Explore Packages <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
