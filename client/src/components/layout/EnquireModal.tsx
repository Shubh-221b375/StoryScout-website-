import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { companyConfig } from "@/lib/companyConfig";
import { Mail, Phone, MessageCircle, Instagram, Youtube, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface EnquireModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnquireModal({ open, onOpenChange }: EnquireModalProps) {
  const [activeTab, setActiveTab] = useState<"contact" | "form">("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to send inquiry");
      
      toast.success("Inquiry sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setActiveTab("contact");
    } catch (error) {
      toast.error("Failed to send inquiry. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactOptions = [
    {
      icon: Mail,
      title: "Email",
      value: companyConfig.contact.email,
      link: `mailto:${companyConfig.contact.email}`,
      type: "email"
    },
    {
      icon: Phone,
      title: "Call Us",
      value: companyConfig.contact.phone2,
      link: `tel:${companyConfig.contact.phone2}`,
      type: "phone"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: companyConfig.contact.whatsapp,
      link: companyConfig.social.whatsappLink,
      type: "whatsapp"
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: companyConfig.social.instagram,
      link: companyConfig.social.instagramLink,
      type: "instagram"
    },
    {
      icon: Youtube,
      title: "YouTube",
      value: companyConfig.social.youtube,
      link: companyConfig.social.youtubeLink,
      type: "youtube"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-primary/95 to-primary/90 border-accent/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display text-white">Get in Touch with StoryScout</DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-white/20">
          <button
            onClick={() => setActiveTab("contact")}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === "contact"
                ? "text-accent border-b-2 border-accent"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            Contact Options
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === "form"
                ? "text-accent border-b-2 border-accent"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            Send Message
          </button>
        </div>

        <div className="space-y-6">
          {/* Contact Options Tab */}
          {activeTab === "contact" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <motion.a
                      key={index}
                      href={option.link}
                      target={option.type === "whatsapp" || option.type === "instagram" || option.type === "youtube" ? "_blank" : undefined}
                      rel={option.type === "whatsapp" || option.type === "instagram" || option.type === "youtube" ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="group"
                    >
                      <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:border-white/40 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent/40 transition-colors">
                            <IconComponent className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white mb-1">{option.title}</h3>
                            <p className="text-sm text-white/80">{option.value}</p>
                          </div>
                        </div>
                        <div className="text-xs text-accent font-medium group-hover:text-orange-400 transition-colors">
                          Click to {option.type === "whatsapp" ? "open WhatsApp" : option.type === "instagram" ? "visit Instagram" : option.type === "youtube" ? "visit YouTube" : option.type === "email" ? "send email" : "call"} →
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <p className="text-white/90">Choose your preferred contact method</p>
                <p className="text-xs text-white/70 mt-2">We're available 24/7 to answer your questions and help you plan your perfect adventure!</p>
              </motion.div>
            </>
          )}

          {/* Form Tab */}
          {activeTab === "form" && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is this about?"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your travel plans or inquiry..."
                  rows={4}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-orange-600 text-white font-semibold py-2 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>

              <p className="text-xs text-white/70 text-center">
                We'll review your inquiry and get back to you within 24 hours.
              </p>
            </motion.form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
