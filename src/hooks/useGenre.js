import { useState, useEffect } from "react";
import axios from "axios";

const useGenre = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "d5ee9bfaa32d43269bfd100f16a7e979";
  const apiUrl = "https://api.rawg.io/api/genres";
  const localStorageKey = "cachedGenres";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data exists in local storage
        const cachedData = localStorage.getItem(localStorageKey);

        if (cachedData) {
          setGames(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await axios.get(apiUrl, {
            params: {
              key: apiKey,
            },
          });
          setGames(response.data.results);
          // Save data to local storage
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(response.data.results)
          );
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey, apiUrl, localStorageKey]);

  return { games, loading, error };
};

export default useGenre;
