import { useEffect, useState } from "react";
import { getApod } from "../services/nasaService";

export function useFetchApod() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchApod() {
      try {
        setLoading(true);
        setError("");

        const result = await getApod();

        if (active) {
          setData(result);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Ocurrió un error al cargar APOD");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchApod();

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}