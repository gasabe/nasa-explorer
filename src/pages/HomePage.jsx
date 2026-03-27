import "./HomePage.css";
import { useFetchApod } from "../hooks/useFetchApod";
import MediaCard from "../components/MediaCard/MediaCard";
import Skeleton from "../components/Skeleton/Skeleton";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";

function HomePage() {
  const { data, loading, error } = useFetchApod();
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="home-page">
      <section className="home-page__hero">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Cambiar tema"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div className="home-page__intro">
          <h1 className="home-page__title">NASA Explorer App</h1>
          <p className="home-page__subtitle">
            Explorá la imagen astronómica del día
          </p>
          <Link to="/search">Ir a búsqueda</Link>
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
