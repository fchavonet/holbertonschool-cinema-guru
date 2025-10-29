import { useState, useEffect } from "react";

import axios from "axios";

import MovieCard from "../../components/movies/MovieCard";

import "./dashboard.css";

function Favorites() {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchFavorites() {
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8000/api/titles/favorite/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMovies(response.data || []);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchFavorites();
  }, [token]);

  return (
    <div className="dashboard-page">
      <div className="title-container">
        <h2>Movies you like</h2>
      </div>

      <ul className="movies-list">
        {movies.length === 0 ? (
          <p>No favorite movies found.</p>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={movies}
              watchLater={[]}
              refreshLists={() => { }}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default Favorites;