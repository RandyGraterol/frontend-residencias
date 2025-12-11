import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bed, HeartOff, ExternalLink, Send } from "lucide-react";
import { Link } from "react-router-dom";
import MockDataIndicator from "../MockDataIndicator";
import { mockFavorites } from "@/data/mockDashboardData";
import { toast } from "sonner";

const FavoritesSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mis Favoritos</h1>
        <p className="text-muted-foreground mt-1">
          Propiedades que has guardado para revisar después
        </p>
      </div>

      <MockDataIndicator />

      {mockFavorites.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No tienes favoritos</h3>
            <p className="text-muted-foreground text-center mb-4">
              Explora propiedades y guarda las que te interesen
            </p>
            <Link to="/propiedades">
              <Button>Explorar Propiedades</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockFavorites.map((favorite) => (
            <Card key={favorite.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Imagen</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{favorite.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {favorite.location}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {favorite.bedrooms} hab.
                    </span>
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">
                      {favorite.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {favorite.price}/mes
                  </span>
                  <div className="flex gap-2">
                    {/* Cliente: Solo puede quitar de favoritos, ver detalle y enviar solicitud */}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => toast.info("Quitado de favoritos")}
                      title="Quitar de favoritos"
                    >
                      <HeartOff className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toast.info("Solicitud enviada")}
                      title="Enviar solicitud"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                    <Link to={`/propiedades/${favorite.propertyId}`}>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </Link>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Agregado el {new Date(favorite.addedAt).toLocaleDateString("es-VE")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;
