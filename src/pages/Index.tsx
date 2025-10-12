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
import { EmissionCalculator } from "@/components/EmissionCalculator";
import riverBg from "@/assets/river-bg.jpg";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  title: string;
  summary: string;
  source: string;
  region: string;
  url: string;
}

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<"about" | "info">("about");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newsKey, setNewsKey] = useState(0);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const openDialog = (content: "about" | "info") => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('fetch-carbon-news');
      
      if (error) throw error;
      
      if (data?.news) {
        setNewsItems(data.news);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // Use fallback news if fetch fails
      setNewsItems([
        {
          title: "Global CO2 Emissions Reach Record High in 2024",
          summary: "Despite climate pledges, global carbon emissions from fossil fuels reached a new peak this year.",
          source: "International Energy Agency",
          region: "Global",
          url: "https://www.iea.org/",
        },
        {
          title: "EU Announces Stricter Emission Targets for 2030",
          summary: "European Union leaders commit to reducing greenhouse gas emissions by 55% compared to 1990 levels.",
          source: "European Commission",
          region: "Europe",
          url: "https://ec.europa.eu/",
        },
        {
          title: "Renewable Energy Surpasses Coal in US Power Generation",
          summary: "For the first time, renewable energy sources generated more electricity than coal in the United States.",
          source: "US Energy Department",
          region: "North America",
          url: "https://www.energy.gov/",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshNews = async () => {
    setIsRefreshing(true);
    setNewsKey(prev => prev + 1);
    await fetchNews();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshNews();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

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

        {/* Calculator Section */}
        <section className="mb-12">
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-primary/20 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4">
              <h3 className="text-2xl font-bold text-primary-foreground">Carbon Emissions Calculator & Advisor</h3>
              <p className="text-primary-foreground/80 text-sm">Calculate your carbon footprint and get personalized advice</p>
            </div>
            <div className="p-6">
              <EmissionCalculator />
            </div>
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
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-48 bg-card/80 backdrop-blur-sm border-2 rounded-lg animate-pulse" />
              ))
            ) : (
              newsItems.map((news, index) => (
                <NewsCard key={`${newsKey}-${index}`} {...news} />
              ))
            )}
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
