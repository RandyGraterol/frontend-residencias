import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, MoreVertical, Mail, Calendar, CheckCircle, XCircle, Plus, Eye, Pencil, Trash2, UserCog, Ban } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MockDataIndicator from "../MockDataIndicator";
import { mockUsers } from "@/data/mockDashboardData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const UsersSection = () => {
  const totalUsers = mockUsers.length;
  const verifiedUsers = mockUsers.filter((u) => u.isVerified).length;
  const ownerCount = mockUsers.filter((u) => u.role === "owner").length;
  const tenantCount = mockUsers.filter((u) => u.role === "tenant").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <p className="text-muted-foreground mt-1">
          Administra todos los usuarios de la plataforma
        </p>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Verificados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{verifiedUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Propietarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{ownerCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inquilinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{tenantCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Listado de Usuarios</CardTitle>
              <CardDescription>
                {totalUsers} usuarios registrados
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar usuario..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filtrar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="owner">Propietarios</SelectItem>
                  <SelectItem value="tenant">Inquilinos</SelectItem>
                  <SelectItem value="operator">Operadores</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              {/* Admin: Botón de crear usuario */}
              <Button onClick={() => toast.info("Crear nuevo usuario")}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Usuario
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mockUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No hay usuarios</h3>
              <p className="text-muted-foreground text-center">
                Los usuarios registrados aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Usuario</th>
                    <th className="text-left py-3 px-4 font-medium">Rol</th>
                    <th className="text-left py-3 px-4 font-medium">Estado</th>
                    <th className="text-left py-3 px-4 font-medium">Registro</th>
                    <th className="text-left py-3 px-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {u.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={cn(
                          u.role === "admin" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                          u.role === "owner" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                          "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        )}>
                          {u.role === "admin" ? "Admin" :
                           u.role === "owner" ? "Propietario" : "Inquilino"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {u.isVerified ? (
                          <span className="flex items-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="h-4 w-4" />
                            Verificado
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-600 text-sm">
                            <XCircle className="h-4 w-4" />
                            Pendiente
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(u.createdAt).toLocaleDateString("es-VE")}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {/* Admin: CRUD completo de usuarios */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.info(`Ver perfil de ${u.name}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info(`Editar ${u.name}`)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar usuario
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info(`Cambiar rol de ${u.name}`)}>
                              <UserCog className="h-4 w-4 mr-2" />
                              Cambiar rol
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-orange-600"
                              onClick={() => toast.warning(`Cuenta de ${u.name} suspendida`)}
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Suspender cuenta
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => toast.error(`Usuario ${u.name} eliminado`)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar usuario
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersSection;
