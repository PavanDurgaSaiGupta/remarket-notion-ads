
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortFilterProps {
  onSortChange: (value: string) => void;
}

const SortFilter = ({ onSortChange }: SortFilterProps) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-sm font-medium">Sort by:</span>
      <Select onValueChange={onSortChange} defaultValue="newest">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
          <SelectItem value="price_low">Price (low to high)</SelectItem>
          <SelectItem value="price_high">Price (high to low)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilter;
