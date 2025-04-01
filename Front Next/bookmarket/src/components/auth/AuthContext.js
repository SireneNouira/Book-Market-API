"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/utils/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("auth_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Décoder le token pour récupérer les infos de base
        const decoded = jwtDecode(token);
        setUser({
          email: decoded.email,
          prenom: decoded.prenom,
          nom: decoded.nom,
          type: decoded.type
        });

        // Requête pour récupérer les détails complets de l'utilisateur
        const response = await api.get("/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data);
      } catch (error) {
        console.error("Erreur de récupération de l'utilisateur:", error);
        Cookies.remove("auth_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
