import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const PropertyMap = (props: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);
  const circle = useRef<L.Circle | null>(null);
  const [searchRadius, setSearchRadius] = useState(2);
  const [searchCenter, setSearchCenter] = useState<[number, number]>([9.9111, -67.3536]);

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

    // Add draggable marker
    marker.current = L.marker(center, { draggable: true })
      .addTo(map.current)
      .bindPopup("<b>Punto de búsqueda</b><br/>Arrastra para cambiar ubicación");

    // Add circle
    circle.current = L.circle(center, {
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.1,
      radius: searchRadius * 1000, // Convert km to meters
    }).addTo(map.current);

    // Handle marker drag
    marker.current.on('dragend', () => {
      if (marker.current) {
        const position = marker.current.getLatLng();
        const newCenter: [number, number] = [position.lat, position.lng];
        setSearchCenter(newCenter);
        
        // Update circle position
        if (circle.current) {
          circle.current.setLatLng(newCenter);
        }

        // Notify parent component
        if (props.onAreaSelect) {
          props.onAreaSelect(newCenter, searchRadius);
        }
      }
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update circle radius when searchRadius changes
  useEffect(() => {
    if (circle.current) {
      circle.current.setRadius(searchRadius * 1000);
      
      // Notify parent component
      if (props.onAreaSelect) {
        props.onAreaSelect(searchCenter, searchRadius);
      }
    }
  }, [searchRadius, searchCenter, props]);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Búsqueda por ubicación</span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="search-radius" className="text-sm">
            Radio de búsqueda: {searchRadius} km
          </Label>
          <Input
            id="search-radius"
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Arrastra el marcador para cambiar la ubicación de búsqueda
          </p>
        </div>
      </div>
      <div ref={mapContainer} className="h-[300px] w-full" />
    </div>
  );
};

export default PropertyMap;

