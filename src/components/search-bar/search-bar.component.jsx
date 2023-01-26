import React, { useState, useEffect } from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="pokemon name"
      />
      <button type="button">Search</button>
    </div>
  );
};
export default SearchBar;
