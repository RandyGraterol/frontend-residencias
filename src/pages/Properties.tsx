import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyMap from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileIcon from "@/components/ProfileIcon";
import Footer from "@/components/Footer";
import apartment1 from "@/assets/apartment-1.jpg";
import room1 from "@/assets/room-1.jpg";
import house1 from "@/assets/house-1.jpg";

const Properties = () => {
  const [filters, setFilters] = useState<any>(null);

  const allProperties = [
    {
      id: "1",
      image: apartment1,
      title: "Apartamento Moderno Centro",
      description: "Espacioso apartamento con excelente ubicación cerca de todos los servicios",
      price: "$250",
      bedrooms: 2,
      type: "Apartamento",
      furnished: true,
      priceValue: 250,
      listingType: "Alquiler",
    },
    {
      id: "2",
      image: house1,
      title: "Casa con Jardín",
      description: "Hermosa casa familiar con amplio jardín y estacionamiento",
      price: "$400",
      bedrooms: 3,
      type: "Casa",
      furnished: false,
      priceValue: 400,
      listingType: "Alquiler",
    },
    {
      id: "3",
      image: room1,
      title: "Habitación Amueblada",
      description: "Cómoda habitación totalmente amueblada, ideal para estudiantes",
      price: "$120",
      bedrooms: 1,
      type: "Cuarto",
      furnished: true,
      priceValue: 120,
      listingType: "Alquiler",
    },
    {
      id: "4",
      image: apartment1,
      title: "Apartamento Vista Ciudad",
      description: "Moderno apartamento en piso alto con vista panorámica",
      price: "$350",
      bedrooms: 2,
      type: "Apartamento",
      furnished: true,
      priceValue: 350,
      listingType: "Venta",
    },
    {
      id: "5",
      image: house1,
      title: "Casa Amplia Residencial",
      description: "Casa espaciosa en zona residencial tranquila",
      price: "$500",
      bedrooms: 4,
      type: "Casa",
      furnished: false,
      priceValue: 500,
      listingType: "Venta",
    },
    {
      id: "6",
      image: room1,
      title: "Habitación Económica",
      description: "Habitación sencilla en zona céntrica",
      price: "$80",
      bedrooms: 1,
      type: "Cuarto",
      furnished: false,
      priceValue: 80,
      listingType: "Alquiler",
    },
  ];

  const filteredProperties = allProperties.filter((property) => {
    if (!filters) return true;

    const { priceRange, propertyType, bedrooms, furnished, listingType } = filters;

    // Price filter
    if (priceRange && (property.priceValue < priceRange[0] || property.priceValue > priceRange[1])) {
      return false;
    }

    // Property type filter
    if (propertyType && propertyType !== "all" && property.type !== propertyType) {
      return false;
    }

    // Bedrooms filter (skip if Cuarto is selected)
    if (propertyType !== "Cuarto" && bedrooms && bedrooms !== "all") {
      const bedroomsNum = parseInt(bedrooms);
      if (bedrooms === "4" && property.bedrooms! < 4) return false;
      if (bedrooms !== "4" && property.bedrooms !== bedroomsNum) return false;
    }

    // Furnished filter
    if (furnished && !property.furnished) {
      return false;
    }

    // Listing type filter
    if (listingType && listingType !== "all" && property.listingType !== listingType) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start">
            <div>
              <Link to="/">
                <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inicio
                </Button>
              </Link>
              <h1 className="text-4xl font-bold">Buscar propiedades</h1>
            </div>
            <ProfileIcon />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filters Sidebar - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <PropertyFilters onFiltersChange={setFilters} />
              <PropertyMap />
              
              {/* Ad Section */}
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground font-medium">Anuncio</p>
              </div>
            </div>
          </div>

          {/* Properties Grid - Scrollable content */}
          <div className="lg:col-span-2 pb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredProperties.slice(0, 50).length} propiedades disponibles
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.slice(0, 50).map((property, index) => (
                <div key={property.id}>
                  <PropertyCard 
                    id={property.id}
                    image={property.image}
                    title={property.title}
                    description={property.description}
                    price={property.price}
                    bedrooms={property.bedrooms}
                    type={property.type}
                    listingType={property.listingType}
                  />
                  {/* Ad section every 15 properties */}
                  {(index + 1) % 15 === 0 && index !== filteredProperties.length - 1 && (
                    <div className="md:col-span-2 xl:col-span-3 bg-card border border-border rounded-lg p-8 text-center mt-6">
                      <p className="text-sm text-muted-foreground font-medium">Espacio publicitario</p>
                      <p className="text-xs text-muted-foreground/60 mt-2">Anuncio</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No se encontraron propiedades con los filtros seleccionados
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;
