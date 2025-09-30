import "./styles.css";

const SearchBar = ({ onSubmit }) => {
  return (
    <form className="form-search" onSubmit={onSubmit}>
      <label className="search-bar">
        <input name="search-input" type="text" placeholder="Digite a cidade" />
        <button type="submit">
          <img src="./search.svg" alt="ícone de busca" />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
