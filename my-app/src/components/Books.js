// src/components/Books.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/books')
      .then(response => {
        setBooks(response.data); // Mettre les livres récupérés dans le state
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des livres :", error);
      });
  }, []);

  return (
    <div>
      {books && books.totalItems ? (
        books.member.map(book => (
          <BookCard key={book.id} book={book} /> // Passer chaque livre en props à BookCard
        ))
      ) : (
        <p>Aucun livre trouvé.</p>
      )}
    </div>
  );
};

export default Books;
