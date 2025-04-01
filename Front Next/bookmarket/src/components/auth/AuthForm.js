"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthContext";

const AuthForm = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const [isVendeur, setIsVendeur] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nom: "",
    prenom: "",
    type: "user",
    nomEntreprise: "",
    adresseEntreprise: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({
      email: "",
      password: "",
      nom: "",
      prenom: "",
      type: "user",
      nomEntreprise: "",
      adresseEntreprise: "",
    });
    setIsVendeur(false); // Réinitialiser le statut vendeur
    setError(null); // Réinitialiser l'erreur
  };

  const handleVendeurChange = (e) => {
    const value = e.target.value;
    setIsVendeur(value === "vendeur");
    setFormData((prevData) => ({
      ...prevData,
      type: value,
      nomEntreprise: "", // Réinitialiser nomEntreprise et adresseEntreprise si le type change
      adresseEntreprise: "",
    }));
  };

  // Fonction pour configurer un cookie sécurisé
  const setSecureCookie = (token) => {
    // Configuration du cookie avec des options de sécurité
    Cookies.set("auth_token", token, {
      expires: 7, // Expire après 7 jours
      secure: process.env.NODE_ENV === "production", // Utilise HTTPS en production
      sameSite: "strict", // Protection contre les attaques CSRF
      path: "/", // Disponible sur tout le site
      httpOnly: false, // HttpOnly ne peut pas être défini côté client, sera géré par le serveur
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = isSignUp ? "/register" : "/login_check";
      const payload = isSignUp
        ? {
            email: formData.email,
            password: formData.password,
            nom: formData.nom,
            prenom: formData.prenom,
            type: formData.type,
            ...(formData.type === "vendeur" && {
              nomEntreprise: formData.nomEntreprise,
              adresseEntreprise: formData.adresseEntreprise,
            }),
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const config = {
        headers: {
          Accept: isSignUp ? "application/ld+json" : "application/json",
          "Content-Type": isSignUp ? "application/ld+json" : "application/json",
        },
      };

      const response = await api.post(endpoint, payload, config);

      if (isSignUp) {
        setSuccessMessage("Inscription réussie ! Connectez-vous maintenant.");
        setIsSignUp(false);
      } else {
        const token = response.data.token;
        setSecureCookie(token);

        // Décoder le token et mettre à jour le contexte immédiatement
        const decoded = jwtDecode(token);
        setUser({
          email: decoded.email,
          prenom: decoded.prenom,
          nom: decoded.nom,
          type: decoded.type,
        });

        // Rediriger vers la page principale

        router.push("/");
       
      }
    } catch (error) {
      setError(
        error.response?.data?.["hydra:description"] ||
          error.response?.data?.message ||
          `Erreur lors de ${isSignUp ? "l'inscription" : "la connexion"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 m-7 rounded-2xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">
        {isSignUp ? "Inscription" : "Connexion"}
      </h2>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      {successMessage && (
        <div className="text-green-500 text-sm">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {isSignUp && (
          <>
            <div>
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700">Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleVendeurChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="user">Utilisateur</option>
                <option value="vendeur">Vendeur</option>
              </select>
            </div>

            {isVendeur && (
              <>
                <div>
                  <label className="block text-gray-700">
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    name="nomEntreprise"
                    value={formData.nomEntreprise}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">
                    Adresse de l'entreprise
                  </label>
                  <input
                    type="text"
                    name="adresseEntreprise"
                    value={formData.adresseEntreprise}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>
              </>
            )}
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-400 disabled:opacity-50"
        >
          {isLoading
            ? "Chargement..."
            : isSignUp
            ? "S'inscrire"
            : "Se connecter"}
        </button>
      </form>

      <button
        onClick={handleSwitchMode}
        className="w-full text-emerald-600 hover:underline text-center"
      >
        {isSignUp
          ? "Déjà inscrit ? Connectez-vous"
          : "Pas encore inscrit ? Créez un compte"}
      </button>
    </div>
  );
};

export default AuthForm;
