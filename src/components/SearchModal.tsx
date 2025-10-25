import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SEARCH_QUERY = `
  query SearchProducts($query: String!) {
    products(first: 10, query: $query) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const SearchModal = ({ open, onOpenChange }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchProducts = async () => {
      setLoading(true);
      try {
        const data = await storefrontApiRequest(SEARCH_QUERY, { 
          query: `title:*${query}*` 
        });
        setResults(data.data.products.edges || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <div className="sticky top-0 bg-background border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 border-0 focus-visible:ring-0"
              autoFocus
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((product) => {
                const { node } = product;
                const price = parseFloat(node.priceRange.minVariantPrice.amount);
                return (
                  <Link
                    key={node.id}
                    to={`/product/${node.handle}`}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/10 transition-colors"
                  >
                    <div className="w-16 h-16 bg-secondary/10 flex-shrink-0 overflow-hidden">
                      {node.images.edges[0] && (
                        <img
                          src={node.images.edges[0].node.url}
                          alt={node.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{node.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {node.priceRange.minVariantPrice.currencyCode} {price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : query.trim() ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Aucun résultat trouvé pour "{query}"</p>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">Commencez à taper pour rechercher</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
