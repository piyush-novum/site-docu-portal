import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface FileListProps {
  files: Array<{
    id: string;
    name: string;
    size: string;
  }>;
  onView: (fileId: string) => void;
  onDownload: (fileId: string) => void;
  className?: string;
}

export const FileList = ({ files, onView, onDownload, className }: FileListProps) => {
  return (
    <ScrollArea className={cn("h-[400px] rounded-md border", className)}>
      <div className="p-4 space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-fade-in"
          >
            <div className="flex items-center space-x-3">
              <File className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">{file.size}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onView(file.id)}>
                View
              </Button>
              <Button size="sm" onClick={() => onDownload(file.id)}>
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};