import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface PropertyFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

const PropertyFilters = ({ onFiltersChange }: PropertyFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [propertyType, setPropertyType] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [furnished, setFurnished] = useState<boolean | null>(null);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onFiltersChange?.({ priceRange: value, propertyType, bedrooms, furnished });
  };

  const handlePropertyTypeChange = (value: string) => {
    setPropertyType(value);
    // Reset bedrooms if Cuarto is selected
    const newBedrooms = value === "Cuarto" ? "all" : bedrooms;
    setBedrooms(newBedrooms);
    onFiltersChange?.({ priceRange, propertyType: value, bedrooms: newBedrooms, furnished });
  };

  const handleBedroomsChange = (value: string) => {
    setBedrooms(value);
    onFiltersChange?.({ priceRange, propertyType, bedrooms: value, furnished });
  };

  const handleFurnishedChange = (checked: boolean) => {
    const newValue = checked ? true : null;
    setFurnished(newValue);
    onFiltersChange?.({ priceRange, propertyType, bedrooms, furnished: newValue });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold">Filtros de búsqueda</h3>
      
      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-base">Rango de precio ($/mes)</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={1000}
            step={10}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>$ {priceRange[0]}</span>
          <span>$ {priceRange[1]}</span>
        </div>
      </div>

      {/* Property Type */}
      <div className="space-y-3">
        <Label htmlFor="propertyType" className="text-base">Tipo de propiedad</Label>
        <Select value={propertyType} onValueChange={handlePropertyTypeChange}>
          <SelectTrigger id="propertyType">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Casa">Casa</SelectItem>
            <SelectItem value="Apartamento">Apartamento</SelectItem>
            <SelectItem value="Cuarto">Cuarto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bedrooms - Hidden when Cuarto is selected */}
      {propertyType !== "Cuarto" && (
        <div className="space-y-3">
          <Label htmlFor="bedrooms" className="text-base">Habitaciones</Label>
          <Select value={bedrooms} onValueChange={handleBedroomsChange}>
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="1">1 habitación</SelectItem>
              <SelectItem value="2">2 habitaciones</SelectItem>
              <SelectItem value="3">3 habitaciones</SelectItem>
              <SelectItem value="4">4+ habitaciones</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Furnished */}
      <div className="flex items-center justify-between">
        <Label htmlFor="furnished" className="text-base">Amoblado</Label>
        <Switch
          id="furnished"
          checked={furnished === true}
          onCheckedChange={handleFurnishedChange}
        />
      </div>
    </div>
  );
};

export default PropertyFilters;
