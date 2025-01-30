import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  name: string;
  fileCount: number;
  onView: () => void;
  onDownload: () => void;
  className?: string;
}

export const DocumentCard = ({ name, fileCount, onView, onDownload, className }: DocumentCardProps) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden p-6 transition-all hover:shadow-lg animate-fade-in",
        className
      )}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm">
            <FileText className="mr-2 h-3.5 w-3.5" />
            Document
          </div>
          <h3 className="font-semibold text-xl tracking-tight">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {fileCount} File{fileCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onView}>
            View Files
          </Button>
          <Button size="sm" onClick={onDownload}>
            Download All
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/20 to-primary/40 opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  );
};