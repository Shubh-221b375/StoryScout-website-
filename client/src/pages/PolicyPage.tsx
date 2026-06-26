import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PolicyPage() {
  const policies = [
    "To book your slot, you must pay ₹1,000 in advance (non-refundable).",
    "The remaining trek fee must be paid after pickup in Rishikesh or at hotel check-in in Sankri.",
    "If the full fee is not paid, you will not be allowed to join the trek.",
    "If you cancel before or during the trek, or if you cannot continue due to medical/personal reasons, no refund will be given.",
    "If you arrive late or miss the pickup point, it will be treated as a cancellation, and no refund/rescheduling will be provided.",
    "If you leave the trek midway for any reason (injury, choice, fatigue, etc.), no refund will be made.",
    "The trek fee is non-transferable to another person or future trek unless the company allows it.",
    "If the trek is canceled by the company due to bad weather, natural disaster, government orders, or other unavoidable reasons, the company may offer rescheduling, but no cash refund will be issued.",
    "Any extra expenses (like transport delays, medical needs, landslides, or roadblocks) must be paid by the participant and are not included in the trek fee.",
    "Always keep your payment receipt/transaction proof as booking confirmation."
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
                Payment, Cancellation &<br />
                <span className="bg-gradient-to-r from-accent via-orange-400 to-accent bg-clip-text text-transparent">
                  Refund Policy
                </span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Please read our comprehensive policy regarding payments, cancellations, and refunds for all StoryScout treks and packages.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 shadow-xl"
            >
              <div className="space-y-6">
                {policies.map((policy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-primary font-bold">
                        •
                      </div>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-primary-foreground/95">
                      {policy}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Disclaimer */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t border-white/20"
              >
                <p className="text-sm text-primary-foreground/80 italic">
                  <strong>Disclaimer:</strong> This policy is effective for all treks and travel packages offered by StoryScout. By booking with us, you acknowledge that you have read, understood, and agreed to these terms and conditions. For any questions or clarifications, please contact us at {" "}
                  <a href="mailto:storyscout.in@gmail.com" className="text-accent hover:text-orange-400 transition-colors">
                    storyscout.in@gmail.com
                  </a>
                  {" "} or call us at {" "}
                  <a href="tel:+918865086460" className="text-accent hover:text-orange-400 transition-colors">
                    +91 88650 86460
                  </a>.
                </p>
              </motion.div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-16 text-center"
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
                Have Questions?
              </h3>
              <p className="text-muted-foreground mb-8">
                Our team is here to help. Feel free to reach out with any inquiries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:storyscout.in@gmail.com"
                  className="px-8 py-3 bg-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Send Email
                </a>
                <a
                  href="https://wa.me/918865086460"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-primary border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent hover:text-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
