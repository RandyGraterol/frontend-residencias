import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Search, MapPin, Bed, Bath, Square, Heart, SlidersHorizontal, Grid3X3, List, Star, Building, Home, DoorOpen, Phone, MessageCircle, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  furnished: boolean;
  listingType: string;
  location: string;
  address: string;
  coordinates: { lat: number; lng: number };
  features: string[];
  images: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  authorName: string;
  createdAt: string;
}

const mockProperties: Property[] = [
  { id: "1", title: "Apartamento Moderno Centro", description: "Espacioso apartamento con excelente ubicación cerca de la universidad. Cuenta con acabados de lujo, cocina integral y aire acondicionado.", price: 250, bedrooms: 2, bathrooms: 1, area: 65, type: "Apartamento", furnished: true, listingType: "Alquiler", location: "Centro, San Juan de los Morros", address: "Av. Bolívar, Edificio Plaza Central, Piso 5", coordinates: { lat: 9.9108, lng: -67.3567 }, features: ["Aire acondicionado", "Cocina integral", "WiFi incluido", "Seguridad 24h", "Estacionamiento"], images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800", "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], rating: 4.8, reviews: 12, isNew: true, authorName: "María González", createdAt: "2024-12-01" },
  { id: "2", title: "Casa con Jardín Amplio", description: "Hermosa casa familiar con amplio jardín y estacionamiento privado. Ideal para familias que buscan tranquilidad.", price: 400, bedrooms: 3, bathrooms: 2, area: 120, type: "Casa", furnished: false, listingType: "Alquiler", location: "Urb. Las Palmas", address: "Calle 5, Casa #42, Urb. Las Palmas", coordinates: { lat: 9.915, lng: -67.362 }, features: ["Jardín", "Área BBQ", "Estacionamiento doble", "Tanque de agua", "Cerca eléctrica"], images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800"], rating: 4.5, reviews: 8, isNew: false, authorName: "Carlos Rodríguez", createdAt: "2024-12-03" },
  { id: "3", title: "Habitación Amueblada Estudiantes", description: "Cómoda habitación totalmente amueblada con baño privado, ideal para estudiantes universitarios.", price: 120, bedrooms: 1, bathrooms: 1, area: 20, type: "Cuarto", furnished: true, listingType: "Alquiler", location: "Cerca de UNERG", address: "Av. Universidad, Residencia Estudiantil", coordinates: { lat: 9.908, lng: -67.354 }, features: ["Amueblado", "Baño privado", "Internet incluido", "Servicios incluidos", "Cerca de universidad"], images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800", "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800", "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800", "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800", "https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=800"], rating: 4.9, reviews: 24, isNew: true, authorName: "Ana Martínez", createdAt: "2024-12-05" },
  { id: "4", title: "Apartamento Vista Ciudad", description: "Moderno apartamento en piso alto con vista panorámica de la ciudad. Acabados de primera calidad.", price: 350, bedrooms: 2, bathrooms: 2, area: 80, type: "Apartamento", furnished: true, listingType: "Alquiler", location: "Torre Residencial Elite", address: "Av. Principal, Torre Elite, Piso 12", coordinates: { lat: 9.912, lng: -67.358 }, features: ["Vista panorámica", "Gimnasio", "Piscina", "Seguridad 24h", "Ascensor"], images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"], rating: 4.7, reviews: 15, isNew: false, authorName: "Roberto Méndez", createdAt: "2024-11-25" },
  { id: "5", title: "Casa Residencial Tranquila", description: "Casa espaciosa en zona residencial tranquila con seguridad 24h. Perfecta para familias.", price: 500, bedrooms: 4, bathrooms: 3, area: 180, type: "Casa", furnished: false, listingType: "Alquiler", location: "Country Club", address: "Urb. Country Club, Calle Los Pinos #8", coordinates: { lat: 9.92, lng: -67.365 }, features: ["Piscina", "Jardín tropical", "Área social", "Cocina de diseño", "Cuarto de servicio"], images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800"], rating: 4.6, reviews: 6, isNew: false, authorName: "Diana Torres", createdAt: "2024-12-04" },
  { id: "6", title: "Habitación Económica Centro", description: "Habitación sencilla en zona céntrica con acceso a transporte público.", price: 80, bedrooms: 1, bathrooms: 1, area: 15, type: "Cuarto", furnished: false, listingType: "Alquiler", location: "Centro", address: "Calle Comercio, Casa #45", coordinates: { lat: 9.91, lng: -67.356 }, features: ["Céntrico", "Cerca de transporte", "Servicios básicos", "Zona comercial"], images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800", "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800", "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800", "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800", "https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=800"], rating: 4.2, reviews: 18, isNew: false, authorName: "Elena Rojas", createdAt: "2024-12-09" },
  { id: "7", title: "Residencia Estudiantil Premium", description: "Residencia estudiantil de alta calidad con habitaciones privadas, áreas de estudio, gimnasio y seguridad 24h.", price: 180, bedrooms: 1, bathrooms: 1, area: 25, type: "Residencia", furnished: true, listingType: "Alquiler", location: "Cerca de UNERG", address: "Av. Universidad, Residencia Premium", coordinates: { lat: 9.9082, lng: -67.3542 }, features: ["Habitación privada", "Área de estudio", "Gimnasio", "Lavandería", "Seguridad 24h", "WiFi incluido"], images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800", "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800", "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800", "https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=800"], rating: 4.9, reviews: 32, isNew: true, authorName: "Residencias Premium SJM", createdAt: "2024-12-08" },
  { id: "8", title: "Apartamento Familiar Remodelado", description: "Amplio apartamento recién remodelado con 3 habitaciones, cocina moderna y balcón.", price: 280, bedrooms: 3, bathrooms: 2, area: 95, type: "Apartamento", furnished: false, listingType: "Alquiler", location: "Urb. El Parque", address: "Res. Monte Verde, Torre A, Piso 8", coordinates: { lat: 9.913, lng: -67.359 }, features: ["Remodelado", "Balcón", "Vista montaña", "Vigilancia", "Estacionamiento"], images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800", "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"], rating: 4.5, reviews: 11, isNew: false, authorName: "Carmen Díaz", createdAt: "2024-12-07" },
  { id: "9", title: "Residencia Familiar Compartida", description: "Residencia familiar con habitaciones disponibles para estudiantes. Ambiente hogareño.", price: 130, bedrooms: 1, bathrooms: 1, area: 20, type: "Residencia", furnished: true, listingType: "Alquiler", location: "Centro", address: "Calle Principal, Residencia Familiar", coordinates: { lat: 9.9095, lng: -67.3558 }, features: ["Ambiente familiar", "Cocina compartida", "Servicios incluidos", "Zona céntrica"], images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800", "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"], rating: 4.4, reviews: 19, isNew: false, authorName: "Familia González", createdAt: "2024-12-05" },
  { id: "10", title: "Mini Apartamento Céntrico", description: "Acogedor mini apartamento tipo estudio, perfecto para profesionales solteros.", price: 200, bedrooms: 1, bathrooms: 1, area: 45, type: "Apartamento", furnished: true, listingType: "Alquiler", location: "Centro", address: "Calle Comercio, Edificio Central, Apto 3B", coordinates: { lat: 9.91, lng: -67.356 }, features: ["Equipado", "Céntrico", "Seguridad", "Cerca de transporte", "Internet"], images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800", "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"], rating: 4.3, reviews: 14, isNew: true, authorName: "Sofía Ramírez", createdAt: "2024-12-06" },
  { id: "11", title: "Casa de Campo Vista al Valle", description: "Hermosa casa de campo con espectacular vista al valle, amplios espacios y chimenea.", price: 420, bedrooms: 3, bathrooms: 2, area: 180, type: "Casa", furnished: false, listingType: "Alquiler", location: "Sector El Castrero", address: "Vía El Castrero, Km 5", coordinates: { lat: 9.925, lng: -67.37 }, features: ["Vista al valle", "Chimenea", "Jardines", "Terraza", "Clima fresco"], images: ["https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"], rating: 4.7, reviews: 9, isNew: false, authorName: "Manuel Pérez", createdAt: "2024-12-01" },
  { id: "12", title: "Residencia Ejecutiva", description: "Residencia de lujo para profesionales y ejecutivos. Habitaciones amplias con baño privado.", price: 280, bedrooms: 1, bathrooms: 1, area: 35, type: "Residencia", furnished: true, listingType: "Alquiler", location: "Zona Empresarial", address: "Av. Bolívar, Residencia Ejecutiva", coordinates: { lat: 9.9112, lng: -67.3572 }, features: ["Habitación amplia", "Baño privado", "Sala de reuniones", "Estacionamiento", "Servicio de limpieza"], images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800", "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], rating: 4.8, reviews: 21, isNew: true, authorName: "Residencias Ejecutivas C.A.", createdAt: "2024-12-01" },
  { id: "13", title: "Townhouse Moderno 3 Niveles", description: "Elegante townhouse de 3 niveles con diseño contemporáneo y terraza.", price: 480, bedrooms: 3, bathrooms: 3, area: 160, type: "Casa", furnished: false, listingType: "Alquiler", location: "Urb. Los Samanes", address: "Conjunto Res. Los Samanes, Casa 15", coordinates: { lat: 9.917, lng: -67.361 }, features: ["3 niveles", "Terraza", "Cocina empotrada", "Closets empotrados", "Estacionamiento techado"], images: ["https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"], rating: 4.6, reviews: 7, isNew: false, authorName: "Patricia Morales", createdAt: "2024-12-08" },
  { id: "14", title: "Cuarto Independiente con Entrada Propia", description: "Habitación independiente con entrada propia, baño privado y cocineta.", price: 150, bedrooms: 1, bathrooms: 1, area: 35, type: "Cuarto", furnished: true, listingType: "Alquiler", location: "Sector La Morera", address: "Calle Principal, Sector La Morera", coordinates: { lat: 9.907, lng: -67.353 }, features: ["Entrada independiente", "Baño privado", "Cocineta", "Servicios incluidos", "Zona tranquila"], images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800", "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800", "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800", "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800", "https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=800"], rating: 4.4, reviews: 16, isNew: false, authorName: "Elena Rojas", createdAt: "2024-12-09" },
  { id: "15", title: "Apartamento Económico Zona Norte", description: "Apartamento funcional y económico en zona norte, cerca de centros comerciales.", price: 220, bedrooms: 2, bathrooms: 1, area: 65, type: "Apartamento", furnished: false, listingType: "Alquiler", location: "Zona Norte", address: "Res. Los Próceres, Edificio 3, Apto 4B", coordinates: { lat: 9.916, lng: -67.355 }, features: ["Económico", "Cerca de transporte", "Zona comercial", "Vigilancia", "Estacionamiento"], images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800", "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"], rating: 4.1, reviews: 22, isNew: false, authorName: "Luis Martínez", createdAt: "2024-12-07" },
  { id: "16", title: "Habitación en Residencia Universitaria", description: "Habitación en residencia estudiantil con áreas comunes, lavandería y wifi.", price: 100, bedrooms: 1, bathrooms: 1, area: 18, type: "Cuarto", furnished: true, listingType: "Alquiler", location: "Frente a UNERG", address: "Av. Universidad, Residencia Los Estudiantes", coordinates: { lat: 9.9075, lng: -67.3535 }, features: ["Cerca universidad", "Wifi incluido", "Lavandería", "Cocina compartida", "Seguridad"], images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800", "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800", "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800", "https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=800"], rating: 4.6, reviews: 28, isNew: true, authorName: "Residencias Universitarias", createdAt: "2024-12-10" },
];


const PropertyDetailModal = ({ property, isOpen, onClose }: { property: Property | null; isOpen: boolean; onClose: () => void }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !property || !isOpen) return;
    if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }
    const timer = setTimeout(() => {
      if (!mapRef.current) return;
      const map = L.map(mapRef.current).setView([property.coordinates.lat, property.coordinates.lng], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: '&copy; OpenStreetMap' }).addTo(map);
      L.marker([property.coordinates.lat, property.coordinates.lng]).addTo(map).bindPopup(`<b>${property.title}</b><br>${property.address}`).openPopup();
      mapInstanceRef.current = map;
    }, 100);
    return () => { clearTimeout(timer); if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; } };
  }, [property, isOpen]);

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background border-b p-4">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl">{property.title}</DialogTitle>
                <p className="text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-4 w-4" />{property.location}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
            </div>
          </DialogHeader>
        </div>
        <div className="p-6 space-y-6">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                    <img src={img} alt={`${property.title} - ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><span className="text-3xl font-bold text-primary">${property.price}</span><span className="text-muted-foreground">/mes</span></div>
            <div className="flex gap-2">
              <Badge>{property.listingType}</Badge>
              <Badge variant="outline">{property.type}</Badge>
              {property.furnished && <Badge variant="secondary">Amueblado</Badge>}
              {property.isNew && <Badge className="bg-green-500">Nuevo</Badge>}
            </div>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-lg"><Bed className="h-5 w-5 text-primary" /></div><div><p className="text-sm text-muted-foreground">Habitaciones</p><p className="font-semibold">{property.bedrooms}</p></div></div>
                <div className="flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-lg"><Bath className="h-5 w-5 text-primary" /></div><div><p className="text-sm text-muted-foreground">Baños</p><p className="font-semibold">{property.bathrooms}</p></div></div>
                <div className="flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-lg"><Square className="h-5 w-5 text-primary" /></div><div><p className="text-sm text-muted-foreground">Área</p><p className="font-semibold">{property.area} m²</p></div></div>
                <div className="flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-lg"><Star className="h-5 w-5 text-primary" /></div><div><p className="text-sm text-muted-foreground">Valoración</p><p className="font-semibold">{property.rating} ({property.reviews})</p></div></div>
              </div>
            </CardContent>
          </Card>
          <div><h3 className="text-lg font-semibold mb-2">Descripción</h3><p className="text-muted-foreground">{property.description}</p></div>
          <div><h3 className="text-lg font-semibold mb-3">Características</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-2">{property.features.map((feature, index) => (<div key={index} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm">{feature}</span></div>))}</div></div>
          <div><h3 className="text-lg font-semibold mb-3">Ubicación</h3><div ref={mapRef} className="h-[250px] rounded-xl overflow-hidden border" /><p className="text-sm text-muted-foreground mt-2 flex items-center gap-1"><MapPin className="h-4 w-4" />{property.address}</p></div>
          <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">{property.authorName.charAt(0)}</div><div><p className="font-semibold">{property.authorName}</p><p className="text-sm text-muted-foreground">Publicado el {new Date(property.createdAt).toLocaleDateString("es-VE")}</p></div></div></CardContent></Card>
          <div className="flex gap-3"><Button className="flex-1" size="lg"><Phone className="h-4 w-4 mr-2" />Llamar</Button><Button variant="outline" className="flex-1 bg-green-500 hover:bg-green-600 text-white border-green-500" size="lg"><MessageCircle className="h-4 w-4 mr-2" />WhatsApp</Button></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


const DiscoverSection = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [propertyType, setPropertyType] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const [furnished, setFurnished] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["2", "5"]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFavorite = (id: string) => setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  const openPropertyDetail = (property: Property) => { setSelectedProperty(property); setIsModalOpen(true); };
  const closePropertyDetail = () => { setIsModalOpen(false); setSelectedProperty(null); };

  const filteredProperties = mockProperties.filter((property) => {
    if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) && !property.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (property.price < priceRange[0] || property.price > priceRange[1]) return false;
    if (propertyType !== "all" && property.type !== propertyType) return false;
    if (propertyType !== "Cuarto" && bedrooms !== "all") {
      const bedroomsNum = parseInt(bedrooms);
      if (bedrooms === "4" && property.bedrooms < 4) return false;
      if (bedrooms !== "4" && property.bedrooms !== bedroomsNum) return false;
    }
    if (furnished && !property.furnished) return false;
    return true;
  });

  const getPropertyIcon = (type: string) => {
    switch (type) { case "Residencia": return Building; case "Casa": return Home; case "Apartamento": return Building; case "Cuarto": return DoorOpen; default: return Building; }
  };

  return (
    <div className="space-y-6">
      <PropertyDetailModal property={selectedProperty} isOpen={isModalOpen} onClose={closePropertyDetail} />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div><h1 className="text-3xl font-bold">Descubrir Residencias</h1><p className="text-muted-foreground mt-1">Encuentra tu próximo hogar ideal cerca de tu universidad</p></div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal className="h-4 w-4 mr-2" />Filtros</Button>
          <div className="flex border rounded-lg">
            <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="rounded-r-none"><Grid3X3 className="h-4 w-4" /></Button>
            <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="rounded-l-none"><List className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Buscar por nombre o ubicación..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12" /></div>
      <div className="flex flex-col lg:flex-row gap-6">
        {showFilters && (
          <Card className="lg:w-80 shrink-0">
            <CardHeader className="pb-4"><CardTitle className="text-lg">Filtros de búsqueda</CardTitle><CardDescription>Refina tu búsqueda</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3"><Label className="text-sm font-medium">Rango de precio ($/mes)</Label><Slider value={priceRange} onValueChange={setPriceRange} max={600} step={10} className="w-full" /><div className="flex justify-between text-sm text-muted-foreground"><span>${priceRange[0]}</span><span>${priceRange[1]}</span></div></div>
              <div className="space-y-3"><Label className="text-sm font-medium">Tipo de propiedad</Label><Select value={propertyType} onValueChange={setPropertyType}><SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="Residencia">Residencia</SelectItem><SelectItem value="Apartamento">Apartamento</SelectItem><SelectItem value="Casa">Casa</SelectItem><SelectItem value="Cuarto">Cuarto</SelectItem></SelectContent></Select></div>
              {propertyType !== "Cuarto" && (<div className="space-y-3"><Label className="text-sm font-medium">Habitaciones</Label><Select value={bedrooms} onValueChange={setBedrooms}><SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger><SelectContent><SelectItem value="all">Todas</SelectItem><SelectItem value="1">1 habitación</SelectItem><SelectItem value="2">2 habitaciones</SelectItem><SelectItem value="3">3 habitaciones</SelectItem><SelectItem value="4">4+ habitaciones</SelectItem></SelectContent></Select></div>)}
              <div className="flex items-center space-x-2"><Checkbox id="furnished" checked={furnished} onCheckedChange={(checked) => setFurnished(checked as boolean)} /><label htmlFor="furnished" className="text-sm font-medium">Solo amueblados</label></div>
              <div className="space-y-3"><Label className="text-sm font-medium">Filtros rápidos</Label><div className="flex flex-wrap gap-2"><Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Cerca de UNERG</Badge><Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Con WiFi</Badge><Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Servicios incluidos</Badge></div></div>
            </CardContent>
          </Card>
        )}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between"><p className="text-sm text-muted-foreground">{filteredProperties.length} propiedades encontradas</p><Select defaultValue="relevance"><SelectTrigger className="w-40"><SelectValue placeholder="Ordenar por" /></SelectTrigger><SelectContent><SelectItem value="relevance">Relevancia</SelectItem><SelectItem value="price-asc">Precio: menor a mayor</SelectItem><SelectItem value="price-desc">Precio: mayor a menor</SelectItem><SelectItem value="rating">Mejor valorados</SelectItem></SelectContent></Select></div>
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProperties.map((property) => {
                const TypeIcon = getPropertyIcon(property.type);
                return (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover" />
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white" onClick={(e) => { e.stopPropagation(); toggleFavorite(property.id); }}><Heart className={cn("h-5 w-5", favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-gray-600")} /></Button>
                      {property.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Nuevo</Badge>}
                      <Badge variant="secondary" className="absolute bottom-2 left-2"><TypeIcon className="h-3 w-3 mr-1" />{property.type}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2"><h3 className="font-semibold line-clamp-1">{property.title}</h3><div className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span>{property.rating}</span></div></div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2"><MapPin className="h-3 w-3" />{property.location}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{property.description}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3"><span className="flex items-center gap-1"><Bed className="h-4 w-4" />{property.bedrooms}</span><span className="flex items-center gap-1"><Bath className="h-4 w-4" />{property.bathrooms}</span><span className="flex items-center gap-1"><Square className="h-4 w-4" />{property.area}m²</span></div>
                      <div className="flex items-center justify-between"><div><span className="text-xl font-bold text-primary">${property.price}</span><span className="text-sm text-muted-foreground">/mes</span></div><Button size="sm" onClick={() => openPropertyDetail(property)}>Ver más</Button></div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProperties.map((property) => {
                const TypeIcon = getPropertyIcon(property.type);
                return (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-64 shrink-0"><img src={property.images[0]} alt={property.title} className="w-full h-48 sm:h-full object-cover" />{property.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Nuevo</Badge>}</div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2"><div><h3 className="font-semibold text-lg">{property.title}</h3><p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{property.location}</p></div><div className="flex items-center gap-2"><div className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span>{property.rating}</span><span className="text-muted-foreground">({property.reviews})</span></div><Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); toggleFavorite(property.id); }}><Heart className={cn("h-5 w-5", favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-gray-600")} /></Button></div></div>
                        <p className="text-sm text-muted-foreground mb-3">{property.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3"><Badge variant="secondary"><TypeIcon className="h-3 w-3 mr-1" />{property.type}</Badge><span className="flex items-center gap-1"><Bed className="h-4 w-4" />{property.bedrooms} hab.</span><span className="flex items-center gap-1"><Bath className="h-4 w-4" />{property.bathrooms} baños</span><span className="flex items-center gap-1"><Square className="h-4 w-4" />{property.area}m²</span>{property.furnished && <Badge variant="outline">Amueblado</Badge>}</div>
                        <div className="flex items-center justify-between"><div><span className="text-2xl font-bold text-primary">${property.price}</span><span className="text-sm text-muted-foreground">/mes</span></div><Button onClick={() => openPropertyDetail(property)}>Ver más</Button></div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
          {filteredProperties.length === 0 && (<div className="text-center py-12"><Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" /><h3 className="text-lg font-semibold mb-2">No se encontraron propiedades</h3><p className="text-muted-foreground">Intenta ajustar los filtros para ver más resultados</p></div>)}
        </div>
      </div>
    </div>
  );
};

export default DiscoverSection;
