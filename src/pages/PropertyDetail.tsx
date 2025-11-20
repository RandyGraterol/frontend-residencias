import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Home, BedDouble, Bath, Phone, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import ProfileIcon from "@/components/ProfileIcon";
import apartment1 from "@/assets/apartment-1.jpg";
import room1 from "@/assets/room-1.jpg";
import house1 from "@/assets/house-1.jpg";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});
export interface Property {
  id: string;
  image: string;
  images: string[];
  title: string;
  description: string;
  price: string;
  priceValue: number;
  bedrooms: number;
  bathrooms: number;
  type: "Apartamento" | "Casa" | "Cuarto";
  furnished: boolean;
  phone: string;
  coordinates: [number, number];
  sharedBathroom?: boolean;
  sharedFridge?: boolean;
  address?: string;
  authorId?: string;
  authorName?: string;
  rules?: {
    visitsAllowed: boolean;
    genderRestriction?: "Mujeres" | "Hombres" | "Mixto";
    pets?: boolean;
    smoking?: boolean;
    parties?: boolean;
  };
}

// Mock properties data with extended information
export const mockProperties: Property[] = [{
  id: "1",
  image: apartment1,
  images: [apartment1, house1, room1],
  title: "Apartamento Moderno Centro",
  description: "Espacioso apartamento con excelente ubicación cerca de todos los servicios",
  price: "$250",
  priceValue: 250,
  bedrooms: 2,
  bathrooms: 2,
  type: "Apartamento",
  furnished: true,
  phone: "+58 412-1234567",
  coordinates: [9.9111, -67.3536],
  address: "Calle Principal, Centro, San Juan de los Morros",
  authorName: "María González",
  rules: {
    visitsAllowed: true,
    genderRestriction: "Mixto",
    pets: true,
    smoking: false,
    parties: false
  }
}, {
  id: "2",
  image: house1,
  images: [house1, apartment1, room1],
  title: "Casa con Jardín",
  description: "Hermosa casa familiar con amplio jardín y estacionamiento",
  price: "$400",
  priceValue: 400,
  bedrooms: 3,
  bathrooms: 2,
  type: "Casa",
  furnished: false,
  phone: "+58 424-7654321",
  coordinates: [9.9135, -67.3520],
  address: "Urbanización Los Jardines, San Juan de los Morros",
  authorName: "Carlos Rodríguez",
  rules: {
    visitsAllowed: true,
    genderRestriction: "Mixto",
    pets: true,
    smoking: false,
    parties: true
  }
}, {
  id: "3",
  image: room1,
  images: [room1, apartment1, house1],
  title: "Habitación Amueblada",
  description: "Cómoda habitación totalmente amueblada, ideal para estudiantes",
  price: "$120",
  priceValue: 120,
  bedrooms: 1,
  bathrooms: 1,
  type: "Cuarto",
  furnished: true,
  phone: "+58 414-9876543",
  coordinates: [9.9105, -67.3545],
  sharedBathroom: true,
  sharedFridge: true,
  address: "Av. Libertador, Centro, San Juan de los Morros",
  authorName: "Ana Martínez",
  rules: {
    visitsAllowed: true,
    genderRestriction: "Mujeres",
    pets: false,
    smoking: false,
    parties: false
  }
}, {
  id: "4",
  image: apartment1,
  images: [apartment1, room1, house1],
  title: "Apartamento Vista Ciudad",
  description: "Moderno apartamento en piso alto con vista panorámica",
  price: "$350",
  priceValue: 350,
  bedrooms: 2,
  bathrooms: 1,
  type: "Apartamento",
  furnished: true,
  phone: "+58 426-5551234",
  coordinates: [9.9125, -67.3530],
  address: "Torre Residencial El Mirador, San Juan de los Morros",
  authorName: "Luis Hernández",
  rules: {
    visitsAllowed: false,
    genderRestriction: "Mixto",
    pets: false,
    smoking: false,
    parties: false
  }
}, {
  id: "5",
  image: house1,
  images: [house1, room1, apartment1],
  title: "Casa Amplia Residencial",
  description: "Casa espaciosa en zona residencial tranquila",
  price: "$500",
  priceValue: 500,
  bedrooms: 4,
  bathrooms: 3,
  type: "Casa",
  furnished: false,
  phone: "+58 412-8889999",
  coordinates: [9.9150, -67.3510],
  address: "Residencias Las Acacias, San Juan de los Morros",
  authorName: "Pedro Sánchez",
  rules: {
    visitsAllowed: true,
    genderRestriction: "Mixto",
    pets: true,
    smoking: true,
    parties: true
  }
}, {
  id: "6",
  image: room1,
  images: [room1, house1, apartment1],
  title: "Habitación Económica",
  description: "Habitación sencilla en zona céntrica",
  price: "$80",
  priceValue: 80,
  bedrooms: 1,
  bathrooms: 1,
  type: "Cuarto",
  furnished: false,
  phone: "+58 414-3332222",
  coordinates: [9.9100, -67.3550],
  sharedBathroom: true,
  sharedFridge: false,
  address: "Calle Bolívar, Centro, San Juan de los Morros",
  authorName: "José López",
  rules: {
    visitsAllowed: true,
    genderRestriction: "Hombres",
    pets: false,
    smoking: true,
    parties: false
  }
}];
const PropertyDetail = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const property = mockProperties.find(p => p.id === id);
  useEffect(() => {
    if (!mapRef.current || !property) return;
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView(property.coordinates, 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker(property.coordinates).addTo(map).bindPopup(property.title);
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(property.coordinates, 15);
    }
  }, [property]);
  if (!property) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Propiedad no encontrada</h1>
          <Button onClick={() => navigate("/propiedades")}>
            Volver a propiedades
          </Button>
        </div>
      </div>;
  }

  // Calculate related properties (same area - within ~1km)
  const relatedProperties = mockProperties.filter(p => {
    if (p.id === property.id) return false;
    const distance = Math.sqrt(Math.pow(p.coordinates[0] - property.coordinates[0], 2) + Math.pow(p.coordinates[1] - property.coordinates[1], 2));
    return distance < 0.01; // Approximately 1km
  }).slice(0, 3);
  return <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start">
            <div>
              <Link to="/propiedades">
                <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a propiedades
                </Button>
              </Link>
              <h1 className="text-4xl font-bold">{property.title}</h1>
              <p className="text-primary-foreground/80 mt-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                San Juan de los Morros
              </p>
            </div>
            <ProfileIcon />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-96 rounded-lg overflow-hidden">
                      <img 
                        src={img} 
                        alt={`${property.title} - Imagen ${index + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                <p className="text-muted-foreground">{property.description}</p>
                {property.authorName && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-5 h-5" />
                      <div>
                        <p className="text-sm">Publicado por</p>
                        <Link 
                          to={`/perfil/${property.authorName}`}
                          className="font-semibold text-foreground hover:text-primary transition-colors underline"
                        >
                          {property.authorName}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Detalles de la propiedad</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-semibold">{property.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Habitaciones</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Baños</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Amueblado</p>
                      <p className="font-semibold">{property.furnished ? "Sí" : "No"}</p>
                    </div>
                  </div>
                  {property.type === "Cuarto" && <>
                      <div className="flex items-center gap-2">
                        <Bath className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Baño</p>
                          <p className="font-semibold">
                            {property.sharedBathroom ? "Compartido" : "Privado"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Home className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Nevera</p>
                          <p className="font-semibold">
                            {property.sharedFridge ? "Compartida" : "Privada"}
                          </p>
                        </div>
                      </div>
                    </>}
                </div>
              </CardContent>
            </Card>

            {/* Rules and Agreements */}
            {property.rules && <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Acuerdos y Reglas</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Visitas</span>
                      <span className="font-semibold">
                        {property.rules.visitsAllowed ? "Permitidas" : "No permitidas"}
                      </span>
                    </div>
                    {property.rules.genderRestriction && <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Restricción de género</span>
                        <span className="font-semibold">{property.rules.genderRestriction}</span>
                      </div>}
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Mascotas</span>
                      <span className="font-semibold">
                        {property.rules.pets ? "Permitidas" : "No permitidas"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Fumar</span>
                      <span className="font-semibold">
                        {property.rules.smoking ? "Permitido" : "No permitido"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">Fiestas</span>
                      <span className="font-semibold">
                        {property.rules.parties ? "Permitidas" : "No permitidas"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>}

            {/* Map */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Ubicación</h2>
                <div className="h-96 rounded-lg overflow-hidden mb-4" ref={mapRef} />
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {property.address}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6 min-h-[calc(100vh-2rem)] flex flex-col">
              {/* Ad Section */}
              <Card className="flex-1">
                <CardContent className="p-6 h-full min-h-[200px] flex items-center justify-center">
                  <p className="text-sm text-muted-foreground font-medium">Anuncio</p>
                </CardContent>
              </Card>

              {/* Schedule Visit */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Agendar una visita</h3>
                  <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Nombre
                      </label>
                      <input type="text" className="w-full px-3 py-2 rounded-md border border-border bg-background" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Teléfono
                      </label>
                      <input type="tel" className="w-full px-3 py-2 rounded-md border border-border bg-background" placeholder="+58 412-1234567" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Fecha preferida
                      </label>
                      <input type="date" className="w-full px-3 py-2 rounded-md border border-border bg-background" />
                    </div>
                    <Button type="submit" className="w-full">
                      Solicitar visita
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Price and Contact */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-4">
                    {property.price}
                    <span className="text-sm font-normal text-muted-foreground">/mes</span>
                  </div>
                  <div className="space-y-3">
                    <a href={`tel:${property.phone}`}>
                      
                    </a>
                    <a href={`https://wa.me/${property.phone.replace(/[^0-9]/g, "")}?text=Hola, estoy interesado en ${property.title}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="whatsapp" className="w-full" size="lg">
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">Contacto</p>
                    <p className="font-semibold">{property.phone}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Propiedades relacionadas en la zona</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map(relatedProp => <PropertyCard key={relatedProp.id} id={relatedProp.id} image={relatedProp.image} title={relatedProp.title} description={relatedProp.description} price={relatedProp.price} bedrooms={relatedProp.bedrooms} type={relatedProp.type} authorName={relatedProp.authorName} />)}
            </div>
          </div>}
      </div>

      <Footer />
    </div>;
};
export default PropertyDetail;