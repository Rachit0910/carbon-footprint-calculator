import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import potatoBotImg from "@/assets/potato-bot.png";
import { EmissionCalculator } from "./EmissionCalculator";

interface PotatoBotProps {
  isRefreshing?: boolean;
}

export const PotatoBot = ({ isRefreshing = false }: PotatoBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDancing, setIsDancing] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      setIsDancing(true);
      setTimeout(() => setIsDancing(false), 2000);
    }
  }, [isRefreshing]);

  const handleBotClick = () => {
    setIsDancing(true);
    setTimeout(() => {
      setIsDancing(false);
      setIsOpen(true);
    }, 500);
  };

  return (
    <>
      {/* Floating Potato Bot Button */}
      {!isOpen && (
        <div className="fixed right-6 bottom-8 z-50">
          <button
            onClick={handleBotClick}
            className={`group relative ${isDancing ? "animate-dance" : "animate-float"}`}
            aria-label="Open Chatbot"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all" />
            <img
              src={potatoBotImg}
              alt="Potato Bot"
              className="relative w-24 h-24 drop-shadow-2xl transition-transform group-hover:scale-110"
            />
            <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full p-2 shadow-lg animate-bounce-soft">
              <MessageCircle className="h-4 w-4" />
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed right-6 bottom-8 z-50 w-[90vw] max-w-md">
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-primary/20 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={potatoBotImg}
                  alt="Potato Bot"
                  className="w-12 h-12 animate-bounce-soft"
                />
                <div>
                  <h4 className="text-primary-foreground font-bold text-lg">Potato Bot</h4>
                  <p className="text-primary-foreground/80 text-xs">Carbon Calculator & Advisor</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Calculator Content */}
            <div className="p-4 max-h-[70vh] overflow-auto">
              <EmissionCalculator />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
