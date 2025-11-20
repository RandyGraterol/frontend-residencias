import { Shield, Clock, Heart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Seguridad garantizada",
      description: "Todas nuestras propiedades son verificadas y cumplen con los más altos estándares de seguridad"
    },
    {
      icon: Clock,
      title: "Proceso rápido",
      description: "Trámites ágiles y transparentes para que encuentres tu hogar sin complicaciones"
    },
    {
      icon: Heart,
      title: "Atención personalizada",
      description: "Te acompañamos en cada paso del proceso de alquiler con dedicación y profesionalismo"
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">¿Por qué elegirnos?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-6">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
