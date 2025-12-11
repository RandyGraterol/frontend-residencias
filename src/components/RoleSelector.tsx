import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, UserCog, Shield, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: Quitar 'operator' y 'admin' en producción - solo para desarrollo
type UserRole = 'cliente' | 'propietario' | 'operator' | 'admin';

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  disabled?: boolean;
}

const roles = [
  {
    id: 'cliente' as const,
    title: 'Estudiante',
    description: 'Busco residencia para alquilar',
    icon: GraduationCap
  },
  {
    id: 'propietario' as const,
    title: 'Propietario',
    description: 'Publico propiedades en alquiler',
    icon: Building
  },
  {
    id: 'operator' as const,
    title: 'Operador',
    description: 'Gestiono tareas asignadas',
    icon: UserCog
  },
  {
    id: 'admin' as const,
    title: 'Administrador',
    description: 'Control total del sistema',
    icon: Shield
  }
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = value === role.id;
        
        return (
          <Card
            key={role.id}
            className={cn(
              "cursor-pointer transition-all hover:border-primary",
              isSelected && "border-primary bg-primary/5 ring-2 ring-primary",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !disabled && onChange(role.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Icon className={cn(
                  "w-5 h-5",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )} />
                <CardTitle className="text-sm">{role.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs">
                {role.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RoleSelector;
