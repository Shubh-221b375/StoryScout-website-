import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, MapPin, Heart, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { companyConfig } from "@/lib/companyConfig";

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  const founderImages = [
    "/founder-1.png",
    "/founder-2.png",
    "/founder-3.png"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % founderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const values = [
    {
      icon: MapPin,
      title: "Authentic Exploration",
      description: "We believe in going beyond tourist trails to discover the true essence of each destination through immersive, local experiences."
    },
    {
      icon: Heart,
      title: "Passionate Service",
      description: "Every journey is crafted with care and attention to detail, ensuring your travel dreams become unforgettable stories."
    },
    {
      icon: Users,
      title: "Community First",
      description: "We foster meaningful connections between travelers and local communities, creating positive impact wherever we go."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-b from-primary/20 to-background pt-8 pb-12 md:pt-16 md:pb-20"
        >
          <div className="container mx-auto px-4">
            <Link href="/">
              <a className="inline-flex items-center gap-2 text-accent hover:text-orange-400 transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </a>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-4">
                About <span className="bg-gradient-to-r from-accent via-orange-400 to-accent bg-clip-text text-transparent">StoryScout</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Crafting unforgettable journeys across India and the world. We turn your travel dreams into stories worth telling.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Company Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 border border-primary/20 backdrop-blur-sm"
            >
              <h2 className="text-4xl font-display font-bold text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  StoryScout was born from a passion to transform the way people travel. We believe that travel is more than just visiting places—it's about creating meaningful connections, discovering hidden gems, and crafting stories that last a lifetime.
                </p>
                <p>
                  Founded by <strong className="text-foreground">{companyConfig.founder.name}</strong>, our company has grown from a vision to make premium travel experiences accessible to everyone who seeks authentic adventures. We've carefully curated destinations and itineraries that showcase the best of India and international destinations.
                </p>
                <p>
                  Every package we design is a result of meticulous research, local partnerships, and a deep understanding of what makes travel truly transformative. We're not just travel planners—we're storytellers, experience designers, and your guides to unforgettable moments.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">Our Core Values</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These principles guide every decision we make and every journey we create.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-primary/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-400 rounded-full flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-foreground mb-3">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section 
          className="py-20 md:py-32 relative overflow-hidden"
          style={{
            backgroundImage: `url('/founder-1.png'), url('/founder-2.png'), url('/founder-3.png')`,
            backgroundPosition: '0% center, 50% center, 100% center',
            backgroundSize: 'calc(100% / 3) cover, calc(100% / 3) cover, calc(100% / 3) cover',
            backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/80" />
          
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-12">
                The Passion Behind <span className="text-accent">StoryScout</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-foreground">
                  <strong>{companyConfig.founder.name}</strong> is the visionary behind StoryScout. With a passion for exploration and a commitment to excellence, he has built a company dedicated to creating transformative travel experiences.
                </p>
                <p className="text-muted-foreground">
                  His journey spans across mountains, valleys, and cities, capturing stories of adventure and cultural richness. Every package at StoryScout reflects his personal experiences and deep love for authentic travel.
                </p>
                <div className="pt-4">
                  <p className="text-foreground">
                    Connect on Instagram:{" "}
                    <a
                      href={companyConfig.founder.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-orange-400 transition-colors font-semibold"
                    >
                      {companyConfig.founder.instagram}
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { number: "500+", label: "Happy Adventurers" },
                { number: "50+", label: "Destinations Covered" },
                { number: "98%", label: "Satisfaction Rate" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-accent via-orange-400 to-accent bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 md:py-24 text-center"
        >
          <div className="container mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Ready for Your Next Adventure?
            </h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let's turn your travel dreams into unforgettable stories. Get in touch with our team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:storyscout.in@gmail.com"
                className="px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-orange-600 transition-colors"
              >
                Send Email
              </a>
              <a
                href={companyConfig.social.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-primary border-2 border-accent text-accent font-bold rounded-full hover:bg-accent hover:text-white transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
