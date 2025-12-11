import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Clock, CheckCircle, AlertCircle, User } from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";

const TasksSection = () => {
  const tasks = {
    pending: [
      { id: 1, title: "Verificar propiedad Apartamento Centro #234", assignedBy: "Admin Principal", dueDate: "2024-12-10", priority: "high" },
      { id: 2, title: "Revisar documentos KYC de usuario", assignedBy: "Admin Principal", dueDate: "2024-12-11", priority: "medium" },
      { id: 3, title: "Responder consulta sobre alquiler", assignedBy: "Sistema", dueDate: "2024-12-10", priority: "high" },
    ],
    inProgress: [
      { id: 4, title: "Verificación de propiedad Casa Las Palmas", assignedBy: "Admin Principal", dueDate: "2024-12-09", priority: "medium" },
    ],
    completed: [
      { id: 5, title: "Aprobación de publicación #123", assignedBy: "Admin Principal", completedDate: "2024-12-08", priority: "low" },
      { id: 6, title: "Verificación KYC usuario #456", assignedBy: "Sistema", completedDate: "2024-12-07", priority: "medium" },
    ],
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Urgente</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Media</Badge>;
      default:
        return <Badge variant="secondary">Baja</Badge>;
    }
  };

  const TaskCard = ({ task, showActions = true }: { task: any; showActions?: boolean }) => (
    <div className="p-4 rounded-lg border hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium">{task.title}</h4>
            {getPriorityBadge(task.priority)}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {task.assignedBy}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {task.dueDate || task.completedDate}
            </span>
          </div>
        </div>
        {showActions && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Ver</Button>
            <Button size="sm">Completar</Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mis Tareas</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona las tareas asignadas por el administrador
        </p>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-yellow-50">
              <ClipboardList className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tasks.pending.length}</p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tasks.inProgress.length}</p>
              <p className="text-sm text-muted-foreground">En Progreso</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tasks.completed.length}</p>
              <p className="text-sm text-muted-foreground">Completadas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Tareas</CardTitle>
          <CardDescription>Tareas asignadas organizadas por estado</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Pendientes ({tasks.pending.length})
              </TabsTrigger>
              <TabsTrigger value="inProgress" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                En Progreso ({tasks.inProgress.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Completadas ({tasks.completed.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-3">
              {tasks.pending.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </TabsContent>

            <TabsContent value="inProgress" className="space-y-3">
              {tasks.inProgress.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3">
              {tasks.completed.map((task) => (
                <TaskCard key={task.id} task={task} showActions={false} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksSection;
