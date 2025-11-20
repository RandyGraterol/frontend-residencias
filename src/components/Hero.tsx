import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import ProfileIcon from "@/components/ProfileIcon";

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute top-4 right-4 z-20">
        <ProfileIcon />
      </div>
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-primary/80" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Encuentra tu hogar ideal
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
          Alquiler de apartamentos, casas y cuartos en San Juan de los Morros
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/propiedades">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Ver propiedades
            </Button>
          </Link>
          <Link to="/registro">
            <Button size="lg" variant="ghost" className="text-lg px-8 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
              Regístrate
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
