import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Eye, 
  Search, 
  Building, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MapPin,
  DollarSign,
  Calendar,
  MessageSquare
} from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface PendingProperty {
  id: string;
  title: string;
  owner: string;
  location: string;
  price: string;
  submittedDate: string;
  type: string;
  description: string;
}

const ContentReviewSection = () => {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PendingProperty | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const pendingProperties: PendingProperty[] = [
    { 
      id: "1", 
      title: "Apartamento Moderno Centro", 
      owner: "María González", 
      location: "Centro, Caracas",
      price: "$450/mes",
      submittedDate: "2024-12-09",
      type: "Apartamento",
      description: "Hermoso apartamento de 2 habitaciones con vista a la ciudad..."
    },
    { 
      id: "2", 
      title: "Casa con Jardín Las Palmas", 
      owner: "Pedro López", 
      location: "Las Palmas, Valencia",
      price: "$650/mes",
      submittedDate: "2024-12-08",
      type: "Casa",
      description: "Amplia casa familiar con jardín y estacionamiento..."
    },
    { 
      id: "3", 
      title: "Habitación Estudiante UCV", 
      owner: "Ana Martínez", 
      location: "Los Chaguaramos, Caracas",
      price: "$200/mes",
      submittedDate: "2024-12-08",
      type: "Habitación",
      description: "Habitación amoblada cerca de la universidad..."
    },
  ];

  const handleApprove = (property: PendingProperty) => {
    toast.success(`Propiedad "${property.title}" aprobada`);
  };

  const handleReject = () => {
    if (selectedProperty && rejectReason.trim()) {
      toast.error(`Propiedad "${selectedProperty.title}" rechazada`);
      setRejectDialogOpen(false);
      setRejectReason("");
      setSelectedProperty(null);
    }
  };

  const openRejectDialog = (property: PendingProperty) => {
    setSelectedProperty(property);
    setRejectDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Revisión de Contenido</h1>
        <p className="text-muted-foreground mt-1">
          Revisa y aprueba las publicaciones de propiedades pendientes
        </p>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-yellow-50">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingProperties.length}</p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-muted-foreground">Aprobadas esta semana</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-50">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-muted-foreground">Rechazadas esta semana</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Propiedades Pendientes de Aprobación
              </CardTitle>
              <CardDescription>
                Revisa el contenido antes de publicarlo en la plataforma
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar propiedad..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingProperties.map((property) => (
              <div
                key={property.id}
                className="p-4 rounded-lg border hover:shadow-sm transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Property Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg">{property.title}</h4>
                      <Badge variant="outline">{property.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {property.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {property.price}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {property.submittedDate}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Publicado por: <span className="font-medium">{property.owner}</span>
                    </p>
                  </div>

                  {/* Actions - Operador: Ver, Aprobar, Rechazar (NO eliminar) */}
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver detalle
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => openRejectDialog(property)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Rechazar
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(property)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Aprobar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar Publicación</DialogTitle>
            <DialogDescription>
              Indica el motivo del rechazo para que el propietario pueda corregirlo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Propiedad:</p>
              <p className="text-sm text-muted-foreground">{selectedProperty?.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Motivo del rechazo *</label>
              <Textarea
                placeholder="Describe el motivo del rechazo..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={!rejectReason.trim()}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Confirmar Rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentReviewSection;
