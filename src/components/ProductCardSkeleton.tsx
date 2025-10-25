import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="animate-fade-in">
      {/* Image skeleton */}
      <Skeleton className="aspect-[3/4] w-full mb-3" />
      
      {/* Title skeleton */}
      <Skeleton className="h-4 w-3/4 mb-2" />
      
      {/* Price skeleton */}
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
};
