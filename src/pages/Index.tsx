import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import apartment1 from "@/assets/apartment-1.jpg";
import room1 from "@/assets/room-1.jpg";
import house1 from "@/assets/house-1.jpg";

const Index = () => {
  const properties = [
    {
      id: "1",
      image: apartment1,
      title: "Apartamento Moderno Centro",
      description: "Espacioso apartamento con excelente ubicación cerca de todos los servicios",
      price: "Bs. 250",
      bedrooms: 2,
      type: "Apartamento"
    },
    {
      id: "2",
      image: house1,
      title: "Casa con Jardín",
      description: "Hermosa casa familiar con amplio jardín y estacionamiento",
      price: "Bs. 400",
      bedrooms: 3,
      type: "Casa"
    },
    {
      id: "3",
      image: room1,
      title: "Habitación Amueblada",
      description: "Cómoda habitación totalmente amueblada, ideal para estudiantes",
      price: "Bs. 120",
      bedrooms: 1,
      type: "Cuarto"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Propiedades destacadas</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Explora nuestra selección de propiedades disponibles
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                id={property.id}
                image={property.image}
                title={property.title}
                description={property.description}
                price={property.price}
                bedrooms={property.bedrooms}
                type={property.type}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
