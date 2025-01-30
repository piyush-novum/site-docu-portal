import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    onClick: () => void;
  }>;
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)}>
      <button
        onClick={() => items[0].onClick()}
        className="inline-flex items-center text-muted-foreground hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </button>
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <button
            onClick={item.onClick}
            className={cn(
              "px-2 py-1 rounded-md hover:bg-muted transition-colors",
              index === items.length - 1 ? "font-medium" : "text-muted-foreground"
            )}
          >
            {item.label}
          </button>
        </div>
      ))}
    </nav>
  );
};