import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface NewsCardProps {
  title: string;
  summary: string;
  source: string;
  url?: string;
  region?: string;
}

export const NewsCard = ({ title, summary, source, url, region }: NewsCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        {region && (
          <Badge variant="secondary" className="w-fit">
            {region}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {summary}
        </CardDescription>
        <p className="text-xs text-muted-foreground mt-3 font-medium">{source}</p>
      </CardContent>
    </Card>
  );
};
