import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Leaf, RefreshCw } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";
import { PotatoBot } from "@/components/PotatoBot";
import { MenuDialog } from "@/components/MenuDialog";
import riverBg from "@/assets/river-bg.jpg";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<"about" | "info">("about");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newsKey, setNewsKey] = useState(0);

  const openDialog = (content: "about" | "info") => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const refreshNews = () => {
    setIsRefreshing(true);
    setNewsKey(prev => prev + 1);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshNews();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Sample news data
  const newsItems = [
    {
      title: "Global CO2 Emissions Reach Record High in 2024",
      summary: "Despite climate pledges, global carbon emissions from fossil fuels reached a new peak this year, according to the latest climate report.",
      source: "International Energy Agency",
      region: "Global",
      url: "#",
    },
    {
      title: "EU Announces Stricter Emission Targets for 2030",
      summary: "European Union leaders commit to reducing greenhouse gas emissions by 55% compared to 1990 levels by the end of the decade.",
      source: "European Commission",
      region: "Europe",
      url: "#",
    },
    {
      title: "Renewable Energy Surpasses Coal in US Power Generation",
      summary: "For the first time in history, renewable energy sources generated more electricity than coal in the United States over the past year.",
      source: "US Energy Department",
      region: "North America",
      url: "#",
    },
    {
      title: "China Invests $550B in Green Technology",
      summary: "China announces massive investment in renewable energy and electric vehicle infrastructure as part of carbon neutrality goals.",
      source: "Reuters",
      region: "Asia",
      url: "#",
    },
    {
      title: "Ocean Carbon Absorption Declining Faster Than Expected",
      summary: "New research shows that oceans are absorbing less CO2 than previously thought, raising concerns about climate tipping points.",
      source: "Nature Climate Change",
      region: "Global",
      url: "#",
    },
    {
      title: "Corporate Giants Pledge Net-Zero by 2040",
      summary: "Over 200 major corporations commit to achieving net-zero carbon emissions a decade ahead of Paris Agreement timeline.",
      source: "UN Climate Summit",
      region: "Global",
      url: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Carbon Emissions Awareness
            </h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => openDialog("about")}>
                About Us
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDialog("info")}>
                Information
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 container mx-auto px-4 pb-12">
        {/* Hero Section with Background */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${riverBg})`,
              filter: "brightness(0.7)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Global Carbon Emissions
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow-md">
              News & Updates from Around the World
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-2">Latest Updates</h3>
              <p className="text-muted-foreground">Stay informed about global carbon emission trends and initiatives</p>
            </div>
            <Button
              onClick={refreshNews}
              disabled={isRefreshing}
              variant="outline"
              size="icon"
              className="relative"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news, index) => (
              <NewsCard key={`${newsKey}-${index}`} {...news} />
            ))}
          </div>
        </section>
      </main>

      {/* Potato Bot */}
      <PotatoBot isRefreshing={isRefreshing} />

      {/* Menu Dialog */}
      <MenuDialog open={dialogOpen} onOpenChange={setDialogOpen} content={dialogContent} />
    </div>
  );
};

export default Index;
