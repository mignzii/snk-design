import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { fetchProducts, fetchProductsByType, ShopifyProduct } from "@/lib/shopify";
import { Loader2, Grid2X2, Grid3X3, LayoutGrid, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Collection = () => {
  const { handle } = useParams<{ handle: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("best-selling");
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [displayedCount, setDisplayedCount] = useState(12);
  
  // Filters
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = handle 
          ? await fetchProductsByType(handle, 50)
          : await fetchProducts(50);
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
    "robes": "Robes",
    "ensembles": "Ensembles",
    "new": "Nouveautés",
    "jewelry": "Accessoires",
  };

  const collectionTitle = collectionTitles[handle || ""] || handle?.toUpperCase() || "Collection";

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["Noir", "Blanc", "Rouge", "Bleu", "Rose", "Beige"];

  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    if (selectedSizes.length === 0 && selectedColors.length === 0) {
      return matchesPrice;
    }
    
    return matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
    const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
    
    switch (sortBy) {
      case "price-low-high":
        return priceA - priceB;
      case "price-high-low":
        return priceB - priceA;
      default:
        return 0;
    }
  });

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Size Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-medium mb-4">Taille</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedSizes([...selectedSizes, size]);
                  } else {
                    setSelectedSizes(selectedSizes.filter((s) => s !== size));
                  }
                }}
              />
              <Label
                htmlFor={`size-${size}`}
                className="text-sm cursor-pointer"
              >
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-medium mb-4">Couleur</h3>
        <div className="space-y-3">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedColors([...selectedColors, color]);
                  } else {
                    setSelectedColors(selectedColors.filter((c) => c !== color));
                  }
                }}
              />
              <Label
                htmlFor={`color-${color}`}
                className="text-sm cursor-pointer"
              >
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-medium mb-4">Prix</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange as (value: number[]) => void}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>€{priceRange[0]}</span>
            <span>€{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Reset Filters */}
      {(selectedSizes.length > 0 || selectedColors.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 1000) && (
        <Button
          variant="outline"
          onClick={() => {
            setSelectedSizes([]);
            setSelectedColors([]);
            setPriceRange([0, 1000]);
          }}
          className="w-full uppercase tracking-wider text-xs"
        >
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  );

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

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumbs items={[{ label: collectionTitle }]} />
      </div>

      {/* Filters and Grid Controls */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Drawer */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden uppercase tracking-wider text-xs">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-xs uppercase tracking-widest">Filtres</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-sm tracking-[0.2em] uppercase cursor-pointer focus:outline-none"
            >
              <option value="best-selling">Best Selling</option>
              <option value="newest">Nouveautés</option>
              <option value="trending">Tendances</option>
              <option value="price-low-high">Prix: Croissant</option>
              <option value="price-high-low">Prix: Décroissant</option>
            </select>
            
            <span className="text-sm text-muted-foreground">
              {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''}
            </span>
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

      {/* Products Grid with Sidebar */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-[240px_1fr] gap-12">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          {/* Products Grid */}
          <div>
            {loading ? (
              <div
                className={`grid gap-x-4 gap-y-12 ${
                  gridCols === 2
                    ? "grid-cols-2"
                    : gridCols === 3
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {[...Array(12)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground mb-4">Aucun produit trouvé</p>
                <p className="text-sm text-muted-foreground">
                  Essayez d'ajuster vos filtres ou revenez plus tard!
                </p>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-x-4 gap-y-12 ${
                    gridCols === 2
                      ? "grid-cols-2"
                      : gridCols === 3
                      ? "grid-cols-2 md:grid-cols-3"
                      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  {sortedProducts.slice(0, displayedCount).map((product, index) => (
                    <div key={product.node.id} className="animate-fade-up" style={{ animationDelay: `${(index % 12) * 50}ms` }}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                
                {/* Load More Button */}
                {displayedCount < sortedProducts.length && (
                  <div className="text-center mt-16">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setDisplayedCount(prev => prev + 12)}
                      className="px-12 py-6 uppercase tracking-widest text-xs"
                    >
                      Voir Plus ({sortedProducts.length - displayedCount} restants)
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collection;
