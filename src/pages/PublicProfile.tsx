import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import ProfileIcon from "@/components/ProfileIcon";
import { mockProperties } from "@/data/mockProperties";

const PublicProfile = () => {
  const { userId } = useParams();
  
  // Find all properties by this author
  const userProperties = mockProperties.filter(p => p.authorName === userId);
  const authorName = userProperties.length > 0 ? userProperties[0].authorName : userId;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start">
            <div>
              <Link to="/propiedades">
                <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a propiedades
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">{authorName}</h1>
                  <p className="text-primary-foreground/80 mt-1">
                    {userProperties.length} {userProperties.length === 1 ? 'propiedad' : 'propiedades'}
                  </p>
                </div>
              </div>
            </div>
            <ProfileIcon />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">Propiedades publicadas</h2>
            <p className="text-muted-foreground">
              Todas las propiedades de {authorName}
            </p>
          </CardContent>
        </Card>

        {userProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                image={property.images[0]}
                title={property.title}
                description={property.description}
                price={property.price}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                type={property.type}
                location={property.location}
                listingType={property.listingType}
                index={index}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Este usuario aún no ha publicado propiedades
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PublicProfile;
