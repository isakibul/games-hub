import React, { useState, useEffect, useContext } from "react";
import useGames from "../hooks/useGames";
import MyContext from "../context/MyContext";
import useGenre from "../hooks/useGenre";

const GameList = () => {
    const [games, setGames] = useState([]);
    const { games: fetchedGames, loading, error } = useGames();
    const { games: genreList, loading: genreLoading, error: genreError } = useGenre();

    const { genre: selectedGenre, setGenre, search } = useContext(MyContext);

    useEffect(() => {
        if (!loading && !error) {
            let filteredGames = fetchedGames;

            if (selectedGenre && selectedGenre.id) {
                filteredGames = filteredGames.filter(game =>
                    game && game.genres && game.genres.some(g => g && g.id === selectedGenre.id)
                );
            }

            if (search) {
                filteredGames = filteredGames.filter(game =>
                    game.name.toLowerCase().includes(search.toLowerCase())
                );
            }

            setGames(filteredGames);
        }
    }, [fetchedGames, loading, error, selectedGenre, search]);

    const handleGenreChange = (event) => {
        const selectedGenreId = event.target.value;
        const selectedGenreObject = genreList.find(genre => genre.id === selectedGenreId);

        setGenre(selectedGenreObject);

        let filteredGames = fetchedGames;

        if (selectedGenreObject && selectedGenreObject.id) {
            filteredGames = filteredGames.filter(game =>
                game && game.genres && game.genres.some(g => g && g.id === selectedGenreObject.id)
            );
        }

        if (search) {
            filteredGames = filteredGames.filter(game =>
                game.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setGames(filteredGames);
    };

    return (
        <div className="md:ml-[250px]">
            <h2 className="text-3xl font-bold mb-2 ms-3">
                {selectedGenre ? `Game List of ${selectedGenre.name}` : "Game List"}
            </h2>

            <select
                name=""
                id=""
                className="bg-transparent w-[200px] py-2 border ms-3 mb-3"
                value={selectedGenre ? selectedGenre.id : ""}
                onChange={handleGenreChange}
            >
                <option value="" className="text-gray-800">All Genre</option>
                {genreList.map((genre) => (
                    <option key={genre.id} value={genre.id} className="text-gray-800">{genre.name}</option>
                ))}
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 cursor-pointer">
                {Array.isArray(games) ? (
                    games.map((game, idx) => (
                        <div key={idx} className="mb-10 mx-3 border shadow-lg rounded-sm">
                            <img src={game.background_image} alt="game_image" className="w-[500px]" />
                            <div className="p-2">
                                <p className="font-bold text-xl my-2">{game.name}</p>
                                <p>{game.released}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No games available</p>
                )}
            </div>
        </div>
    );
};

export default GameList;
