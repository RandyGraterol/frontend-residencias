import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Inbox, Clock, CheckCircle, XCircle, MessageSquare, Mail } from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";
import { mockRequests } from "@/data/mockDashboardData";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Pendiente
        </Badge>
      );
    case "approved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Aprobada
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Rechazada
        </Badge>
      );
    default:
      return null;
  }
};

const ReceivedRequestsSection = () => {
  const pendingCount = mockRequests.filter((r) => r.status === "pending").length;
  const approvedCount = mockRequests.filter((r) => r.status === "approved").length;
  const rejectedCount = mockRequests.filter((r) => r.status === "rejected").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Solicitudes Recibidas</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona las solicitudes de alquiler de tus propiedades
        </p>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aprobadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rechazadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las Solicitudes</CardTitle>
          <CardDescription>
            {mockRequests.length} solicitudes en total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Inbox className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No hay solicitudes</h3>
              <p className="text-muted-foreground text-center">
                Las solicitudes de alquiler aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockRequests.map((request) => {
                const initials = request.requesterName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <div
                    key={request.id}
                    className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg border gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{request.requesterName}</h4>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-primary mb-1">{request.propertyTitle}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          "{request.message}"
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {request.requesterEmail}
                          </span>
                          <span>
                            {new Date(request.date).toLocaleDateString("es-VE")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-12 lg:ml-0">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Mensaje
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button variant="outline" size="sm">
                            Rechazar
                          </Button>
                          <Button size="sm">
                            Aprobar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceivedRequestsSection;
