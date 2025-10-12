import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Info } from "lucide-react";

interface MenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: "about" | "info";
}

export const MenuDialog = ({ open, onOpenChange, content }: MenuDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {content === "about" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">About Us</DialogTitle>
              <DialogDescription>Get in touch with the creator</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Creator</h3>
                <p className="text-muted-foreground">Rachit Mishra</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Contact Information</h3>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:8881928592" className="hover:text-primary transition-colors">
                    8881928592
                  </a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Available via phone</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => window.location.href = "tel:8881928592"}
                  className="w-full bg-gradient-to-r from-primary to-primary/80"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                <Info className="h-6 w-6" />
                Project Information
              </DialogTitle>
              <DialogDescription>About Carbon Emissions Awareness</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Mission</h3>
                <p className="text-muted-foreground text-sm">
                  Our mission is to raise awareness about carbon emissions and provide tools to help
                  individuals and organizations track and reduce their carbon footprint.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Real-time global carbon emissions news</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Interactive emission calculator</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Personalized tips to reduce emissions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>AI-powered chatbot assistance</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Technology</h3>
                <p className="text-muted-foreground text-sm">
                  Built with modern web technologies including React, TypeScript, and Tailwind CSS,
                  with a focus on performance and user experience.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-muted-foreground italic">
                  Together, we can make a difference in fighting climate change.
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
