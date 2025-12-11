import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Circle } from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";
import { mockMessages } from "@/data/mockDashboardData";
import { cn } from "@/lib/utils";

const MessagesSection = () => {
  const unreadCount = mockMessages.filter((m) => m.unread).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mensajes</h1>
        <p className="text-muted-foreground mt-1">
          Comunicación con propietarios e inquilinos
        </p>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mensajes Sin Leer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Conversaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMessages.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Bandeja de Entrada</CardTitle>
              <CardDescription>
                Tus conversaciones recientes
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar mensajes..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mockMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No tienes mensajes</h3>
              <p className="text-muted-foreground text-center">
                Los mensajes de propietarios aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {mockMessages.map((message) => {
                const initials = message.senderName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <button
                    key={message.id}
                    className={cn(
                      "w-full flex items-start gap-4 p-4 rounded-lg text-left transition-colors",
                      "hover:bg-muted/50",
                      message.unread && "bg-primary/5"
                    )}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      {message.unread && (
                        <Circle className="absolute -top-1 -right-1 h-3 w-3 fill-primary text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={cn(
                          "font-medium truncate",
                          message.unread && "text-foreground"
                        )}>
                          {message.senderName}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(message.date).toLocaleDateString("es-VE", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      {message.propertyTitle && (
                        <p className="text-xs text-primary mb-1 truncate">
                          {message.propertyTitle}
                        </p>
                      )}
                      <p className={cn(
                        "text-sm truncate",
                        message.unread ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {message.preview}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesSection;
