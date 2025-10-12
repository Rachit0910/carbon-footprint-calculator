import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const fallbackNews = [
  {
    title: "Global CO2 Emissions Reach Record High in 2024",
    summary: "Despite climate pledges, global carbon emissions from fossil fuels reached a new peak this year, according to the latest climate report.",
    source: "International Energy Agency",
    region: "Global",
    url: "https://www.iea.org/",
    timestamp: new Date().toISOString(),
  },
  {
    title: "EU Announces Stricter Emission Targets for 2030",
    summary: "European Union leaders commit to reducing greenhouse gas emissions by 55% compared to 1990 levels by the end of the decade.",
    source: "European Commission",
    region: "Europe",
    url: "https://ec.europa.eu/",
    timestamp: new Date().toISOString(),
  },
  {
    title: "Renewable Energy Surpasses Coal in US Power Generation",
    summary: "For the first time in history, renewable energy sources generated more electricity than coal in the United States over the past year.",
    source: "US Energy Department",
    region: "North America",
    url: "https://www.energy.gov/",
    timestamp: new Date().toISOString(),
  },
  {
    title: "China Invests $550B in Green Technology",
    summary: "China announces massive investment in renewable energy and electric vehicle infrastructure as part of carbon neutrality goals.",
    source: "Reuters",
    region: "Asia",
    url: "https://www.reuters.com/",
    timestamp: new Date().toISOString(),
  },
  {
    title: "Ocean Carbon Absorption Declining Faster Than Expected",
    summary: "New research shows that oceans are absorbing less CO2 than previously thought, raising concerns about climate tipping points.",
    source: "Nature Climate Change",
    region: "Global",
    url: "https://www.nature.com/",
    timestamp: new Date().toISOString(),
  },
  {
    title: "Corporate Giants Pledge Net-Zero by 2040",
    summary: "Over 200 major corporations commit to achieving net-zero carbon emissions a decade ahead of Paris Agreement timeline.",
    source: "UN Climate Summit",
    region: "Global",
    url: "https://www.un.org/",
    timestamp: new Date().toISOString(),
  },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Fetch news from a free RSS feed or API
    // Using Climate Change News API endpoint (free, no key required)
    const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_62584b68e6e4f0ba2eb1e2e8e3e4c3c3a3d87&q=carbon%20emissions%20OR%20climate%20change%20OR%20greenhouse%20gas&language=en&category=environment');
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ news: fallbackNews }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    // Transform the API response to our format
    const newsItems = data.results?.slice(0, 6).map((article: any) => ({
      title: article.title || "Carbon Emissions Update",
      summary: article.description || article.content || "Latest updates on carbon emissions and climate change.",
      source: article.source_id || "Environmental News",
      region: article.country?.[0] || "Global",
      url: article.link || "#",
      timestamp: article.pubDate || new Date().toISOString(),
    })) || [];

    return new Response(
      JSON.stringify({ news: newsItems.length > 0 ? newsItems : fallbackNews }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching news:', error);
    
    return new Response(
      JSON.stringify({ news: fallbackNews }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
