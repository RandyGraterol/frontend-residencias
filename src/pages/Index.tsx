import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { mockProperties } from "@/data/mockProperties";
import { ArrowRight, Building, Home, TreePine, Store, Map } from "lucide-react";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const featuredProperties = mockProperties.filter((p) => p.isFeatured);
  
  const filteredProperties = activeFilter === "Todos"
    ? mockProperties.slice(0, 6)
    : mockProperties.filter((p) => p.type === activeFilter).slice(0, 6);

  const categories = [
    { id: "Todos", label: "Todos", icon: null },
    { id: "Apartamento", label: "Apartamentos", icon: Building },
    { id: "Casa", label: "Casas", icon: Home },
    { id: "Finca", label: "Fincas", icon: TreePine },
    { id: "Local", label: "Locales", icon: Store },
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Inquilina",
      text: "Encontré mi apartamento ideal en menos de una semana. El proceso fue muy sencillo y el equipo muy profesional.",
      avatar: "MG",
    },
    {
      name: "Carlos Rodríguez",
      role: "Propietario",
      text: "Como propietario, la plataforma me ha ayudado a encontrar inquilinos confiables rápidamente.",
      avatar: "CR",
    },
    {
      name: "Ana Martínez",
      role: "Inquilina",
      text: "Excelente servicio, muy recomendado. La verificación de propiedades da mucha confianza.",
      avatar: "AM",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Featured Properties */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10"
          >
            <div>
              <span className="text-primary font-medium mb-2 block">Destacados</span>
              <h2 className="text-3xl md:text-4xl font-bold">Propiedades destacadas</h2>
            </div>
            <Link to="/propiedades" className="mt-4 md:mt-0">
              <Button variant="outline" className="group">
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredProperties.slice(0, 3).map((property, index) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                image={property.images[0]}
                images={property.images}
                title={property.title}
                description={property.description}
                price={property.price}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                type={property.type}
                location={property.location}
                listingType={property.listingType}
                isFeatured={property.isFeatured}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Properties with Filter */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-primary font-medium mb-2 block">Explora</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Encuentra tu próximo hogar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Explora nuestra amplia selección de propiedades en alquiler y venta
            </p>

            {/* Filter Tabs */}
            <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
              <TabsList className="inline-flex h-auto p-1 bg-muted/50 rounded-full flex-wrap justify-center gap-1">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {cat.icon && <cat.icon className="h-4 w-4 mr-2" />}
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                image={property.images[0]}
                images={property.images}
                title={property.title}
                description={property.description}
                price={property.price}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                type={property.type}
                location={property.location}
                listingType={property.listingType}
                isFeatured={property.isFeatured}
                index={index}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10"
          >
            <Link to="/propiedades">
              <Button size="lg" className="group">
                Ver todas las propiedades
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Map className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Tienes una propiedad para alquilar o vender?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Publica tu propiedad gratis y conecta con miles de personas buscando su próximo hogar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/registro">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Publicar propiedad
                </Button>
              </Link>
              <Link to="/propiedades">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-lg px-8 border-2 border-primary-foreground hover:bg-primary-foreground/10"
                >
                  Explorar propiedades
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Features />

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium mb-2 block">Testimonios</span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Lo que dicen nuestros usuarios
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-secondary/50 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
