const SearchBar = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <input
        type="search"
        onChange={handleChange}
        value={search}
        placeholder="search pokemon"
      />
    </div>
  );
};
export default SearchBar;
