import { Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SiteCardProps {
  name: string;
  documentCount: number;
  onClick: () => void;
  className?: string;
}

export const SiteCard = ({ name, documentCount, onClick, className }: SiteCardProps) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden p-6 transition-all hover:shadow-lg cursor-pointer animate-fade-in",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm">
            <Building2 className="mr-2 h-3.5 w-3.5" />
            Site
          </div>
          <h3 className="font-semibold text-xl tracking-tight">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {documentCount} Document{documentCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/20 to-primary/40 opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  );
};