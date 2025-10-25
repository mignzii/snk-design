import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2, Grid2X2, Grid3X3, LayoutGrid } from "lucide-react";

const Collection = () => {
  const { handle } = useParams<{ handle: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("best-selling");
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(50);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [handle]);

  const collectionTitles: { [key: string]: string } = {
    "ss25": "SS25",
    "new": "New Arrivals",
    "head-pieces": "Head Pieces",
    "jewelry": "Jewelry",
  };

  const collectionTitle = collectionTitles[handle || ""] || handle?.toUpperCase() || "Collection";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-secondary/5 flex items-center justify-center overflow-hidden">
        {products[0] && (
          <>
            <img
              src={products[0].node.images.edges[0]?.node.url}
              alt={collectionTitle}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
          </>
        )}
        <h1 className="relative text-5xl md:text-7xl font-light tracking-[0.3em] uppercase text-white z-10">
          {collectionTitle}
        </h1>
      </section>

      {/* Filters and Grid Controls */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-sm tracking-[0.2em] uppercase cursor-pointer focus:outline-none"
            >
              <option value="best-selling">Best Selling</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setGridCols(2)}
              className={`p-2 transition-colors ${
                gridCols === 2 ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid2X2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={`p-2 transition-colors ${
                gridCols === 3 ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-2 transition-colors ${
                gridCols === 4 ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">No products found</p>
            <p className="text-sm text-muted-foreground">Products will be available soon!</p>
          </div>
        ) : (
          <div
            className={`grid gap-x-4 gap-y-12 ${
              gridCols === 2
                ? "grid-cols-2"
                : gridCols === 3
                ? "grid-cols-2 md:grid-cols-3"
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Collection;
