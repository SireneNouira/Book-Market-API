"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useAuth(); // Récupérer la fonction logout du contexte

  const handleLogout = () => {
    logout(); // Mettre à jour le state global
    router.refresh(); // Forcer la mise à jour des composants
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-1 rounded-lg shadow-md transition-all duration-200"
    >
      Déconnexion
    </button>
  );
};

export default LogoutButton;
