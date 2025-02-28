// src/components/BookCard.js
import React from 'react';

const BookCard = ({ book }) => {
   // Construire l'URL complète de l'image
  const imageUrl = `http://localhost:8000//uploads/${book.image}`

  return (
    <div className="book-list">
    <div className="book-card">
        <img src={imageUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>Auteur: {book.auteur.name}</p>
      <p>Description: {book.description}</p>
      <p>Prix: {book.price}€</p>
    </div>
    </div>
  );
};

export default BookCard;
