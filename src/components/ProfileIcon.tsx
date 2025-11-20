import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";
import { User } from "lucide-react";

const ProfileIcon = () => {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return (
      <Link to="/login">
        <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
          Iniciar sesión
        </Button>
      </Link>
    );
  }

  const initials = user?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <Link to="/perfil">
      <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary-foreground/20 transition-all">
        <AvatarFallback className="bg-primary-foreground text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default ProfileIcon;
