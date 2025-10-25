import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";

interface RelatedProductsSectionProps {
  currentProductId: string;
  title?: string;
  limit?: number;
}

const RELATED_PRODUCTS_QUERY = `
  query GetRelatedProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

export const RelatedProductsSection = ({ 
  currentProductId, 
  title = "Vous Aimerez Aussi",
  limit = 8 
}: RelatedProductsSectionProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        const data = await storefrontApiRequest(RELATED_PRODUCTS_QUERY, { 
          first: limit + 1 
        });
        
        // Filter out current product and limit to desired number
        const filtered = data.data.products.edges
          .filter((product: ShopifyProduct) => product.node.id !== currentProductId)
          .slice(0, limit);
        
        setProducts(filtered);
      } catch (error) {
        console.error("Failed to load related products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedProducts();
  }, [currentProductId, limit]);

  if (!loading && products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-20 border-t">
      <div className="text-center mb-16">
        <h2 className="text-sm font-normal tracking-[0.3em] uppercase text-muted-foreground mb-2">
          {title}
        </h2>
        <div className="w-16 h-px bg-foreground mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))
        ) : (
          products.map((product) => (
            <div key={product.node.id} className="animate-fade-up">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};
