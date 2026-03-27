import { useState } from "react";
import Input from "../components/Input/Input";
import Snackbar from "../components/Snackbar/Snackbar";
import { searchNasaContent } from "../services/nasaService";
import MediaCard from "../components/MediaCard/MediaCard";
import "./SearchPage.css";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await searchNasaContent(query);
      setResults(data.collection?.items || []);
    } catch (error) {
      setError("No se pudieron obtener resultados", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="search-page">
      <h1 className="search-page__title">Buscar imágenes NASA</h1>
    <div className="search-page__form">  
      <Input
        id="search"
        name="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Ej: moon, mars, apollo"
      /></div>
 <div className="search-page__form">  
      <button className="search-page__button"
      type="button" onClick={handleSearch} disabled={loading}>
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
