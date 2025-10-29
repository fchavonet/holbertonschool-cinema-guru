import "./movies.css";

function Tag({ genre, filter, genres, setGenres }) {
  const selected = genres.includes(genre);

  function handleTag() {
    if (selected) {
      setGenres(genres.filter((g) => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  }

  return (
    <li
      className={`tag ${selected ? "selected" : ""} ${filter ? "filter" : ""}`}
      onClick={handleTag}
    >
      {genre}
    </li>
  );
}

export default Tag;