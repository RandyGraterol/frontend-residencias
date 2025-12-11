import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, BedDouble, Bath, Maximize, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface PropertyCardProps {
  id: string;
  image: string;
  images?: string[];
  title: string;
  description: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type: string;
  location?: string;
  listingType?: string;
  isFeatured?: boolean;
  index?: number;
}

const PropertyCard = ({
  id,
  image,
  images,
  title,
  description,
  price,
  bedrooms,
  bathrooms,
  area,
  type,
  location,
  listingType = "Alquiler",
  isFeatured,
  index = 0,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const fallbackImage = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800";
  
  // Use images array if available, otherwise use single image
  const imageList = images && images.length > 0 ? images : [image];
  const hasMultipleImages = imageList.length > 1;

  const handlePrevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  }, [imageList.length]);

  const handleNextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  }, [imageList.length]);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const currentImage = imageErrors[currentImageIndex] ? fallbackImage : imageList[currentImageIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Card 
        className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border h-full flex flex-col cursor-pointer"
        onClick={() => navigate(`/propiedades/${id}`)}
      >
        {/* Image Container - Compact */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={currentImage}
              alt={`${title} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onError={() => handleImageError(currentImageIndex)}
            />
          </AnimatePresence>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
            <Badge 
              className={`text-xs px-2 py-0.5 ${
                listingType === "Venta" 
                  ? "bg-green-600 hover:bg-green-600" 
                  : "bg-primary hover:bg-primary"
              }`}
            >
              {listingType}
            </Badge>
            {isFeatured && (
              <Badge className="text-xs px-2 py-0.5 bg-yellow-500 hover:bg-yellow-500 text-yellow-950">
                ⭐ Destacado
              </Badge>
            )}
          </div>

          {/* Like Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </motion.button>

          {/* Image Navigation - Only show if multiple images */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Image Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {imageList.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? "bg-white w-3" 
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                  />
                ))}
                {imageList.length > 5 && (
                  <span className="text-white text-xs ml-1">+{imageList.length - 5}</span>
                )}
              </div>
            </>
          )}

          {/* Price on Image */}
          <div className="absolute bottom-2 left-2">
            <span className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
              {price}
              {listingType !== "Venta" && (
                <span className="text-sm font-normal opacity-90">/mes</span>
              )}
            </span>
          </div>
        </div>

        {/* Content - Compact */}
        <div className="p-3 sm:p-4 flex flex-col flex-1">
          {/* Location & Type */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{location || "San Juan de los Morros"}</span>
            <span className="text-border">•</span>
            <span className="shrink-0">{type}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm sm:text-base leading-tight mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description - Hidden on mobile */}
          <p className="hidden sm:block text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">
            {description}
          </p>

          {/* Features */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground mt-auto pt-2 border-t">
            {bedrooms !== undefined && bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5" />
                <span>{bedrooms}</span>
              </span>
            )}
            {bathrooms !== undefined && bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                <span>{bathrooms}</span>
              </span>
            )}
            {area !== undefined && area > 0 && (
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5" />
                <span>{area >= 1000 ? `${(area / 1000).toFixed(0)}k` : area} m²</span>
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-xs h-7 px-2 text-primary hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/propiedades/${id}`);
              }}
            >
              Ver más →
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
