import {
  Home,
  Heart,
  FileText,
  MessageSquare,
  Settings,
  Building,
  Inbox,
  BarChart3,
  Users,
  FileBarChart,
  ShieldCheck,
  Search,
  Bell,
  HelpCircle,
  ClipboardList,
  CheckSquare,
  AlertCircle,
  UserCog,
  Database,
  Megaphone,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  LucideIcon,
} from "lucide-react";

export interface SidebarItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  description?: string;
}

// ============================================
// CLIENTE/ESTUDIANTE - Solo consume información
// ============================================
export const clientSidebarItems: SidebarItemConfig[] = [
  { 
    id: "home", 
    label: "Inicio", 
    icon: Home,
    description: "Resumen y actividad reciente"
  },
  { 
    id: "discover", 
    label: "Descubrir", 
    icon: Search,
    description: "Explorar propiedades disponibles"
  },
  { 
    id: "favorites", 
    label: "Mis Favoritos", 
    icon: Heart,
    description: "Propiedades guardadas"
  },
  { 
    id: "requests", 
    label: "Mis Solicitudes", 
    icon: FileText,
    description: "Estado de tus solicitudes"
  },
  { 
    id: "messages", 
    label: "Mensajes", 
    icon: MessageSquare, 
    badge: 3,
    description: "Comunicación con propietarios"
  },
  { 
    id: "notifications", 
    label: "Notificaciones", 
    icon: Bell, 
    badge: 5,
    description: "Alertas y avisos"
  },
  { 
    id: "help", 
    label: "Ayuda", 
    icon: HelpCircle,
    description: "Soporte y preguntas frecuentes"
  },
  { 
    id: "settings", 
    label: "Mi Perfil", 
    icon: Settings,
    description: "Configuración de cuenta"
  },
];

// ============================================
// OPERADOR - Tareas delegadas por admin
// ============================================
export const operatorSidebarItems: SidebarItemConfig[] = [
  { 
    id: "home", 
    label: "Panel de Tareas", 
    icon: Home,
    description: "Tareas asignadas y pendientes"
  },
  { 
    id: "tasks", 
    label: "Mis Tareas", 
    icon: ClipboardList, 
    badge: 8,
    description: "Tareas asignadas por el admin"
  },
  { 
    id: "verifications", 
    label: "Verificaciones", 
    icon: CheckSquare, 
    badge: 12,
    description: "Verificar propiedades y usuarios"
  },
  { 
    id: "reviews", 
    label: "Revisión de Contenido", 
    icon: Eye,
    description: "Revisar publicaciones pendientes"
  },
  { 
    id: "support", 
    label: "Soporte al Cliente", 
    icon: MessageSquare, 
    badge: 5,
    description: "Atender consultas de usuarios"
  },
  { 
    id: "reports", 
    label: "Reportes de Usuarios", 
    icon: AlertCircle, 
    badge: 3,
    description: "Gestionar reportes y quejas"
  },
  { 
    id: "properties-review", 
    label: "Propiedades Pendientes", 
    icon: Building,
    description: "Aprobar/rechazar propiedades"
  },
  { 
    id: "settings", 
    label: "Mi Perfil", 
    icon: Settings,
    description: "Configuración de cuenta"
  },
];

// ============================================
// PROPIETARIO - Gestiona sus propiedades
// ============================================
export const ownerSidebarItems: SidebarItemConfig[] = [
  { 
    id: "home", 
    label: "Inicio", 
    icon: Home,
    description: "Resumen de tu actividad"
  },
  { 
    id: "properties", 
    label: "Mis Propiedades", 
    icon: Building,
    description: "Gestionar tus propiedades"
  },
  { 
    id: "requests", 
    label: "Solicitudes Recibidas", 
    icon: Inbox,
    description: "Solicitudes de estudiantes"
  },
  { 
    id: "messages", 
    label: "Mensajes", 
    icon: MessageSquare, 
    badge: 2,
    description: "Comunicación con estudiantes"
  },
  { 
    id: "stats", 
    label: "Estadísticas", 
    icon: BarChart3,
    description: "Rendimiento de tus propiedades"
  },
  { 
    id: "settings", 
    label: "Mi Perfil", 
    icon: Settings,
    description: "Configuración de cuenta"
  },
];

// ============================================
// ADMINISTRADOR - CRUD completo
// ============================================
export const adminSidebarItems: SidebarItemConfig[] = [
  { 
    id: "home", 
    label: "Dashboard", 
    icon: Home,
    description: "Resumen ejecutivo de la plataforma"
  },
  { 
    id: "users", 
    label: "Gestión de Usuarios", 
    icon: Users,
    description: "CRUD completo de usuarios"
  },
  { 
    id: "operators", 
    label: "Gestión de Operadores", 
    icon: UserCog,
    description: "Administrar operadores y permisos"
  },
  { 
    id: "properties", 
    label: "Gestión de Propiedades", 
    icon: Building,
    description: "CRUD completo de propiedades"
  },
  { 
    id: "categories", 
    label: "Categorías y Tipos", 
    icon: Database,
    description: "Configurar tipos de propiedades"
  },
  { 
    id: "kyc", 
    label: "Verificaciones KYC", 
    icon: ShieldCheck, 
    badge: 8,
    description: "Aprobar verificaciones de identidad"
  },
  { 
    id: "reports", 
    label: "Reportes y Analytics", 
    icon: FileBarChart,
    description: "Estadísticas de la plataforma"
  },
  { 
    id: "announcements", 
    label: "Anuncios", 
    icon: Megaphone,
    description: "Publicar anuncios del sistema"
  },
  { 
    id: "settings", 
    label: "Configuración", 
    icon: Settings,
    description: "Configuración del sistema"
  },
];

// Helper to get sidebar items by role
export const getSidebarItemsByRole = (role: string): SidebarItemConfig[] => {
  switch (role) {
    case "admin":
      return adminSidebarItems;
    case "operator":
      return operatorSidebarItems;
    case "owner":
    case "propietario":
      return ownerSidebarItems;
    case "cliente":
    case "client":
    case "tenant":
    default:
      return clientSidebarItems;
  }
};

// ============================================
// SISTEMA DE PERMISOS POR ROL
// ============================================

export interface RolePermissions {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  canAssignTasks: boolean;
}

// Cliente: Solo puede ver información e interactuar (favoritos, solicitudes, mensajes)
export const clientPermissions: RolePermissions = {
  canView: true,
  canCreate: false,
  canEdit: false,
  canDelete: false,
  canApprove: false,
  canAssignTasks: false,
};

// Operador: Puede ver, editar contenido asignado y aprobar, pero NO crear ni eliminar
export const operatorPermissions: RolePermissions = {
  canView: true,
  canCreate: false,
  canEdit: true, // Solo editar lo asignado
  canDelete: false,
  canApprove: true, // Aprobar/rechazar contenido
  canAssignTasks: false,
};

// Propietario: Puede crear, editar y eliminar sus propias propiedades
export const ownerPermissions: RolePermissions = {
  canView: true,
  canCreate: true, // Crear propiedades
  canEdit: true, // Editar sus propiedades
  canDelete: true, // Eliminar sus propiedades
  canApprove: false,
  canAssignTasks: false,
};

// Admin: CRUD completo en todo el sistema
export const adminPermissions: RolePermissions = {
  canView: true,
  canCreate: true,
  canEdit: true,
  canDelete: true,
  canApprove: true,
  canAssignTasks: true,
};

// Helper para obtener permisos por rol
export const getPermissionsByRole = (role: string): RolePermissions => {
  switch (role) {
    case "admin":
      return adminPermissions;
    case "operator":
      return operatorPermissions;
    case "owner":
    case "propietario":
      return ownerPermissions;
    case "cliente":
    case "client":
    case "tenant":
    default:
      return clientPermissions;
  }
};

// Mantener compatibilidad con estructura anterior
export const rolePermissions = {
  cliente: clientPermissions,
  propietario: ownerPermissions,
  operator: operatorPermissions,
  admin: adminPermissions,
};

// ============================================
// TÍTULOS POR ROL (mismo color para todos)
// ============================================

export const roleTitles: Record<string, string> = {
  cliente: "Panel Estudiante",
  client: "Panel Estudiante",
  tenant: "Panel Estudiante",
  operator: "Panel Operador",
  owner: "Panel Propietario",
  propietario: "Panel Propietario",
  admin: "Panel Administrador",
};

export const getTitleByRole = (role: string): string => {
  return roleTitles[role] || "Panel";
};
