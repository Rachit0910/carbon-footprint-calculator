import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import potatoBotImg from "@/assets/potato-bot.png";

interface PotatoBotProps {
  isRefreshing?: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const PotatoBot = ({ isRefreshing = false }: PotatoBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m ALOO🥔, your carbon emission reduction assistant. How can I help you reduce your carbon footprint today?' }
  ]);
  const [inputMessage, setInputMessage] = useState("");

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

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        role: 'assistant',
        content: getContextualResponse(inputMessage)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const getContextualResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('car') || lowerMessage.includes('transport')) {
      return 'Great question! To reduce car emissions, consider: carpooling, using public transport, switching to electric vehicles, or cycling for short trips. Even combining errands into one trip helps!';
    } else if (lowerMessage.includes('flight') || lowerMessage.includes('travel')) {
      return 'Air travel has a significant carbon footprint. Try video calls instead of business trips, choose direct flights when possible, or consider train travel for shorter distances. Offsetting carbon through certified programs can also help!';
    } else if (lowerMessage.includes('electricity') || lowerMessage.includes('energy')) {
      return 'Reducing electricity usage is impactful! Use LED bulbs, unplug devices when not in use, install a smart thermostat, and consider renewable energy sources like solar panels. Every kilowatt saved matters!';
    } else if (lowerMessage.includes('meat') || lowerMessage.includes('food')) {
      return 'Food choices matter! Try meatless Mondays, eat more plant-based meals, buy local produce, and reduce food waste. Even small dietary changes can significantly lower your carbon footprint!';
    } else {
      return 'I\'m here to help you reduce emissions! Ask me about transportation, energy usage, food choices, or any other aspect of your carbon footprint. Together we can make a difference! 🌱';
    }
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
                  <h4 className="text-primary-foreground font-bold text-lg">ALOO🥔</h4>
                  <p className="text-primary-foreground/80 text-xs">Emission Reduction Assistant</p>
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

            {/* Chat Content */}
            <div className="flex flex-col h-[70vh]">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        } animate-fade-in`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me how to reduce emissions..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
