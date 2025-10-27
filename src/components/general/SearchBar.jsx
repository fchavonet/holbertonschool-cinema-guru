import "./general.css";

function SearchBar({ title, setTitle, className = "", placeholder = "Search…" }) {
  function handleInput(event) {
    setTitle(event.target.value);
  }

  return (
    <div className={`search ${className}`}>
      <input className="" type="text" value={title} onChange={handleInput} placeholder={placeholder} aria-label="Search by title" />
    </div>
  );
}

export default SearchBar;
