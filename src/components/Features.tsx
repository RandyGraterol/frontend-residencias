import { Shield, Clock, Heart, Users, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Seguridad garantizada",
      description: "Todas nuestras propiedades son verificadas y cumplen con los más altos estándares",
    },
    {
      icon: Clock,
      title: "Proceso rápido",
      description: "Trámites ágiles y transparentes para que encuentres tu hogar sin complicaciones",
    },
    {
      icon: Heart,
      title: "Atención personalizada",
      description: "Te acompañamos en cada paso del proceso con dedicación y profesionalismo",
    },
    {
      icon: Users,
      title: "Comunidad verificada",
      description: "Propietarios e inquilinos verificados para mayor tranquilidad",
    },
    {
      icon: MapPin,
      title: "Ubicaciones estratégicas",
      description: "Propiedades en las mejores zonas de San Juan de los Morros",
    },
    {
      icon: CheckCircle,
      title: "Documentación legal",
      description: "Asesoría completa en contratos y documentación legal",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">¿Por qué elegirnos?</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            La mejor plataforma de alquileres
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una experiencia completa para encontrar tu próximo hogar con total confianza y seguridad
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 bg-background rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-5"
              >
                <feature.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
