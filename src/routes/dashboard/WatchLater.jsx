import { useState, useEffect } from "react";

import axios from "axios";

import MovieCard from "../../components/movies/MovieCard";

import "./dashboard.css";

function WatchLater() {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchWatchLater() {
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8000/api/titles/watchlater/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMovies(response.data || []);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchWatchLater();
  }, [token]);

  return (
    <div className="dashboard-page">
      <div className="title-container">
        <h2>Movies to watch later</h2>
      </div>

      <ul className="movies-list">
        {movies.length === 0 ? (
          <p>No movies in your watch later list.</p>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={[]}
              watchLater={movies}
              refreshLists={() => { }}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default WatchLater;