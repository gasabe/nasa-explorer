import "./HomePage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchApod } from "../hooks/useFetchApod";
import { useTheme } from "../hooks/useTheme";
import MediaCard from "../components/MediaCard/MediaCard";
import Skeleton from "../components/Skeleton/Skeleton";
import SearchForm from "../components/SearchForm/SearchForm";

function HomePage() {
  const { data, loading, error } = useFetchApod();
  const { theme, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) return;

    navigate(`/search?q=${encodeURIComponent(trimmedValue)}`);
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
          <SearchForm
            value={searchValue}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            buttonText="Buscar"
          />
        </div>
      </section>

      <section className="home-page__content">
        {loading && <Skeleton />}

        {!loading && error && (
          <div className="home-page__message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && data && (
          <MediaCard
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