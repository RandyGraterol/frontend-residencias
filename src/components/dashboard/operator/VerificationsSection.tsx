import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckSquare, Search, Building, User, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import MockDataIndicator from "../MockDataIndicator";

const VerificationsSection = () => {
  const verifications = [
    { id: 1, type: "property", title: "Apartamento Moderno Centro", user: "María González", date: "2024-12-09", status: "pending" },
    { id: 2, type: "user", title: "Verificación KYC", user: "Carlos Rodríguez", date: "2024-12-09", status: "pending" },
    { id: 3, type: "property", title: "Casa con Jardín Las Palmas", user: "Pedro López", date: "2024-12-08", status: "pending" },
    { id: 4, type: "user", title: "Verificación KYC", user: "Ana Martínez", date: "2024-12-08", status: "approved" },
    { id: 5, type: "property", title: "Local Comercial Centro", user: "Luis Hernández", date: "2024-12-07", status: "rejected" },
  ];

  const pendingCount = verifications.filter(v => v.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Verificaciones</h1>
        <p className="text-muted-foreground mt-1">
          Verifica propiedades y usuarios pendientes de aprobación
        </p>
      </div>

      <MockDataIndicator />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-yellow-50">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Aprobadas Hoy</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-50">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Rechazadas Hoy</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Cola de Verificaciones
              </CardTitle>
              <CardDescription>Revisa y aprueba o rechaza las solicitudes</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {verifications.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${item.type === "property" ? "bg-blue-50" : "bg-purple-50"}`}>
                    {item.type === "property" ? (
                      <Building className={`h-5 w-5 ${item.type === "property" ? "text-blue-600" : "text-purple-600"}`} />
                    ) : (
                      <User className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge variant="outline">
                        {item.type === "property" ? "Propiedad" : "Usuario"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Solicitado por: {item.user} • {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-11 md:ml-0">
                  {item.status === "pending" ? (
                    <>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Revisar
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <XCircle className="h-4 w-4 mr-1" />
                        Rechazar
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                    </>
                  ) : (
                    <Badge className={item.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {item.status === "approved" ? "Aprobado" : "Rechazado"}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationsSection;
