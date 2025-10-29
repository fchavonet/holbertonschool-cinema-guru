import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import unavailableImage from "../../assets/images/unavailable.png";
import "./movies.css";

function MovieCard({ movie, favorites, watchLater, refreshLists }) {
  const token = localStorage.getItem("accessToken");

  const isFavorite = favorites?.some((fav) => fav.imdbId === movie.imdbId);
  const isWatchLater = watchLater?.some((wl) => wl.imdbId === movie.imdbId);

  async function handleClick(type) {
    if (!token) return;

    const isActive = type === "favorite" ? isFavorite : isWatchLater;
    const method = isActive ? "delete" : "post";
    const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`;

    try {
      await axios({
        method,
        url,
        headers: { Authorization: `Bearer ${token}` },
      });

      refreshLists();
      window.dispatchEvent(new Event("activitiesUpdated"));
    } catch (error) {
      console.error(error.message);
    }
  }

  const title = movie.title || "Untitled";
  const genres = movie.genres || [];
  const synopsis = movie.synopsis || "No synopsis available.";

  return (
    <li className="movie-card">
      <div className="movie-header">
        <img
          className="movie-image"
          src={unavailableImage}
          alt="Movie poster"
          loading="lazy"
        />

        <h3 className="movie-title">
          <span className="movie-title-text">{title}</span>
        </h3>

        <div className="movie-icons">
          <FontAwesomeIcon
            icon={faStar}
            className={`movie-icon ${isFavorite ? "active" : ""}`}
            onClick={() => handleClick("favorite")}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          />

          <FontAwesomeIcon
            icon={faClock}
            className={`movie-icon ${isWatchLater ? "active" : ""}`}
            onClick={() => handleClick("watchlater")}
            title={isWatchLater ? "Remove from watch later" : "Watch later"}
          />
        </div>
      </div>

      <div className="movie-content">
        <p className="movie-synopsis">
          {synopsis.length > 120 ? synopsis.slice(0, 120) + "..." : synopsis}
        </p>

        <div className="movie-genres">
          {genres.length > 0 ? (
            genres.map((genre, index) => (
              <span key={index} className="movie-genre-tag">
                {genre}
              </span>
            ))
          ) : (
            <span className="movie-genre-tag no-genre">No genre</span>
          )}
        </div>
      </div>
    </li>
  );
}

export default MovieCard;
