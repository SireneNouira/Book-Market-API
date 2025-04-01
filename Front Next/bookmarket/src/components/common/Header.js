'use client';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/utils/api";
import { jwtDecode } from "jwt-decode";
import { MenuIcon } from "../icons";
import { useAuth } from "@/components/auth/AuthContext";


function Header() {
  const { user } = useAuth();
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const token = Cookies.get('auth_token');
        
  //       if (!token) {
  //         setLoading(false);
  //         return;
  //       }

  //       // Décoder le token pour avoir les infos de base immédiatement
  //       const decoded = jwtDecode(token);
  //       setUser({
  //         email: decoded.email,
  //         prenom: decoded.prenom,
  //         nom: decoded.nom,
  //         type: decoded.type
  //       });

  //       // Ensuite, faire la requête pour plus de détails
  //       const response = await api.get('/me', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });

  //       setUser(response.data);
  //     } catch (err) {
  //       console.error("Erreur de récupération de l'utilisateur:", err);
  //       setError("Impossible de charger les informations utilisateur");
  //       // Nettoyer le token si invalide
  //       if (err.response?.status === 401) {
  //         Cookies.remove('auth_token');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <>
      <div className="flex justify-center bg-emerald-400 text-white shadow-lg">
        <p className="text-sm text-emerald-700 flex items-center">
          Achats et Ventes de Livres d'Occasions
        </p>
      </div>
      <header className="flex justify-between items-center pt-2">
        <div className="pl-5 w-3/12 justify-start">
          <a href="#" aria-label="Menu" id="menu" className="">
            <i className="bx bx-menu text-2xl text-emerald-700"></i>
          </a>
        </div>
        <div className="flex-1 flex justify-center w-6/12">
          <h1 className="text-3xl text-emerald-600 max-sm:text-xl">BookMarket</h1>
        </div>

        <div className="pr-5 w-3/12 flex justify-end">
          {user ? (
            <div className="flex items-center gap-2">
              {user.prenom && <span>Bonjour {user.prenom}</span>}
              {user.type === 'vendeur' && (
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                  Vendeur
                </span>
              )}
            </div>
          ) : (
            <a href="/auth" className="text-emerald-600 hover:underline">
              Se connecter / S'inscrire
            </a>
          )}
        </div>

      </header>
      <MenuIcon />
    </>
  );
}

export default Header;