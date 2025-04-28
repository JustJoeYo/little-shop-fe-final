import { useState, useEffect } from "react";
import { fetchData } from "../services/api";

export function useFetch(endpoint, showStatus) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchData(endpoint)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching ${endpoint}:`, error);
        setError(
          `Failed to load ${endpoint.split("/").pop()}. Please try again later.`
        );
        setLoading(false);
        if (showStatus)
          showStatus(`Error loading ${endpoint.split("/").pop()}!`, false);
      });
  }, [endpoint, showStatus]);

  return { data, setData, loading, error };
}
