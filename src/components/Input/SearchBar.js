import React, { useEffect } from "react";

function SearchBar({ searchText, styleClass, placeholderText, setSearchText }) {
  const updateSearchInput = (value) => {
    setSearchText(value);
  };

  return (
    <input
      type="search"
      value={searchText}
      placeholder={placeholderText || "Search"}
      onChange={(e) => updateSearchInput(e.target.value)}
      className="input input-sm input-bordered w-full"
    />
  );
}

export default SearchBar;
