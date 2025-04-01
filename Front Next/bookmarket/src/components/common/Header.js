'use client';
import { MenuIcon } from "../icons";
import { useAuth } from "@/components/auth/AuthContext";
import { useState, useEffect } from "react";


function Header() {

  const { user, loading } = useAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Forcer le re-render une fois que le user est chargé
    if (!loading) {
      setHydrated(true);
    }
  }, [loading]);

 if (!hydrated) {
  return (
    <div className="text-center text-sm text-gray-500 p-2">Chargement...</div>
  );
}



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