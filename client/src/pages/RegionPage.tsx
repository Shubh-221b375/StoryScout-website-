import { useRoute } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PackageCard } from "@/components/shared/PackageCard";
import { packages, regions } from "@/lib/mockData";
import { motion } from "framer-motion";

export default function RegionPage() {
  const [match, params] = useRoute("/region/:id");
  const regionId = params?.id;

  // Find region info (handle case-insensitive match or "all")
  const regionInfo = regions.find(r => r.id.toLowerCase() === regionId?.toLowerCase()) || 
                    (regionId === 'all' ? { name: "All Destinations", description: "Explore our complete collection of journeys.", image: packages[0].image } : null);

  if (!regionInfo) {
    return <div>Region not found</div>;
  }

  // Filter packages
  const filteredPackages = regionId === 'all' 
    ? packages 
    : packages.filter(p => {
        // Match by package region value (e.g., 'Trekking', 'North', 'South') with region name or ID
        const packageRegion = p.region.toLowerCase();
        const regionNameFirstWord = regionInfo.name.toLowerCase().split(' ')[0];
        const regionIdLower = regionId?.toLowerCase();
        
        // Handle special cases
        if (regionIdLower === 'foreign' && packageRegion === 'foreign') return true;
        if (regionIdLower === 'trekking' && packageRegion === 'trekking') return true;
        if (regionIdLower === 'north' && packageRegion === 'north') return true;
        if (regionIdLower === 'south' && packageRegion === 'south') return true;
        if (regionIdLower === 'east' && packageRegion === 'east') return true;
        if (regionIdLower === 'west' && packageRegion === 'west') return true;
        
        // Fallback: match first word of region name
        return packageRegion === regionNameFirstWord;
      });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Region Hero */}
      <div className="relative h-[35vh] sm:h-[40vh] md:h-[50vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={regionInfo.image} 
          alt={regionInfo.name} 
          className="w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-3 md:mb-4"
          >
            {regionInfo.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto text-white/90"
          >
            {regionInfo.description}
          </motion.p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
        {filteredPackages.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No packages found for this region yet. Check back soon!
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
