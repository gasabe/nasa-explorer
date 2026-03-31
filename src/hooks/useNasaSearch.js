import { useEffect, useState } from "react";
import { searchNasaContent } from "../services/nasaService";

export function useNasaSearch(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (event) => {
    setQuery(event.target.value);
    setError("");
    setHasSearched(false);
  };

  const executeSearch = async (searchValue = query) => {
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await searchNasaContent(trimmedValue);
      setResults(data.collection?.items || []);
      setHasSearched(true);
    } catch (err) {
      setError(err.message || "No se pudieron obtener resultados");
      setResults([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setQuery(initialQuery);

    if (initialQuery.trim()) {
      executeSearch(initialQuery);
    } else {
      setResults([]);
      setHasSearched(false);
      setError("");
    }
  }, [initialQuery]);

  return {
    query,
    results,
    loading,
    error,
    hasSearched,
    handleChange,
    executeSearch,
  };
}