import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Info } from "lucide-react";

interface LaunchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnquireClick: () => void;
  packageTitle?: string;
}

export function LaunchModal({ open, onOpenChange, onEnquireClick, packageTitle }: LaunchModalProps) {
  const handleEnquireClick = () => {
    onOpenChange(false);
    onEnquireClick();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-gradient-to-br from-primary/95 to-primary/90 border-accent/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display text-white text-center">
            Coming Soon!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Icon and Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-accent/20 rounded-full">
                <Calendar className="w-12 h-12 text-accent" />
              </div>
            </div>
            
            <h3 className="text-2xl font-display font-bold text-white">
              Launching in February 2026
            </h3>
            
            {packageTitle && (
              <p className="text-white/90 text-lg">
                <span className="font-semibold">{packageTitle}</span> will be available for booking soon!
              </p>
            )}
            
            <p className="text-white/80 text-sm leading-relaxed">
              We're putting the finishing touches on this amazing adventure. Stay tuned for updates and be among the first to experience it!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="space-y-3"
          >
            <Button
              onClick={handleEnquireClick}
              className="w-full bg-accent hover:bg-orange-600 text-white font-semibold py-3 text-lg flex items-center justify-center gap-2 transition-all"
            >
              <Info className="w-5 h-5" />
              Enquire Now
            </Button>
            
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full border-white/30 text-white hover:bg-white/10 font-semibold py-3 transition-all"
            >
              Close
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-xs text-white/70">
              Have questions? Click "Enquire Now" to get in touch with our team.
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

