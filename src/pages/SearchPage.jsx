import { useState } from "react";
import Input from "../components/Input/Input";
import Snackbar from "../components/Snackbar/Snackbar";
import { searchNasaContent } from "../services/nasaService";
import MediaCard from "../components/MediaCard/MediaCard";
import "./SearchPage.css";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await searchNasaContent(query);
      setResults(data.collection?.items || []);
      setHasSearched(true);
    } catch (error) {
      setError("No se pudieron obtener resultados", error);
      setResults([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
    setHasSearched(false);
  };

  return (
    <main className="search-page">

      <div className="search-page_header">
      <h1 className="search-page__title">Buscar imágenes NASA</h1>

      <button
        type="button"
        className="theme-button"
        onClick={handleGoBack}
      >
        ← Volver
      </button>
</div>
      <div className="search-page__form">
        <Input
          id="search"
          name="search"
          value={query}
          onChange={handleChange}
          placeholder="Ej: moon, mars, apollo"
        />
      </div>

      <div className="search-page__form">
        <button
          className="search-page__button"
          type="button"
          onClick={handleSearch}
          disabled={loading || !query.trim() || hasSearched}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      <Snackbar message={error} type="error" isVisible={Boolean(error)} />

      {results.length > 0 && (
        <section className="search-page__results">
          {results.map((item) => {
            const data = item.data?.[0];

            return (
              <MediaCard
                key={data?.nasa_id}
                title={data?.title || "Sin título"}
                date={data?.date_created || ""}
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
