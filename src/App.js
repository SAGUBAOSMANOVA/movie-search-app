import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movie, setMovie] = useState(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');


  const apiKey = '3d18a3be'; 
  const apiUrl = 'https://www.omdbapi.com/';

  
  const searchMovie = async (e) => {
    e.preventDefault();

    if (!query) return; 

    try {
      const response = await axios.get(apiUrl, {
        params: {
          t: query,
          apiKey: apiKey,
        },
      });

      if (response.data.Response === 'True') {
        setMovie(response.data);
        setError('');
      } else {
        setMovie(null);
        setError('Movie Not Found!');
      }
    } catch (err) {
      setError('An error occurred! Please try again.');
      setMovie(null);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <form onSubmit={searchMovie}>
        <input
          type="text"
          placeholder="Search by movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      {movie && (
        <div className="movie-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <img src={movie.Poster} alt={movie.Title} />
          <p><strong>Reyting:</strong> {movie.imdbRating}</p>
          <p><strong>Description:</strong> {movie.Plot}</p>
        </div>
      )}
    </div>
  );
}

export default App;
