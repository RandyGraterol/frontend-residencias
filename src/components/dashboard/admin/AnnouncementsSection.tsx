import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Megaphone, 
  Search, 
  Plus, 
  Eye, 
  Pencil, 
  Trash2, 
  MoreVertical,
  Calendar,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MockDataIndicator from "../MockDataIndicator";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  content: string;
  targetAudience: "all" | "clients" | "operators" | "owners";
  status: "active" | "draft" | "expired";
  createdAt: string;
  expiresAt?: string;
}

const AnnouncementsSection = () => {
  const announcements: Announcement[] = [
    { 
      id: "1", 
      title: "Mantenimiento programado", 
      content: "El sistema estará en mantenimiento el próximo sábado de 2:00 AM a 6:00 AM...",
      targetAudience: "all",
      status: "active",
      createdAt: "2024-12-08",
      expiresAt: "2024-12-15"
    },
    { 
      id: "2", 
      title: "Nuevas funcionalidades disponibles", 
      content: "Hemos agregado nuevas opciones de filtrado en la búsqueda de propiedades...",
      targetAudience: "clients",
      status: "active",
      createdAt: "2024-12-05"
    },
    { 
      id: "3", 
      title: "Actualización de políticas", 
      content: "Se han actualizado los términos y condiciones de la plataforma...",
      targetAudience: "all",
      status: "draft",
      createdAt: "2024-12-09"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>;
      case "draft":
        return <Badge variant="secondary">Borrador</Badge>;
      case "expired":
        return <Badge variant="outline" className="text-muted-foreground">Expirado</Badge>;
      default:
        return null;
    }
  };

  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case "all":
        return <Badge variant="outline">Todos</Badge>;
      case "clients":
        return <Badge variant="outline" className="border-blue-300 text-blue-700">Clientes</Badge>;
      case "operators":
        return <Badge variant="outline" className="border-orange-300 text-orange-700">Operadores</Badge>;
      case "owners":
        return <Badge variant="outline" className="border-purple-300 text-purple-700">Propietarios</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Anuncios del Sistema</h1>
        <p className="text-muted-foreground mt-1">
          Crea y gestiona anuncios para los usuarios de la plataforma
        </p>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-50">
              <Megaphone className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{announcements.filter(a => a.status === "active").length}</p>
              <p className="text-sm text-muted-foreground">Anuncios Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gray-50">
              <Pencil className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{announcements.filter(a => a.status === "draft").length}</p>
              <p className="text-sm text-muted-foreground">Borradores</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{announcements.length}</p>
              <p className="text-sm text-muted-foreground">Total Anuncios</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Listado de Anuncios</CardTitle>
              <CardDescription>
                Gestiona los anuncios del sistema
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar anuncio..." className="pl-9" />
              </div>
              {/* Admin: Botón de crear anuncio */}
              <Button onClick={() => toast.info("Crear nuevo anuncio")}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Anuncio
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 rounded-lg border hover:shadow-sm transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{announcement.title}</h4>
                      {getStatusBadge(announcement.status)}
                      {getAudienceBadge(announcement.targetAudience)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {announcement.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Creado: {announcement.createdAt}
                      </span>
                      {announcement.expiresAt && (
                        <span className="flex items-center gap-1">
                          Expira: {announcement.expiresAt}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Admin: CRUD completo de anuncios */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info(`Ver ${announcement.title}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalle
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info(`Editar ${announcement.title}`)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      {announcement.status === "draft" && (
                        <DropdownMenuItem 
                          className="text-green-600"
                          onClick={() => toast.success(`${announcement.title} publicado`)}
                        >
                          <Megaphone className="h-4 w-4 mr-2" />
                          Publicar
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => toast.error(`${announcement.title} eliminado`)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsSection;
