import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Search, 
  Clock, 
  CheckCircle, 
  User,
  Send,
  AlertCircle
} from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface SupportTicket {
  id: string;
  subject: string;
  user: string;
  userEmail: string;
  message: string;
  date: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high";
}

const SupportSection = () => {
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  const tickets: SupportTicket[] = [
    { 
      id: "1", 
      subject: "No puedo ver las fotos de una propiedad", 
      user: "Carlos Rodríguez",
      userEmail: "carlos@email.com",
      message: "Cuando intento ver las fotos del apartamento en el centro, solo aparece un cuadro gris...",
      date: "2024-12-09",
      status: "open",
      priority: "medium"
    },
    { 
      id: "2", 
      subject: "Problema con mi solicitud de alquiler", 
      user: "Ana Martínez",
      userEmail: "ana@email.com",
      message: "Envié una solicitud hace 3 días y no he recibido respuesta del propietario...",
      date: "2024-12-09",
      status: "in_progress",
      priority: "high"
    },
    { 
      id: "3", 
      subject: "¿Cómo actualizo mi perfil?", 
      user: "Luis Hernández",
      userEmail: "luis@email.com",
      message: "Necesito cambiar mi número de teléfono pero no encuentro la opción...",
      date: "2024-12-08",
      status: "open",
      priority: "low"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Abierto</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">En progreso</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-50 text-green-700">Resuelto</Badge>;
      default:
        return null;
    }
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

  const handleReply = () => {
    if (selectedTicket && replyMessage.trim()) {
      toast.success(`Respuesta enviada a ${selectedTicket.user}`);
      setReplyDialogOpen(false);
      setReplyMessage("");
      setSelectedTicket(null);
    }
  };

  const handleMarkResolved = (ticket: SupportTicket) => {
    toast.success(`Ticket "${ticket.subject}" marcado como resuelto`);
  };

  const openReplyDialog = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setReplyDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Soporte al Cliente</h1>
        <p className="text-muted-foreground mt-1">
          Atiende las consultas y problemas de los usuarios
        </p>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-yellow-50">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tickets.filter(t => t.status === "open").length}</p>
              <p className="text-sm text-muted-foreground">Tickets Abiertos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tickets.filter(t => t.status === "in_progress").length}</p>
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
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Resueltos Hoy</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Tickets de Soporte
              </CardTitle>
              <CardDescription>
                Responde y resuelve las consultas de los usuarios
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar ticket..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 rounded-lg border hover:shadow-sm transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{ticket.subject}</h4>
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {ticket.message}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {ticket.user}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {ticket.date}
                      </span>
                    </div>
                  </div>

                  {/* Actions - Operador: Ver, Responder, Marcar resuelto (NO eliminar) */}
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openReplyDialog(ticket)}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Responder
                    </Button>
                    {ticket.status !== "resolved" && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleMarkResolved(ticket)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolver
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Responder Ticket</DialogTitle>
            <DialogDescription>
              Envía una respuesta al usuario
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Asunto:</p>
              <p className="text-sm text-muted-foreground">{selectedTicket?.subject}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Usuario:</p>
              <p className="text-sm text-muted-foreground">{selectedTicket?.user} ({selectedTicket?.userEmail})</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Mensaje original:</p>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded">{selectedTicket?.message}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Tu respuesta *</label>
              <Textarea
                placeholder="Escribe tu respuesta..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleReply}
              disabled={!replyMessage.trim()}
            >
              <Send className="h-4 w-4 mr-1" />
              Enviar Respuesta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupportSection;
