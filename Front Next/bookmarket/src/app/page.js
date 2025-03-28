"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/books") // Remplace "/books" par ton endpoint API
      .then((response) => {
        // Accéder à la clé "member" dans la réponse
        const books = response.data.member || []; // Si "member" existe, c'est un tableau de livres
        setData(books);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);
  
  return (
    <div>
      <h1>Liste des livres</h1>
      <ul>
        {Array.isArray(data) ? (
          data.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              {/* Affiche d'autres propriétés comme 'prix', 'auteur', etc. */}
            </li>
          ))
        ) : (
          <p>Aucune donnée disponible.</p>
        )}
      </ul>
    </div>
  );
  
}
