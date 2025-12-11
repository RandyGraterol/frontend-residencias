import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Search, Eye, MoreVertical, MapPin, Bed, CheckCircle, XCircle, Clock, Plus, Pencil, Trash2, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MockDataIndicator from "../MockDataIndicator";
import { mockProperties } from "@/data/mockDashboardData";
import { toast } from "sonner";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          Activa
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="h-3 w-3 mr-1" />
          Pendiente
        </Badge>
      );
    case "inactive":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          <XCircle className="h-3 w-3 mr-1" />
          Inactiva
        </Badge>
      );
    default:
      return null;
  }
};

const PropertiesSection = () => {
  const totalProperties = mockProperties.length;
  const activeCount = mockProperties.filter((p) => p.status === "active").length;
  const pendingCount = mockProperties.filter((p) => p.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestión de Propiedades</h1>
        <p className="text-muted-foreground mt-1">
          Administra todas las propiedades de la plataforma
        </p>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Propiedades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendientes de Revisión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Listado de Propiedades</CardTitle>
              <CardDescription>
                {totalProperties} propiedades publicadas
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar propiedad..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activas</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="inactive">Inactivas</SelectItem>
                </SelectContent>
              </Select>
              {/* Admin: Botón de crear propiedad */}
              <Button onClick={() => toast.info("Crear nueva propiedad")}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Propiedad
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mockProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Building className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No hay propiedades</h3>
              <p className="text-muted-foreground text-center">
                Las propiedades publicadas aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg border gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Building className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{property.title}</h4>
                        {getStatusBadge(property.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bed className="h-3 w-3" />
                          {property.bedrooms} hab.
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {property.views} vistas
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Propietario: Usuario #{property.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-20 lg:ml-0">
                    <span className="text-lg font-bold text-primary">
                      {property.price}/mes
                    </span>
                    {/* Admin: CRUD completo de propiedades */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info(`Ver detalles de ${property.title}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info(`Editar ${property.title}`)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info(`Destacar ${property.title}`)}>
                          <Star className="h-4 w-4 mr-2" />
                          Destacar
                        </DropdownMenuItem>
                        {property.status === "pending" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-green-600"
                              onClick={() => toast.success(`${property.title} aprobada`)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprobar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-orange-600"
                              onClick={() => toast.warning(`${property.title} rechazada`)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Rechazar
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => toast.error(`${property.title} eliminada`)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertiesSection;
