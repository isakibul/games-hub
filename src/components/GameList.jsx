import React, { useState, useEffect, useContext } from "react";
import useGames from "../hooks/useGames";
import MyContext from "../context/MyContext";
import useGenre from "../hooks/useGenre";
import GameDetailsModal from "./GameDetailsModal";
import { CiPlay1 } from "react-icons/ci";
import usePlatform from "../hooks/usePlatform";

const GameList = () => {
    // State variables
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState("");

    // Custom hooks for fetching data
    const { games: fetchedGames, loading: gameLoading, error: gameError } = useGames();
    const { games: genreList, loading: genreLoading, error: genreError } = useGenre();
    const platforms = usePlatform();

    // Context for genre and search
    const { genre: selectedGenre, search } = useContext(MyContext);

    useEffect(() => {
        // Function to filter games based on selected criteria
        const filterGames = () => {
            let filteredGames = fetchedGames;
            console.log("games:", filteredGames);

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

            if (selectedPlatform) {
                filteredGames = filteredGames.filter(game =>
                    game.platforms && game.platforms.some(platform => platform.platform.name === selectedPlatform)
                );
            }

            setGames(filteredGames);
        };

        if (!gameLoading && !gameError) {
            filterGames();
        }
    }, [fetchedGames, gameLoading, gameError, selectedGenre, search, selectedPlatform]);

    // Event handler for platform selection change
    const handlePlatformChange = (event) => {
        setSelectedPlatform(event.target.value);
    };

    // Event handlers for opening and closing the modal
    const openGameDetailsModal = (game) => {
        setSelectedGame(game);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeGameDetailsModal = () => {
        setSelectedGame(null);
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="md:ml-[250px]">
            <h2 className="text-3xl font-bold mb-2 ms-3">
                {selectedGenre ? `Game List of ${selectedGenre.name}` : "Game List"}
            </h2>

            {/* Platform selection dropdown */}
            <select
                name="platform"
                id="platform"
                className="bg-transparent w-[300px] p-2 border ms-3 mb-3"
                value={selectedPlatform}
                onChange={handlePlatformChange}
            >
                <option value="" className="text-gray-800">All Platforms</option>
                {platforms.games.map((game) => (
                    <option key={game.id} value={game.name} className="text-gray-800">
                        {game.name}
                    </option>
                ))}
            </select>

            {/* Loading and error messages */}
            {gameLoading && <p className="text-xl ms-2">Loading games...</p>}
            {gameError && <p className="text-xl ms-2">Error loading games.</p>}

            {/* Display games */}
            {!gameLoading && !gameError && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 cursor-pointer">
                    {Array.isArray(games) && games.length > 0 ? (
                        games.map((game, idx) => (
                            <div key={idx} className="mb-10 mx-3 border shadow-lg rounded-sm" onClick={() => openGameDetailsModal(game)}>
                                <img
                                    src={game.background_image}
                                    alt="game_image"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-2">
                                    <div className="flex justify-between">
                                        <p className="font-bold text-xl my-2">{game.name}</p>
                                        <p className="flex items-center gap-1">
                                            <CiPlay1 />
                                            <span>{game.playtime}</span>
                                        </p>
                                    </div>
                                    <p>{game.released}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-xl ms-3">No games available</p>
                    )}
                </div>
            )}

            {/* Game details modal */}
            {selectedGame && (
                <GameDetailsModal
                    game={selectedGame}
                    onClose={closeGameDetailsModal}
                />
            )}
        </div>
    );
};

export default GameList;
