// src/App.js
import React from 'react';
import './App.css';
import Books from './components/Books'; // Importer Books ici

function App() {
  return (
    <div>
      <h1>Ma Bibliotheque</h1>
      <Books /> 
    </div>
  );
}

export default App;
