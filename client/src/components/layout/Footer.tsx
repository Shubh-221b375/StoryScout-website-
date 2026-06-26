import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, Phone, MessageCircle, Youtube } from "lucide-react";
import { companyConfig } from "@/lib/companyConfig";
import logo from "@assets/logo_1763751397591.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <img 
              src={logo} 
              alt="StoryScout Logo" 
              className="h-20 w-auto mb-4"
            />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {companyConfig.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="/#regions" className="hover:text-accent transition-colors">Destinations</a></li>
              <li><a href="/region/all" className="hover:text-accent transition-colors">Packages</a></li>
              <li><a href="/private-tours" className="hover:text-accent transition-colors">Private Tours</a></li>
              <li><a href="/reviews" className="hover:text-accent transition-colors">Reviews</a></li>
              <li><a href="/about" className="hover:text-accent transition-colors">About</a></li>
              <li><a href="/policy" className="hover:text-accent transition-colors">Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${companyConfig.contact.phone1}`} className="hover:text-accent transition-colors">
                    {companyConfig.contact.phone1}
                  </a>
                  <a href={`tel:${companyConfig.contact.phone2}`} className="hover:text-accent transition-colors">
                    {companyConfig.contact.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <a href={companyConfig.social.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  {companyConfig.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href={`mailto:${companyConfig.contact.email}`} className="hover:text-accent transition-colors">
                  {companyConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 flex-wrap">
              <a 
                href={companyConfig.social.instagramLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-white transition-colors"
                title={companyConfig.social.instagram}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={companyConfig.social.whatsappLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-white transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href={companyConfig.social.youtubeLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-white transition-colors"
                title={companyConfig.social.youtube}
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} {companyConfig.name} Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
