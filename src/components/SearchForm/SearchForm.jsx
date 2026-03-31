import Input from "../Input/Input";
import "./SearchForm.css";

function SearchForm({
  value,
  onChange,
  onSubmit,
  loading = false,
  buttonText = "Buscar",
  placeholder = "Ej: moon, mars, apollo",
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <Input
        id="search"
        name="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      <button
        className="theme-button"
        type="submit"
        disabled={loading || !value.trim()}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default SearchForm;