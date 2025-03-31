"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';


const AuthForm = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const [isVendeur, setIsVendeur] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    type: 'user',
    nomEntreprise: '',
    adresseEntreprise: '',
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
      email: '',
      password: '',
      nom: '',
      prenom: '',
      type: 'user',
      nomEntreprise: '',
      adresseEntreprise: '',
    });
    setIsVendeur(false); // Réinitialiser le statut vendeur
    setError(null); // Réinitialiser l'erreur
  };

  const handleVendeurChange = (e) => {
    const value = e.target.value;
    setIsVendeur(value === 'vendeur');
    setFormData((prevData) => ({
      ...prevData,
      type: value,
      nomEntreprise: '', // Réinitialiser nomEntreprise et adresseEntreprise si le type change
      adresseEntreprise: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const endpoint = isSignUp ? '/register' : '/login_check';
      const payload = isSignUp ? {
        email: formData.email,
        password: formData.password,
        nom: formData.nom,
        prenom: formData.prenom,
        type: formData.type,
        ...(formData.type === 'vendeur' && {
          nomEntreprise: formData.nomEntreprise,
          adresseEntreprise: formData.adresseEntreprise
        })
      } : {
        email: formData.email,
        password: formData.password
      };
  
      // Configuration spécifique pour chaque endpoint
      const config = {
        headers: {
          'Accept': isSignUp ? 'application/ld+json' : 'application/json',
          'Content-Type': isSignUp ? 'application/ld+json' : 'application/json'
        }
      };
  
      const response = await api.post(endpoint, payload, config);
  
      if (isSignUp) {
        setSuccessMessage('Inscription réussie ! Connectez-vous maintenant.');
        setIsSignUp(false);
      } else {
        localStorage.setItem('token', response.data.token);
        router.push('/');
      }
    } catch (error) {
      setError(
        error.response?.data?.['hydra:description'] || 
        error.response?.data?.message || 
        `Erreur lors de ${isSignUp ? "l'inscription" : "la connexion"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isSignUp ? 'Inscription' : 'Connexion'}</h2>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {isSignUp && (
          <>
            <div>
              <label>Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleVendeurChange}
                required
              >
                <option value="user">Utilisateur</option>
                <option value="vendeur">Vendeur</option>
              </select>
            </div>

            {isVendeur && (
              <>
                <div>
                  <label>Nom de l'entreprise</label>
                  <input
                    type="text"
                    name="nomEntreprise"
                    value={formData.nomEntreprise}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label>Adresse de l'entreprise</label>
                  <input
                    type="text"
                    name="adresseEntreprise"
                    value={formData.adresseEntreprise}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
          </>
        )}

        <button type="submit">{isSignUp ? 'S\'inscrire' : 'Se connecter'}</button>
      </form>

      <button onClick={handleSwitchMode}>
        {isSignUp ? 'Déjà inscrit ? Connectez-vous' : 'Pas encore inscrit ? Créez un compte'}
      </button>
    </div>
  );
};

export default AuthForm;
