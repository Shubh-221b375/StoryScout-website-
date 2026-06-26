import { useEffect, useMemo, useState } from "react";
import { useRoute } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnquireModal } from "@/components/layout/EnquireModal";
import { BookingModal } from "@/components/layout/BookingModal";
import { usePackage } from "@/hooks/use-site-data";
import { isLaunchingSoon, LAUNCHING_SOON_LABEL, showOriginalPrice } from "@/lib/packageUtils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle, Clock, Info, Download } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PackageDetail() {
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [match, params] = useRoute("/package/:id");
  const pkgId = params?.id;
  const { pkg, isLoading } = usePackage(pkgId);

  const galleryImages = useMemo(() => {
    if (!pkg) return [];
    if (pkg.gallery && pkg.gallery.length > 0) return pkg.gallery;
    return [pkg.image];
  }, [pkg]);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const id = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % galleryImages.length);
    }, 2000);
    return () => clearInterval(id);
  }, [galleryImages.length]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!pkg) return <div>Package not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold inline-block">
                  {pkg.region}
                </span>
                {isLaunchingSoon(pkg) && (
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold inline-block">
                    {LAUNCHING_SOON_LABEL}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-2">
                {pkg.title}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {pkg.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {pkg.duration}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Gallery */}
            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Gallery</h2>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="aspect-[16/9] relative">
                  {galleryImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`${pkg.title} ${idx + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                        idx === activeImage ? "opacity-100" : "opacity-0"
                      }`}
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  ))}
                </div>
              </div>
            </section>
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {pkg.description}
              </p>
            </section>

            {/* Trek Details */}
            {pkg.details && pkg.details.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold mb-6">Trek Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.details.map((detail, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-border bg-muted/30">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{detail.label}</p>
                      <p className="text-base font-semibold text-foreground">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Why Choose This Trek */}
            {pkg.whyChoose && pkg.whyChoose.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold mb-6">Why Choose This Trek</h2>
                <div className="space-y-4">
                  {pkg.whyChoose.map((point, index) => (
                    <div key={index} className="p-5 rounded-xl border border-border bg-gradient-to-r from-primary/5 to-accent/5">
                      <p className="text-foreground leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itinerary */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-2xl font-display font-bold">Itinerary</h2>
                {pkg.itineraryPdfUrl && (
                  <a
                    href={pkg.itineraryPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="inline-flex"
                  >
                    <Button
                      variant="outline"
                      className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    >
                      <Download className="w-4 h-4" />
                      Download itinerary (PDF)
                    </Button>
                  </a>
                )}
              </div>
              <Accordion type="multiple" className="w-full">
                {pkg.itinerary.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="font-display text-lg hover:no-underline hover:text-primary">
                      <span className="font-sans font-bold mr-4 text-accent">Day {item.day}</span>
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground p-4 bg-muted/30 rounded-b-lg whitespace-pre-line">
                      {item.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl border border-border shadow-lg bg-card">
              <div className="mb-6">
                <span className="text-muted-foreground text-sm">Starting price per person</span>
                <div className="mt-1 flex items-baseline gap-3">
                  {showOriginalPrice(pkg) && (
                    <span className="text-base md:text-lg text-muted-foreground line-through">
                      ₹{pkg.originalPrice!.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-primary">
                    ₹{pkg.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">*Excluding taxes</p>
              </div>

              <div className="space-y-4">
                {pkg.region === 'Trekking' ? (
                  <Button
                    onClick={() => setBookingOpen(true)}
                    className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90"
                  >
                    Book Now
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setBookingOpen(true)}
                    className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90"
                  >
                    Book Now
                  </Button>
                )}
                <Button variant="outline" className="w-full" onClick={() => setEnquireOpen(true)}>
                  <Info className="w-4 h-4 mr-2" />
                  Enquire More
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-bold mb-4">Highlights</h4>
                <ul className="space-y-3">
                  {pkg.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-bold mb-2">Why book with us?</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Best Price Guarantee</li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent" /> No Hidden Charges</li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent" /> 24/7 Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <EnquireModal open={enquireOpen} onOpenChange={setEnquireOpen} />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} pkg={pkg} />
    </div>
  );
}
