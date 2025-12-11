import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, CheckSquare, AlertCircle, MessageSquare, Clock, ArrowRight } from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";
import { useAuth } from "@/contexts/AuthContext";

const HomeSection = () => {
  const { user } = useAuth();

  const pendingTasks = [
    { id: 1, title: "Verificar propiedad #234", type: "verification", priority: "high", dueDate: "Hoy" },
    { id: 2, title: "Revisar solicitud de usuario", type: "review", priority: "medium", dueDate: "Mañana" },
    { id: 3, title: "Responder ticket #567", type: "support", priority: "high", dueDate: "Hoy" },
    { id: 4, title: "Aprobar publicación pendiente", type: "approval", priority: "low", dueDate: "3 días" },
  ];

  const stats = [
    { label: "Tareas Pendientes", value: 8, icon: ClipboardList, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Verificaciones Hoy", value: 12, icon: CheckSquare, color: "text-green-500", bg: "bg-green-50" },
    { label: "Reportes Activos", value: 3, icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50" },
    { label: "Tickets Soporte", value: 5, icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Urgente</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Media</Badge>;
      default:
        return <Badge variant="secondary">Baja</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Operador</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido, {user?.name}. Tienes tareas pendientes por completar.
        </p>
      </div>

      <MockDataIndicator message="Panel de operador - Funcionalidad en desarrollo" />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tareas Pendientes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Tareas Asignadas
            </CardTitle>
            <CardDescription>Tareas delegadas por el administrador</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Ver todas <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Vence: {task.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getPriorityBadge(task.priority)}
                  <Button size="sm">Iniciar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acciones Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Accesos directos a tus tareas más comunes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <CheckSquare className="h-6 w-6 text-green-500" />
              <span>Verificar Propiedad</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <MessageSquare className="h-6 w-6 text-blue-500" />
              <span>Atender Ticket</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <AlertCircle className="h-6 w-6 text-yellow-500" />
              <span>Ver Reportes</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <ClipboardList className="h-6 w-6 text-purple-500" />
              <span>Mis Tareas</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeSection;
