import { useNavigate, useSearchParams } from "react-router-dom";
import Snackbar from "../components/Snackbar/Snackbar";
import MediaCard from "../components/MediaCard/MediaCard";
import Loading from "../components/Loading/Loading";
import SearchForm from "../components/SearchForm/SearchForm";
import { useNasaSearch } from "../hooks/useNasaSearch";
import "./SearchPage.css";
import Skeleton from "../components/Skeleton/Skeleton";

function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";

  const {
    query,
    results,
    loading,
    error,
    hasSearched,
    handleChange,
  } = useNasaSearch(queryFromUrl);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    const trimmedValue = query.trim();

    if (!trimmedValue) return;

    setSearchParams({ q: trimmedValue });
  };

  return (
    <main className="search-page">
      <div className="search-page__header">
        <h1 className="search-page__title">Buscar imágenes NASA</h1>

        <button
          type="button"
          className="theme-button"
          onClick={handleGoBack}
        >
          ← Volver
        </button>
      </div>

      <SearchForm
        value={query}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {loading && <Loading message="Buscando contenido de NASA..." />}

      <Snackbar message={error} type="error" isVisible={Boolean(error)} />

      {!loading && hasSearched && results.length === 0 && !error && (
        <p className="search-page__empty">No se encontraron resultados.</p>
      )}

      {results.length > 0 && (
        <section className="search-page__results">

          {results.map((item) => {
            const data = item.data?.[0];

            return (
              <MediaCard
                key={data?.nasa_id}
                title={data?.title || "Sin título"}
                subtitle={data?.date_created || ""}
                description={data?.description || "Sin descripción"}
                mediaUrl={item.links?.[0]?.href || ""}
                mediaType={data?.media_type || ""}
              />
            );
          })}
        </section>
      )}
    </main>
  );
}

export default SearchPage;