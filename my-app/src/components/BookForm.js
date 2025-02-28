// src/components/BookForm.js

import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageUrl(response.data.image_url); // Utiliser l'URL retournée par l'API
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Envoyer l'image</button>
      </form>

      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default BookForm;
