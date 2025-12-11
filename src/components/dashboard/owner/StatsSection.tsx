import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, Eye, Building, Users, Calendar } from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";
import { mockOwnerStats, mockProperties } from "@/data/mockDashboardData";
import { cn } from "@/lib/utils";

const StatsSection = () => {
  const totalViews = mockProperties.reduce((acc, p) => acc + p.views, 0);
  const activeProperties = mockProperties.filter((p) => p.status === "active").length;

  // Mock chart data
  const weeklyViews = [
    { day: "Lun", views: 45 },
    { day: "Mar", views: 52 },
    { day: "Mié", views: 38 },
    { day: "Jue", views: 65 },
    { day: "Vie", views: 78 },
    { day: "Sáb", views: 92 },
    { day: "Dom", views: 43 },
  ];

  const maxViews = Math.max(...weeklyViews.map((d) => d.views));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Estadísticas</h1>
        <p className="text-muted-foreground mt-1">
          Analiza el rendimiento de tus propiedades
        </p>
      </div>

      <MockDataIndicator />

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockOwnerStats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change && stat.change > 0;
          
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
                      isPositive ? "text-green-600" : "text-red-600"
                    )}>
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-0.5" />
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
        {/* Weekly Views Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Vistas Semanales
            </CardTitle>
            <CardDescription>
              Visitas a tus propiedades esta semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyViews.map((data) => (
                <div key={data.day} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-muted rounded-t relative" style={{ height: "160px" }}>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-primary rounded-t transition-all"
                      style={{ height: `${(data.views / maxViews) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Total esta semana</span>
              <span className="font-bold">{weeklyViews.reduce((a, b) => a + b.views, 0)} vistas</span>
            </div>
          </CardContent>
        </Card>

        {/* Property Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Rendimiento por Propiedad
            </CardTitle>
            <CardDescription>
              Vistas de cada propiedad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProperties.map((property) => {
                const percentage = (property.views / totalViews) * 100;
                
                return (
                  <div key={property.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate max-w-[200px]">
                        {property.title}
                      </span>
                      <span className="text-muted-foreground">
                        {property.views} vistas
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Eye className="h-4 w-4" />
              Vistas Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalViews}</div>
            <p className="text-sm text-muted-foreground mt-1">
              En todas tus propiedades
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              Tasa de Conversión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12.5%</div>
            <p className="text-sm text-muted-foreground mt-1">
              Solicitudes / Vistas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4" />
              Tiempo Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15 días</div>
            <p className="text-sm text-muted-foreground mt-1">
              Para alquilar una propiedad
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsSection;
