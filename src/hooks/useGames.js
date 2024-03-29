import { useState, useEffect } from "react";
import axios from "axios";

const useGames = (initialSearchTerm) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const apiKey = "d5ee9bfaa32d43269bfd100f16a7e979";
  const apiUrl = "https://api.rawg.io/api/games";
  const localStorageKey = "cachedGames";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data exists in local storage
        const cachedData = localStorage.getItem(localStorageKey);

        if (cachedData) {
          setGames(JSON.parse(cachedData));
          setLoading(false);
        } else {
          setLoading(true);
          setError(null);
          const response = await axios.get(apiUrl, {
            params: {
              key: apiKey,
              search: searchTerm,
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey, apiUrl, searchTerm, localStorageKey]);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return { games, loading, error, searchTerm, handleSearchChange };
};

export default useGames;
