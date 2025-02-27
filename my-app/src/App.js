import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  console.log(books);
  

  // Utiliser useEffect pour récupérer les livres de l'API
  useEffect(() => {
    axios.get('http://localhost:8000/api/books') // Remplace par l'URL de ton API
      .then(response => {
        setBooks(response.data); // Mettre les livres récupérés dans le state
        console.log(response.data);
        
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des livres :", error);
      });
  }, []); // L'array vide [] indique que l'effet se lance une seule fois, au montage du composant

  return (
    <div>
      <h1>Liste des livres</h1>
      <ul>
        {books.totalItems ? (
          books.member.map(book => (
            <li key={book.id}>{book.title} - {book.auteur.name}</li>
          ))
        ) : (
          <p>Aucun livre trouvé.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
