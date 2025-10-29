import "./general.css";

function SearchBar({ title, setTitle }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search movie..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
