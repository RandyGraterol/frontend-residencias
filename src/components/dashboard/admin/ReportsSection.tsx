import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  FileBarChart,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  Download,
  Calendar,
  DollarSign,
  Eye,
  MessageSquare,
  Clock,
  Target,
  PieChart,
  Activity,
  MapPin,
  Home,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Timer,
  UserCheck,
  Building2,
  Handshake,
} from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";

const ReportsSection = () => {
  // KPIs principales
  const mainKPIs = [
    { label: "Usuarios Activos", value: "1,847", change: 12.5, icon: Users, color: "text-blue-500" },
    { label: "Propiedades Listadas", value: "456", change: 8.3, icon: Building, color: "text-green-500" },
    { label: "Tasa de Conversión", value: "24.8%", change: 3.2, icon: Target, color: "text-purple-500" },
    { label: "Ingresos Estimados", value: "Bs. 45,200", change: -2.1, icon: DollarSign, color: "text-yellow-500" },
  ];

  // Datos de crecimiento mensual
  const monthlyData = [
    { month: "Jul", users: 120, properties: 45, requests: 89 },
    { month: "Ago", users: 145, properties: 52, requests: 112 },
    { month: "Sep", users: 180, properties: 61, requests: 134 },
    { month: "Oct", users: 210, properties: 78, requests: 156 },
    { month: "Nov", users: 250, properties: 89, requests: 189 },
    { month: "Dic", users: 280, properties: 95, requests: 215 },
  ];

  // Distribución por tipo de propiedad
  const propertyDistribution = [
    { type: "Apartamentos", count: 156, percentage: 34, color: "bg-blue-500" },
    { type: "Casas", count: 124, percentage: 27, color: "bg-green-500" },
    { type: "Cuartos", count: 89, percentage: 20, color: "bg-yellow-500" },
    { type: "Fincas", count: 45, percentage: 10, color: "bg-purple-500" },
    { type: "Locales", count: 28, percentage: 6, color: "bg-orange-500" },
    { type: "Terrenos", count: 14, percentage: 3, color: "bg-pink-500" },
  ];

  // Métricas de engagement
  const engagementMetrics = [
    { label: "Vistas Totales", value: "125,430", icon: Eye, trend: "+18%" },
    { label: "Mensajes Enviados", value: "3,456", icon: MessageSquare, trend: "+24%" },
    { label: "Tiempo Promedio en Sitio", value: "4:32 min", icon: Timer, trend: "+8%" },
    { label: "Tasa de Rebote", value: "32%", icon: Activity, trend: "-5%" },
  ];

  // Top ubicaciones
  const topLocations = [
    { location: "Centro", properties: 89, views: 12450 },
    { location: "Urb. Las Palmas", properties: 67, views: 9870 },
    { location: "Zona Norte", properties: 54, views: 7650 },
    { location: "Country Club", properties: 34, views: 5430 },
    { location: "Casco Histórico", properties: 28, views: 4120 },
  ];

  // Métricas de rendimiento
  const performanceMetrics = [
    { label: "Propiedades Alquiladas", value: 234, total: 456, percentage: 51 },
    { label: "Usuarios Verificados", value: 1245, total: 1847, percentage: 67 },
    { label: "Solicitudes Aprobadas", value: 567, total: 789, percentage: 72 },
    { label: "KYC Completados", value: 890, total: 1100, percentage: 81 },
  ];

  // Datos de retención
  const retentionData = [
    { period: "Semana 1", rate: 100 },
    { period: "Semana 2", rate: 78 },
    { period: "Semana 4", rate: 62 },
    { period: "Mes 2", rate: 48 },
    { period: "Mes 3", rate: 41 },
    { period: "Mes 6", rate: 35 },
  ];

  const maxUsers = Math.max(...monthlyData.map((d) => d.users));
  const maxViews = Math.max(...topLocations.map((l) => l.views));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reportes</h1>
          <p className="text-muted-foreground mt-1">
            Métricas estratégicas y análisis de la plataforma
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Últimos 30 días
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <MockDataIndicator />

      {/* KPIs Principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mainKPIs.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change > 0;
          return (
            <Card key={kpi.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-muted ${kpi.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
                    {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {Math.abs(kpi.change)}%
                  </Badge>
                </div>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs de Análisis */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">General</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="properties">Propiedades</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        {/* Tab General */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Gráfico de Crecimiento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Crecimiento Mensual
                </CardTitle>
                <CardDescription>Usuarios y propiedades por mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-52">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full flex gap-1 justify-center" style={{ height: "180px" }}>
                        <div className="w-1/2 bg-muted rounded-t relative">
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-primary rounded-t transition-all"
                            style={{ height: `${(data.users / maxUsers) * 100}%` }}
                          />
                        </div>
                        <div className="w-1/2 bg-muted rounded-t relative">
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-t transition-all"
                            style={{ height: `${(data.properties / 100) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary" />
                    <span className="text-sm">Usuarios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500" />
                    <span className="text-sm">Propiedades</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Distribución de Propiedades */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Distribución por Tipo
                </CardTitle>
                <CardDescription>Propiedades por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyDistribution.map((item) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.type}</span>
                        <span className="font-medium">{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Métricas de Rendimiento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Métricas de Rendimiento
              </CardTitle>
              <CardDescription>Objetivos y tasas de conversión</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {metric.value}/{metric.total}
                      </span>
                    </div>
                    <Progress value={metric.percentage} className="h-2" />
                    <p className="text-2xl font-bold">{metric.percentage}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Usuarios */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Usuarios por Rol</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Inquilinos</span>
                  </div>
                  <span className="font-bold">1,245</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-green-500" />
                    <span>Propietarios</span>
                  </div>
                  <span className="font-bold">456</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-5 w-5 text-purple-500" />
                    <span>Administradores</span>
                  </div>
                  <span className="font-bold">12</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Retención de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {retentionData.map((item) => (
                    <div key={item.period} className="flex items-center gap-3">
                      <span className="text-sm w-20">{item.period}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${item.rate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12">{item.rate}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>45 usuarios activos ahora</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>128 registros hoy</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span>23 verificaciones pendientes</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>89% tasa de activación</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Propiedades */}
        <TabsContent value="properties" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Top Ubicaciones
                </CardTitle>
                <CardDescription>Zonas con más propiedades y vistas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLocations.map((loc, index) => (
                    <div key={loc.location} className="flex items-center gap-4">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{loc.location}</span>
                          <span className="text-sm text-muted-foreground">{loc.properties} props.</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(loc.views / maxViews) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium">{(loc.views / 1000).toFixed(1)}k vistas</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5" />
                  Métricas de Transacciones
                </CardTitle>
                <CardDescription>Alquileres y ventas del mes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Alquileres Exitosos</p>
                    <p className="text-3xl font-bold text-green-600">78</p>
                    <p className="text-xs text-green-600">+12% vs mes anterior</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Ventas Cerradas</p>
                    <p className="text-3xl font-bold text-blue-600">23</p>
                    <p className="text-xs text-blue-600">+8% vs mes anterior</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Tiempo promedio de alquiler</span>
                    <span className="font-medium">12 días</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Precio promedio alquiler</span>
                    <span className="font-medium">Bs. 320/mes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Precio promedio venta</span>
                    <span className="font-medium">Bs. 65,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Engagement */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {engagementMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {metric.trend}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fuentes de Tráfico</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Búsqueda Orgánica</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Directo</span>
                    <span>28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Redes Sociales</span>
                    <span>18%</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Referidos</span>
                    <span>9%</span>
                  </div>
                  <Progress value={9} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dispositivos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span>📱 Móvil</span>
                  <div className="flex items-center gap-2">
                    <Progress value={62} className="w-24 h-2" />
                    <span className="font-medium">62%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span>💻 Desktop</span>
                  <div className="flex items-center gap-2">
                    <Progress value={31} className="w-24 h-2" />
                    <span className="font-medium">31%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span>📟 Tablet</span>
                  <div className="flex items-center gap-2">
                    <Progress value={7} className="w-24 h-2" />
                    <span className="font-medium">7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Reportes Descargables */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes Descargables</CardTitle>
          <CardDescription>Exporta datos detallados en diferentes formatos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              <span>Reporte de Usuarios</span>
              <span className="text-xs text-muted-foreground">CSV, Excel</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Building className="h-6 w-6 text-green-500" />
              <span>Reporte de Propiedades</span>
              <span className="text-xs text-muted-foreground">CSV, Excel</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <DollarSign className="h-6 w-6 text-yellow-500" />
              <span>Reporte Financiero</span>
              <span className="text-xs text-muted-foreground">PDF, Excel</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <FileBarChart className="h-6 w-6 text-purple-500" />
              <span>Reporte Completo</span>
              <span className="text-xs text-muted-foreground">PDF</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
