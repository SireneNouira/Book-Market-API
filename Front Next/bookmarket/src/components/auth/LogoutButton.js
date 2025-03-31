"use client";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/utils/api';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Supprimer le token du cookie
    Cookies.remove('auth_token', { path: '/' });
    
    // 2. Réinitialiser l'en-tête d'autorisation dans Axios
    delete api.defaults.headers.common['Authorization'];
    
    // 3. Optionnel : Invalider le token côté serveur
    // (Vous pourriez faire une requête API ici si nécessaire)
    // Ex: await api.post('/logout');
    
    // 4. Rediriger vers la page de login ou la page d'accueil
    router.push('/'); // Ou vers votre page de login
    router.refresh(); // Force un rechargement du layout si nécessaire
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