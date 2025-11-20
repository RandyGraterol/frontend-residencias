import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

interface KYCDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const KYCDialog = ({ open, onOpenChange }: KYCDialogProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [kycForm, setKycForm] = useState({
    occupation: "",
    monthlyIncome: "",
    propertyPurpose: "",
    additionalInfo: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKycForm({
      ...kycForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update user verification status
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user!.id ? { ...u, isVerified: true } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update current user
    const updatedUser = { ...user!, isVerified: true };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    toast({
      title: "¡Verificación completada!",
      description: "Tu cuenta ha sido verificada exitosamente. Ahora puedes registrar propiedades."
    });

    // Reload page to update context
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Verificación de usuario (KYC)</DialogTitle>
          <DialogDescription>
            Complete el siguiente formulario para verificar su identidad y convertirse en propietario
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="occupation">Ocupación</Label>
            <Input
              id="occupation"
              name="occupation"
              placeholder="Ej: Ingeniero, Profesor, Empresario"
              value={kycForm.occupation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyIncome">Ingreso mensual aproximado ($)</Label>
            <Select
              value={kycForm.monthlyIncome}
              onValueChange={(value) => setKycForm({ ...kycForm, monthlyIncome: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un rango" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-500">$0 - $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                <SelectItem value="5000+">$5,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyPurpose">Propósito de la propiedad</Label>
            <Select
              value={kycForm.propertyPurpose}
              onValueChange={(value) => setKycForm({ ...kycForm, propertyPurpose: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Alquilar a largo plazo</SelectItem>
                <SelectItem value="shortTerm">Alquilar a corto plazo</SelectItem>
                <SelectItem value="investment">Inversión</SelectItem>
                <SelectItem value="both">Ambos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Información adicional</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              placeholder="Cuéntenos sobre su experiencia como propietario o cualquier información relevante..."
              value={kycForm.additionalInfo}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Al enviar este formulario, confirma que la información proporcionada es correcta y está de acuerdo
              con nuestros términos y condiciones de verificación.
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Enviar verificación
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
