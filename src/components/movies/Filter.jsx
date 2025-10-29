import SearchBar from "../general/SearchBar";
import Input from "../general/Input";
import SelectInput from "../general/SelectInput";
import Tag from "./Tag";

import "./movies.css";

function Filter({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle,
}) {
  const genreList = [
    "Action",
    "Drama",
    "Comedy",
    "Biography",
    "Romance",
    "Thriller",
    "War",
    "History",
    "Sport",
    "Sci-Fi",
    "Documentary",
    "Crime",
    "Fantasy",
  ];

  return (
    <div className="filters-container">
      <div className="filter-container">
        <SearchBar title={title} setTitle={setTitle} />

        <div className="filter-inputs-container">
          <Input
            className="filter-input"
            label="Min Date:"
            type="number"
            value={minYear}
            setValue={setMinYear}
            inputAttributes={{ min: 1900, max: 2100 }}
          />

          <Input
            className="filter-input"
            label="Max Date:"
            type="number"
            value={maxYear}
            setValue={setMaxYear}
            inputAttributes={{ min: 1900, max: 2100 }}
          />

          <SelectInput
            className="select-input"
            label="Sort"
            value={sort}
            setValue={setSort}
            options={["latest", "oldest", "highestrated", "lowestrated"]}
          />
        </div>
      </div>

      <ul className="tags-container">
        {genreList.map((genre) => (
          <Tag
            key={genre}
            genre={genre}
            filter={true}
            genres={genres}
            setGenres={setGenres}
          />
        ))}
      </ul>
    </div>
  );
}

export default Filter;