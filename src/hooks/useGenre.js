import { useState, useEffect } from "react";
import axios from "axios";

const useGenre = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "d5ee9bfaa32d43269bfd100f16a7e979";
  const apiUrl = "https://api.rawg.io/api/genres";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            key: apiKey,
          },
        });
        setGames(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey, apiUrl]);

  return { games, loading, error };
};

export default useGenre;
