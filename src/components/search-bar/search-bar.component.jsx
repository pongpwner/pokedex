const SearchBar = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="search pokemon"
      />
    </div>
  );
};
export default SearchBar;
