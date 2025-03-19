
import { RefreshCw, Trash2 } from "lucide-react";

interface TableHeaderProps {
  title: string;
  onFlush: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const TableHeader = ({ title, onFlush, onRefresh, isLoading }: TableHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Data Table</p>
        <h2 className="text-xl font-medium tracking-tight">{title}</h2>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onFlush}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium 
                    transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none 
                    focus-visible:ring-1 focus-visible:ring-destructive/30 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Flush data"
        >
          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
          <span>Flush</span>
        </button>
        
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium 
                    bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 
                    disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Refresh data"
        >
          <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
