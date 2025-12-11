import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Building, Eye, TrendingUp, ArrowRight, ArrowUpRight, ArrowDownRight } from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";
import { mockOwnerStats, mockProperties, mockRequests } from "@/data/mockDashboardData";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const HomeSection = () => {
  const { user } = useAuth();
  const recentProperties = mockProperties.slice(0, 3);
  const pendingRequests = mockRequests.filter((r) => r.status === "pending").slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">¡Bienvenido, {user?.name?.split(" ")[0]}!</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona tus propiedades y solicitudes
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Propiedad
        </Button>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockOwnerStats.map((stat) => {
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
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  {stat.change !== undefined && (
                    <span className={cn(
                      "flex items-center text-xs font-medium",
                      stat.change > 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {stat.change > 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(stat.change)}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Properties */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Propiedades Recientes</CardTitle>
              <CardDescription>Tus últimas publicaciones</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Ver todas <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                      <Building className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{property.title}</p>
                      <p className="text-xs text-muted-foreground">{property.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-primary">{property.price}/mes</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {property.views} vistas
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Solicitudes Pendientes</CardTitle>
              <CardDescription>Requieren tu atención</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Ver todas <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No hay solicitudes pendientes</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium text-sm">{request.requesterName}</p>
                      <p className="text-xs text-muted-foreground">{request.propertyTitle}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Rechazar
                      </Button>
                      <Button size="sm">
                        Aprobar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeSection;
