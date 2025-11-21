import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface PropertyFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

const PropertyFilters = ({ onFiltersChange }: PropertyFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [propertyType, setPropertyType] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [furnished, setFurnished] = useState<boolean>(false);
  const [listingTypeRent, setListingTypeRent] = useState<boolean>(false);
  const [listingTypeSale, setListingTypeSale] = useState<boolean>(false);

  const getListingTypeFilter = () => {
    if (listingTypeRent && !listingTypeSale) return "Alquiler";
    if (!listingTypeRent && listingTypeSale) return "Venta";
    return "all";
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onFiltersChange?.({ priceRange: value, propertyType, bedrooms, furnished, listingType: getListingTypeFilter() });
  };

  const handlePropertyTypeChange = (value: string) => {
    setPropertyType(value);
    // Reset bedrooms if Cuarto is selected
    const newBedrooms = value === "Cuarto" ? "all" : bedrooms;
    setBedrooms(newBedrooms);
    onFiltersChange?.({ priceRange, propertyType: value, bedrooms: newBedrooms, furnished, listingType: getListingTypeFilter() });
  };

  const handleBedroomsChange = (value: string) => {
    setBedrooms(value);
    onFiltersChange?.({ priceRange, propertyType, bedrooms: value, furnished, listingType: getListingTypeFilter() });
  };

  const handleFurnishedChange = (checked: boolean) => {
    setFurnished(checked);
    onFiltersChange?.({ priceRange, propertyType, bedrooms, furnished: checked, listingType: getListingTypeFilter() });
  };

  const handleListingTypeRentChange = (checked: boolean) => {
    setListingTypeRent(checked);
    const newListingType = checked && !listingTypeSale ? "Alquiler" : (!checked && listingTypeSale ? "Venta" : "all");
    onFiltersChange?.({ priceRange, propertyType, bedrooms, furnished, listingType: newListingType });
  };

  const handleListingTypeSaleChange = (checked: boolean) => {
    setListingTypeSale(checked);
    const newListingType = listingTypeRent && !checked ? "Alquiler" : (!listingTypeRent && checked ? "Venta" : "all");
    onFiltersChange?.({ priceRange, propertyType, bedrooms, furnished, listingType: newListingType });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold">Filtros de búsqueda</h3>
      
      {/* Listing Type and Furnished Checkboxes */}
      <div className="space-y-3">
        <Label className="text-base">Tipo de operación</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="rent" 
              checked={listingTypeRent}
              onCheckedChange={handleListingTypeRentChange}
            />
            <label
              htmlFor="rent"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Alquiler
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sale" 
              checked={listingTypeSale}
              onCheckedChange={handleListingTypeSaleChange}
            />
            <label
              htmlFor="sale"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Venta
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="furnished" 
              checked={furnished}
              onCheckedChange={handleFurnishedChange}
            />
            <label
              htmlFor="furnished"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Amoblado
            </label>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default PropertyFilters;
