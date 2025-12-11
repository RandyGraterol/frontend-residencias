import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Home, Building, TreePine } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const Hero = () => {
  const stats = [
    { value: "500+", label: "Propiedades" },
    { value: "1,200+", label: "Usuarios" },
    { value: "98%", label: "Satisfacción" },
  ];

  const categories = [
    { icon: Building, label: "Apartamentos", count: 156 },
    { icon: Home, label: "Casas", count: 89 },
    { icon: TreePine, label: "Fincas", count: 34 },
  ];

  return (
    <section className="relative min-h-[85vh] flex flex-col overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
      {/* Navbar */}
      <Navbar variant="dashboard" />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/3 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Más de 500 propiedades disponibles
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
            >
              Encuentra tu{" "}
              <span className="relative">
                hogar ideal
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-white/20 -z-10 rounded"
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl mb-10 text-primary-foreground/80 max-w-2xl mx-auto"
            >
              Alquiler y venta de apartamentos, casas, fincas y más en San Juan de los Morros
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-10"
            >
              <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white/10 backdrop-blur-md rounded-2xl">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
                  <Input
                    placeholder="¿Dónde quieres vivir?"
                    className="pl-12 h-12 bg-white/90 border-0 text-foreground placeholder:text-muted-foreground rounded-xl"
                  />
                </div>
                <Link to="/propiedades">
                  <Button size="lg" variant="secondary" className="h-12 px-8 rounded-xl w-full sm:w-auto">
                    <Search className="h-5 w-5 mr-2" />
                    Buscar
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={index}
                    to={`/propiedades?type=${cat.label}`}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{cat.label}</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{cat.count}</span>
                  </Link>
                );
              })}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center gap-8 sm:gap-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
