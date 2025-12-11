import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Building, Shield, Users, Home, ArrowLeft, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import RoleSelector from "@/components/RoleSelector";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, getRedirectPath, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonePrefix: "+58",
    phone: "",
    cedulaType: "V",
    cedula: "",
    dateOfBirth: "",
    city: "",
    password: "",
    confirmPassword: "",
    role: "cliente" as "cliente" | "propietario" | "operator" | "admin",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getRedirectPath(), { replace: true });
    }
  }, [isAuthenticated, navigate, getRedirectPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);

    if (result.success) {
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada correctamente",
      });
      setTimeout(() => {
        navigate(getRedirectPath());
      }, 500);
    } else {
      toast({
        title: "Error",
        description: result.error || "No se pudo crear la cuenta",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const features = [
    {
      icon: Home,
      title: "Publica o encuentra propiedades",
      description: "Conecta con inquilinos o propietarios verificados",
    },
    {
      icon: Shield,
      title: "Verificación de identidad",
      description: "Proceso KYC para mayor seguridad",
    },
    {
      icon: Users,
      title: "Comunidad confiable",
      description: "Miles de usuarios satisfechos en la plataforma",
    },
  ];

  const benefits = [
    "Acceso a miles de propiedades",
    "Mensajería directa con propietarios",
    "Alertas de nuevas propiedades",
    "Gestión de solicitudes en línea",
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Info */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary text-primary-foreground p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
            <Building className="h-8 w-8" />
            <span className="text-2xl font-bold">Habitas</span>
          </Link>

          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-3">
                Únete a Habitas
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Crea tu cuenta y comienza a explorar las mejores opciones de alquiler.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-5 mt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2.5 bg-primary-foreground/10 rounded-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-primary-foreground/70">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits */}
            <div className="mt-8 p-4 bg-primary-foreground/10 rounded-xl">
              <h4 className="font-semibold mb-3">Al registrarte obtienes:</h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground/80" />
                    <span className="text-primary-foreground/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-primary-foreground/60">
          © 2024 Habitas. Todos los derechos reservados.
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-primary text-primary-foreground p-4">
          <Link to="/" className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            <span className="text-xl font-bold">Habitas</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-background overflow-auto">
          <div className="w-full max-w-md space-y-6">
            {/* Back Link - Mobile */}
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors lg:hidden"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>

            {/* Header */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Crear cuenta</h2>
              <p className="text-muted-foreground text-sm">
                Completa el formulario para unirte a nuestra comunidad
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selector */}
              <div className="space-y-2">
                <Label>Tipo de cuenta</Label>
                <RoleSelector
                  value={formData.role}
                  onChange={(role) => setFormData({ ...formData, role })}
                  disabled={isLoading}
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.phonePrefix}
                    onValueChange={(value) => setFormData({ ...formData, phonePrefix: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-28 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="+58">🇻🇪 +58</SelectItem>
                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                      <SelectItem value="+34">🇪🇸 +34</SelectItem>
                      <SelectItem value="+57">🇨🇴 +57</SelectItem>
                      <SelectItem value="+52">🇲🇽 +52</SelectItem>
                      <SelectItem value="+54">🇦🇷 +54</SelectItem>
                      <SelectItem value="+56">🇨🇱 +56</SelectItem>
                      <SelectItem value="+51">🇵🇪 +51</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="412-1234567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="flex-1 h-11"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Cedula */}
              <div className="space-y-2">
                <Label htmlFor="cedula">Cédula de identidad</Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.cedulaType}
                    onValueChange={(value) => setFormData({ ...formData, cedulaType: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-20 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="V">V</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="J">J</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="cedula"
                    name="cedula"
                    type="text"
                    placeholder="12345678"
                    value={formData.cedula}
                    onChange={handleChange}
                    required
                    className="flex-1 h-11"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Date of Birth & City - Two columns */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Fecha de nacimiento</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Caracas"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Passwords - Two columns */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  "Crear cuenta"
                )}
              </Button>

              {/* Terms */}
              <p className="text-xs text-center text-muted-foreground">
                Al registrarte, aceptas nuestros{" "}
                <Link to="/terminos" className="text-primary hover:underline">
                  Términos de Servicio
                </Link>{" "}
                y{" "}
                <Link to="/privacidad" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
              </p>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  ¿Ya tienes cuenta?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <Link to="/login">
                <Button variant="outline" className="w-full h-11">
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
