import { useState, useEffect } from "react";
import axios from "axios";

const usePlatform = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "d5ee9bfaa32d43269bfd100f16a7e979";
  const apiUrl = "https://api.rawg.io/api/platforms";
  const storageKey = "platformsData";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data exists in local storage
        const storedData = localStorage.getItem(storageKey);

        if (storedData) {
          setGames(JSON.parse(storedData));
          setLoading(false);
        } else {
          const response = await axios.get(apiUrl, {
            params: {
              key: apiKey,
            },
          });

          // Save data to local storage
          localStorage.setItem(
            storageKey,
            JSON.stringify(response.data.results)
          );
          setGames(response.data.results);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey, apiUrl, storageKey]);

  return { games, loading, error };
};

export default usePlatform;
