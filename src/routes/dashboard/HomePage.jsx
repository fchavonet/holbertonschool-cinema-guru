import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Filter from "../../components/movies/Filter";
import MovieCard from "../../components/movies/MovieCard";
import Button from "../../components/general/Button";

import "./dashboard.css";

export default function HomePage() {
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const moviesPerPage = 15;

  const token = localStorage.getItem("accessToken");

  const loadMovies = useCallback(async () => {
    if (!token) return;

    try {
      const params = {
        minYear: Number(minYear) || 1970,
        maxYear: Number(maxYear) || 2022,
        sort,
        title,
      };

      if (genres.length > 0) {
        params.genres = genres.join(",");
      }

      const queryString = new URLSearchParams(params).toString();
      const url = `http://localhost:8000/api/titles/advancedsearch?${queryString}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const results = response.data.titles || [];
      setAllMovies(results);
      setDisplayedMovies(results.slice(0, moviesPerPage));
      setPage(1);
    } catch (error) {
      console.error(error.message);
    }
  }, [token, minYear, maxYear, sort, title, genres]);

  const loadUserLists = useCallback(async () => {
    if (!token) return;

    try {
      const [favRes, wlRes] = await Promise.all([
        axios.get("http://localhost:8000/api/titles/favorite/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/titles/watchlater/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      
      setFavorites(favRes.data);
      setWatchLater(wlRes.data);
    } catch (error) {
      console.error(error.message);
    }
  }, [token]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    loadUserLists();
  }, [loadUserLists]);

  function handleLoadMore() {
    const nextPage = page + 1;
    const start = 0;
    const end = nextPage * moviesPerPage;

    setDisplayedMovies(allMovies.slice(start, end));
    setPage(nextPage);
  }

  return (
    <div className="dashboard-page">
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />

      <ul className="movies-list">
        {displayedMovies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={favorites}
              watchLater={watchLater}
              refreshLists={loadUserLists}
            />
          ))
        )}
      </ul>

      {displayedMovies.length < allMovies.length && (
        <div className="load-more">
          <Button label="Load More..." onClick={handleLoadMore} />
        </div>
      )}
    </div>
  );
}
