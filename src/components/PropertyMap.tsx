import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface PropertyMapProps {
  onAreaSelect?: (center: [number, number], radius: number) => void;
}

const PropertyMap = (_props: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // San Juan de los Morros coordinates
    const center: [number, number] = [9.9111, -67.3536];

    // Initialize map
    map.current = L.map(mapContainer.current).setView(center, 13);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.current);

    // Sample property locations
    const properties = [
      { position: [9.9111, -67.3536] as [number, number], title: "Centro" },
      { position: [9.915, -67.35] as [number, number], title: "Zona Norte" },
      { position: [9.908, -67.358] as [number, number], title: "Zona Sur" },
    ];

    // Add markers
    properties.forEach((prop) => {
      L.marker(prop.position)
        .addTo(map.current!)
        .bindPopup(`<b>${prop.title}</b><br/>Propiedades disponibles`);
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 flex items-center gap-2 border-b border-border">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Mapa de zonas de alquiler</span>
      </div>
      <div ref={mapContainer} className="h-[300px] w-full" />
    </div>
  );
};

export default PropertyMap;

