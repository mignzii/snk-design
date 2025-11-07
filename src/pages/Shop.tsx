import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { Footer } from "@/components/Footer";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Grid2X2, Grid3X3, LayoutGrid, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("best-selling");
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [displayedCount, setDisplayedCount] = useState(12);
  
  // Filters
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(100);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Noir", "Blanc", "Rouge", "Bleu", "Rose", "Beige", "Vert", "Ivoire", "Argent", "Or"];
  const categories = ["Robes de Soirée", "Robes Cocktail", "Robes Maxi", "Robes Midi", "Robes Mini"];

  // Apply filters
  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    if (!matchesPrice) return false;
    
    if (showOnlyInStock) {
      const hasStock = product.node.variants.edges.some(v => v.node.availableForSale);
      if (!hasStock) return false;
    }
    
    // For now, we accept all products if no specific filters are selected
    // In a real app, you'd filter by actual product tags/types
    return true;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
    const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
    
    switch (sortBy) {
      case "price-low-high":
        return priceA - priceB;
      case "price-high-low":
        return priceB - priceA;
      case "newest":
        return 0; // Would need product creation date
      case "trending":
        return 0; // Would need analytics data
      default:
        return 0;
    }
  });

  const hasActiveFilters = 
    selectedSizes.length > 0 || 
    selectedColors.length > 0 || 
    selectedCategories.length > 0 ||
    priceRange[0] !== 0 || 
    priceRange[1] !== 2000 ||
    showOnlyInStock;

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
    setShowOnlyInStock(false);
  };

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Availability */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-medium mb-4">Disponibilité</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={showOnlyInStock}
            onCheckedChange={(checked) => setShowOnlyInStock(!!checked)}
          />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            En stock uniquement
          </Label>
        </div>
      </div>

      <Separator />

      {/* Price Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-medium mb-4">Prix</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange as (value: number[]) => void}
            max={2000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>CAD ${priceRange[0]}</span>
            <span>CAD ${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Size Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-medium mb-4">Taille</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                if (selectedSizes.includes(size)) {
                  setSelectedSizes(selectedSizes.filter((s) => s !== size));
                } else {
                  setSelectedSizes([...selectedSizes, size]);
                }
              }}
              className={`px-3 py-2 text-sm border transition-all ${
                selectedSizes.includes(size)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Color Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-medium mb-4">Couleur</h3>
        <div className="space-y-2">
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
              <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Category Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-medium mb-4">Catégorie</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== category));
                  }
                }}
              />
              <Label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="outline"
            onClick={resetFilters}
            className="w-full uppercase tracking-wider text-xs"
          >
            Réinitialiser
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-secondary/5 flex items-center justify-center overflow-hidden">
        {products[0] && (
          <>
            <img
              src={products[0].node.images.edges[0]?.node.url}
              alt="Shop"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80" />
          </>
        )}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] uppercase mb-4 animate-fade-in">
            Boutique
          </h1>
          <p className="text-sm md:text-base text-muted-foreground tracking-widest uppercase animate-fade-in" style={{ animationDelay: "100ms" }}>
            Découvrez Notre Collection Exclusive
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="border-b border-border sticky top-[73px] bg-background z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Filter Drawer */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden uppercase tracking-wider text-xs">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtres
                  {hasActiveFilters && (
                    <span className="ml-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
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

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-border px-3 py-1.5 rounded text-sm tracking-[0.1em] uppercase cursor-pointer focus:outline-none focus:border-primary transition-colors"
            >
              <option value="best-selling">Best Sellers</option>
              <option value="newest">Nouveautés</option>
              <option value="trending">Tendances</option>
              <option value="price-low-high">Prix: Croissant</option>
              <option value="price-high-low">Prix: Décroissant</option>
            </select>
            
            {/* Product Count */}
            <span className="text-sm text-muted-foreground hidden sm:block">
              {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Grid Controls */}
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
              className={`p-2 transition-colors hidden md:block ${
                gridCols === 4 ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid with Sidebar */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <h2 className="text-lg font-serif mb-6">Filtres</h2>
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
                <p className="text-sm text-muted-foreground mb-8">
                  Essayez d'ajuster vos filtres
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={resetFilters}>
                    Réinitialiser les filtres
                  </Button>
                )}
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
                    <div 
                      key={product.node.id} 
                      className="animate-fade-up" 
                      style={{ animationDelay: `${(index % 12) * 30}ms` }}
                    >
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
                      className="px-12 py-6 uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all"
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

export default Shop;
