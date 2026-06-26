import { motion } from "framer-motion";
import { Sparkles, MapPin, Heart } from "lucide-react";

export function Founder() {
  return (
    <section 
      className="py-48 relative overflow-hidden"
      style={{
        backgroundImage: `url('/founder-composite.jpeg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Layered Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/50" />

      {/* Main Content - Centered */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-32 text-white/60 pt-0"
        >
          The Passion Behind <span className="bg-gradient-to-r from-accent/60 via-orange-400/60 to-accent/60 bg-clip-text text-transparent">StoryScout</span>
        </motion.h2>

        {/* Text Content - Direct on Background */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto px-8 pb-24"
        >
          {/* Founder Name & Title */}
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-3 drop-shadow-lg">Sankalp Mishra</h3>
            <div className="inline-flex items-center gap-2 text-accent drop-shadow-md">
              <Sparkles className="w-4 h-4 text-accent" />
              <p className="font-bold tracking-widest uppercase text-xs">Founder & Visionary</p>
            </div>
          </div>

          {/* Bio with Icons */}
          <div className="space-y-8 text-white/95">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg leading-relaxed flex gap-4 drop-shadow-md"
            >
              <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <span>Sankalp Mishra is a passionate traveler, explorer, and content creator who has been on the road for the past seven years, discovering hidden gems and authentic experiences across India. For the last year, he has also been creating travel content, inspiring others to step out of their comfort zones.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg leading-relaxed flex gap-4 drop-shadow-md"
            >
              <Heart className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <span>A trekking enthusiast at heart, Sankalp founded StoryScout to bring together a community of travelers who share the same passion for exploration. StoryScout isn't just a company, it's a collective where like-minded adventurers can connect, plan journeys together, and experience travel in its truest form.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-lg leading-relaxed flex gap-4 drop-shadow-md"
            >
              <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <span>Through StoryScout, Sankalp Mishra aims to make people see the world differently, not as tourists, but as explorers who seek authentic experiences, meaningful stories, and lasting friendships.</span>
            </motion.p>
          </div>

          {/* Accent divider */}
          <div className="mt-10 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-10 text-center italic text-white/90 drop-shadow-lg"
          >
            <p className="text-xl md:text-2xl font-display">
              "Travel is not about reaching a destination, it's about the stories you collect along the way."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
