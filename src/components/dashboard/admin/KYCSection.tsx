import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ShieldCheck, Search, Clock, CheckCircle, XCircle, Mail, FileText, Eye } from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";
import { mockKYCVerifications } from "@/data/mockDashboardData";

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
          Aprobado
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Rechazado
        </Badge>
      );
    default:
      return null;
  }
};

const KYCSection = () => {
  const pendingCount = mockKYCVerifications.filter((k) => k.status === "pending").length;
  const approvedCount = mockKYCVerifications.filter((k) => k.status === "approved").length;
  const rejectedCount = mockKYCVerifications.filter((k) => k.status === "rejected").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Verificaciones KYC</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona las verificaciones de identidad de los usuarios
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
              Aprobados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rechazados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* KYC List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Solicitudes de Verificación</CardTitle>
              <CardDescription>
                {mockKYCVerifications.length} solicitudes en total
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar usuario..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mockKYCVerifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ShieldCheck className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No hay verificaciones</h3>
              <p className="text-muted-foreground text-center">
                Las solicitudes de verificación aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockKYCVerifications.map((kyc) => {
                const initials = kyc.userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <div
                    key={kyc.id}
                    className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg border gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{kyc.userName}</h4>
                          {getStatusBadge(kyc.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {kyc.userEmail}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {kyc.documentType}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Enviado el {new Date(kyc.submittedAt).toLocaleDateString("es-VE")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-16 lg:ml-0">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Documentos
                      </Button>
                      {kyc.status === "pending" && (
                        <>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Rechazar
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
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

export default KYCSection;
