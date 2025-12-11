import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  UserCog, 
  Search, 
  Plus, 
  Eye, 
  Pencil, 
  Trash2, 
  ClipboardList,
  CheckCircle,
  Clock,
  MoreVertical
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

interface Operator {
  id: string;
  name: string;
  email: string;
  assignedTasks: number;
  completedTasks: number;
  status: "active" | "inactive";
  joinedAt: string;
}

const OperatorsSection = () => {
  const operators: Operator[] = [
    { 
      id: "1", 
      name: "Juan Pérez", 
      email: "juan.perez@email.com",
      assignedTasks: 12,
      completedTasks: 45,
      status: "active",
      joinedAt: "2024-06-15"
    },
    { 
      id: "2", 
      name: "María García", 
      email: "maria.garcia@email.com",
      assignedTasks: 8,
      completedTasks: 67,
      status: "active",
      joinedAt: "2024-03-20"
    },
    { 
      id: "3", 
      name: "Carlos López", 
      email: "carlos.lopez@email.com",
      assignedTasks: 5,
      completedTasks: 23,
      status: "inactive",
      joinedAt: "2024-08-10"
    },
  ];

  const activeOperators = operators.filter(o => o.status === "active").length;
  const totalTasks = operators.reduce((acc, o) => acc + o.assignedTasks, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestión de Operadores</h1>
        <p className="text-muted-foreground mt-1">
          Administra operadores y asigna tareas
        </p>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <UserCog className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{operators.length}</p>
              <p className="text-sm text-muted-foreground">Total Operadores</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeOperators}</p>
              <p className="text-sm text-muted-foreground">Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-yellow-50">
              <ClipboardList className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalTasks}</p>
              <p className="text-sm text-muted-foreground">Tareas Asignadas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operators Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Listado de Operadores</CardTitle>
              <CardDescription>
                Gestiona los operadores y sus tareas asignadas
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar operador..." className="pl-9" />
              </div>
              {/* Admin: Botón de crear operador */}
              <Button onClick={() => toast.info("Crear nuevo operador")}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Operador
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Operador</th>
                  <th className="text-left py-3 px-4 font-medium">Estado</th>
                  <th className="text-left py-3 px-4 font-medium">Tareas Asignadas</th>
                  <th className="text-left py-3 px-4 font-medium">Completadas</th>
                  <th className="text-left py-3 px-4 font-medium">Desde</th>
                  <th className="text-left py-3 px-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {operators.map((operator) => (
                  <tr key={operator.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{operator.name}</p>
                        <p className="text-sm text-muted-foreground">{operator.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={operator.status === "active" ? "default" : "secondary"}
                        className={operator.status === "active" ? "bg-green-100 text-green-800" : ""}
                      >
                        {operator.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        {operator.assignedTasks}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {operator.completedTasks}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-muted-foreground">
                        {new Date(operator.joinedAt).toLocaleDateString("es-VE")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {/* Admin: CRUD completo de operadores */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info(`Ver perfil de ${operator.name}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Editar ${operator.name}`)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Asignar tarea a ${operator.name}`)}>
                            <ClipboardList className="h-4 w-4 mr-2" />
                            Asignar Tarea
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => toast.error(`Operador ${operator.name} eliminado`)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperatorsSection;
