import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ViewToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

export const ViewToggle = ({ view, onChange }: ViewToggleProps) => {
  return (
    <ToggleGroup type="single" value={view} onValueChange={(value) => onChange(value as "grid" | "list")}>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};