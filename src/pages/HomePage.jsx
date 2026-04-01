import "./HomePage.css";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetchApod } from "../hooks/useFetchApod"
import { useTheme } from "../hooks/useTheme"
import { useNasaSearch } from "../hooks/useNasaSearch"
import MediaCard from "../components/MediaCard/MediaCard"
import Skeleton from "../components/Skeleton/Skeleton"
import SearchForm from "../components/SearchForm/SearchForm"

function HomePage() {
  const { data, loading: apodLoading, error: apodError } = useFetchApod();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const {
    query, 
    results, 
    loading: searchLoading, 
    error: searchError, 
    hasSearched, // true después del primer fetch
    handleChange, // cambia el query y dispara debounce
  } = useNasaSearch();

  const [showDropdown, setShowDropdown] = useState(false); // visibilidad 

  const handleSearchSubmit = () => {
    const trimmedValue = query.trim();

    if (!trimmedValue) return; // no navegamos con vacio

    navigate(`/search?q=${encodeURIComponent(trimmedValue)}`);
    setShowDropdown(false); 
  };

  const handleResultClick = (result) => {
    const searchQuery = result.data?.[0]?.title || query
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    setShowDropdown(false);
  };

  const handleApodClick = () => {
    if (!data) return;

    navigate("/detail/apod", {
      state: { apodData: data },
    });
  };

  return (
    <main className="home-page">
      <section className="home-page__hero">
        <div className="home-page__hero-header">
          <div>
            <h1 className="home-page__title">NASA Explorer App</h1>
            <p className="home-page__subtitle">
              Explorá la imagen astronómica del día
            </p>
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="home-page__intro">
          <div className="search-container">
            <SearchForm
              value={query} 
              onChange={(e) => {
                handleChange(e); // actualiza query + debounce
                setShowDropdown(true); // show dropdown al escribir
              }}
              onSubmit={handleSearchSubmit} 
              loading={searchLoading} 
              buttonText="Buscar"
              placeholder="Ej: moon, mars, apollo"
            />

            {showDropdown && hasSearched && results.length > 0 && (
              <ul className="search-dropdown">
                {results.slice(0, 5).map((item) => {
                  const data = item.data?.[0];
                  return (
                    <li
                      key={data?.nasa_id}
                      className="search-dropdown__item"
                      onClick={() => handleResultClick(item)} 
                    >
                      <img
                        src={item.links?.[0]?.href}
                        alt={data?.title}
                        className="search-dropdown__image"
                      />
                      <div className="search-dropdown__content">
                        <h4>{data?.title || "Sin título"}</h4>
                        <p>{data?.date_created || ""}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {showDropdown &&
              hasSearched &&
              results.length === 0 &&
              !searchLoading && (
                <p className="search-dropdown__no-results">
                  No se encontraron resultados.
                </p>
              )}

            {showDropdown && searchError && (
              <p className="search-dropdown__error">{searchError}</p>
            )}
          </div>
        </div>
      </section>

      <section className="home-page__content">
        {apodLoading && <Skeleton />}

        {!apodLoading && apodError && (
          <div className="home-page__message">
            <p>{apodError}</p>
          </div>
        )}

        {!apodLoading && !apodError && data && (
          <MediaCard
            isClickable
            onClick={handleApodClick}
            title={data.title}
            subtitle={data.date}
            description={data.explanation}
            mediaUrl={data.url}
            mediaType={data.media_type}
          />
        )}
      </section>
    </main>
  );
}

export default HomePage;
