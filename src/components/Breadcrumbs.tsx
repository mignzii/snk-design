import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
      <Link to="/" className="hover:text-foreground transition-colors uppercase tracking-wider">
        Accueil
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-3 w-3" />
          {item.href ? (
            <Link to={item.href} className="hover:text-foreground transition-colors uppercase tracking-wider">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground uppercase tracking-wider">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};
