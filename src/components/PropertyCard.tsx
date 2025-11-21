import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, BedDouble, Eye, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  bedrooms?: number;
  type: string;
  authorName?: string;
  listingType?: string;
}

const PropertyCard = ({ id, image, title, description, price, bedrooms, type, authorName, listingType }: PropertyCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Home className="w-4 h-4" />
          <span>{type}</span>
          {bedrooms && (
            <>
              <span>•</span>
              <BedDouble className="w-4 h-4" />
              <span>{bedrooms} habitaciones</span>
            </>
          )}
          {listingType && (
            <>
              <span>•</span>
              <span className="font-medium text-primary">{listingType}</span>
            </>
          )}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          San Juan de los Morros
        </CardDescription>
        {authorName && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
            <User className="w-4 h-4" />
            <span>
              Publicado por{" "}
              <Link 
                to={`/perfil/${authorName}`}
                className="hover:text-primary transition-colors underline"
              >
                {authorName}
              </Link>
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            {price} <span className="text-sm font-normal text-muted-foreground">{listingType === "Venta" ? "" : "/mes"}</span>
          </div>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate(`/propiedades/${id}`)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
