"use client";
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Supprimer le token du localStorage
    localStorage.removeItem('token');
    
    // 2. Optionnel : Invalider le token côté serveur
    // (Vous pourriez faire une requête API ici si nécessaire)
    
    // 3. Rediriger vers la page de login
    // router.push("@/components/auth/AuthForm");
    router.refresh(); // Force un rechargement du layout si nécessaire
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Déconnexion
    </button>
  );
};

export default LogoutButton;