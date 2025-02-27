import React, { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/books")
            .then(response => setBooks(response.data))
            .catch(error => console.error("Erreur:", error));
    }, []);

    return (
        <div>
            <h1>Liste des Livres</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>{book.title} - {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default Books;
