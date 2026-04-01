import { useEffect, useState, useCallback } from "react";
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

  const executeSearch = useCallback(async (searchValue) => {
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
  }, []);

  useEffect(() => {
    setQuery(initialQuery);

    if (initialQuery.trim()) {
      executeSearch(initialQuery);
    } else {
      setResults([]);
      setHasSearched(false);
      setError("");
    }
  }, [initialQuery, executeSearch]);

  // Búsqueda automática con debounce mientras se escribe
  useEffect(() => {
    if (query && query !== initialQuery) {
      const timeoutId = setTimeout(() => {
        executeSearch(query);
      }, 500); // 500ms debounce

      return () => clearTimeout(timeoutId);
    }
  }, [query, initialQuery, executeSearch]);

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