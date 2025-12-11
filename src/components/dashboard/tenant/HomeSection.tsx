import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Heart, FileText, ArrowRight, MessageSquare, Bell } from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";
import { mockTenantStats, mockMessages, mockRequests } from "@/data/mockDashboardData";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

const HomeSection = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">¡Bienvenido, {user?.name?.split(" ")[0]}!</h1>
        <p className="text-muted-foreground mt-1">
          Encuentra tu próximo hogar ideal
        </p>
      </div>

      <MockDataIndicator />

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {mockTenantStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Comienza a buscar tu próximo hogar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/propiedades">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <Search className="h-6 w-6" />
                <span>Buscar Propiedades</span>
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
              <Heart className="h-6 w-6" />
              <span>Ver Favoritos</span>
            </Button>
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span>Mis Solicitudes</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mensajes y Solicitudes Recientes */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Mensajes sin leer */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Mensajes</CardTitle>
              <CardDescription>Comunicación con propietarios</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {mockMessages.filter(m => m.unread).length} sin leer
              </Badge>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockMessages.slice(0, 3).map((message) => (
                <div 
                  key={message.id} 
                  className={`flex items-center gap-3 p-2 rounded-lg ${message.unread ? 'bg-primary/5 border-l-2 border-primary' : 'bg-muted/50'}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${message.unread ? 'font-medium' : ''}`}>
                      {message.senderName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{message.preview}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{message.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Solicitudes Recientes (solo lectura) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Mis Solicitudes</CardTitle>
              <CardDescription>Estado de tus solicitudes</CardDescription>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{request.propertyTitle}</p>
                    <p className="text-xs text-muted-foreground">{request.date}</p>
                  </div>
                  <Badge 
                    variant={
                      request.status === 'approved' ? 'default' : 
                      request.status === 'rejected' ? 'destructive' : 
                      'secondary'
                    }
                  >
                    {request.status === 'approved' ? 'Aprobada' : 
                     request.status === 'rejected' ? 'Rechazada' : 
                     'Pendiente'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actividad Reciente */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Tus últimas interacciones</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            Ver todo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <Heart className="h-5 w-5 text-red-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Agregaste a favoritos</p>
                <p className="text-xs text-muted-foreground">Apartamento Moderno Centro</p>
              </div>
              <span className="text-xs text-muted-foreground">Hace 2 horas</span>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <FileText className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Enviaste una solicitud</p>
                <p className="text-xs text-muted-foreground">Casa con Jardín Amplio</p>
              </div>
              <span className="text-xs text-muted-foreground">Ayer</span>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <Search className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Búsqueda guardada</p>
                <p className="text-xs text-muted-foreground">Apartamentos en Centro</p>
              </div>
              <span className="text-xs text-muted-foreground">Hace 3 días</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeSection;
