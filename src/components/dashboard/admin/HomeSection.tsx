import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, ShieldCheck, AlertTriangle, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";
import { mockAdminStats, mockUsers, mockKYCVerifications } from "@/data/mockDashboardData";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const HomeSection = () => {
  const { user } = useAuth();
  const pendingKYC = mockKYCVerifications.filter((k) => k.status === "pending");
  const recentUsers = mockUsers.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido, {user?.name}. Aquí tienes un resumen de la plataforma.
        </p>
      </div>

      <MockDataIndicator />

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockAdminStats.map((stat) => {
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

      {/* Alerts */}
      {pendingKYC.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardContent className="flex items-center gap-4 py-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div className="flex-1">
              <p className="font-medium text-yellow-800">
                {pendingKYC.length} verificaciones KYC pendientes
              </p>
              <p className="text-sm text-yellow-700">
                Requieren revisión manual
              </p>
            </div>
            <Button variant="outline" size="sm">
              Revisar
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Usuarios Recientes
              </CardTitle>
              <CardDescription>Últimos registros en la plataforma</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium text-sm">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium",
                      u.role === "admin" ? "bg-red-100 text-red-800" :
                      u.role === "owner" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    )}>
                      {u.role}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(u.createdAt).toLocaleDateString("es-VE")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending KYC */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Verificaciones Pendientes
              </CardTitle>
              <CardDescription>KYC que requieren revisión</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Ver todas <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {pendingKYC.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShieldCheck className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No hay verificaciones pendientes</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingKYC.map((kyc) => (
                  <div
                    key={kyc.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium text-sm">{kyc.userName}</p>
                      <p className="text-xs text-muted-foreground">{kyc.documentType}</p>
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Gestionar Usuarios</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Building className="h-6 w-6" />
              <span>Ver Propiedades</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <ShieldCheck className="h-6 w-6" />
              <span>Verificar KYC</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Ver Reportes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeSection;
