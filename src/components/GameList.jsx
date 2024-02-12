import React, { useState, useEffect } from "react";
import useGames from "../hooks/useGames";

const GameList = () => {
    const [games, setGames] = useState([]);
    const { games: fetchedGames, loading, error } = useGames();

    useEffect(() => {
        if (!loading && !error) {
            setGames(fetchedGames);
        }
    }, [fetchedGames, loading, error]);

    console.log(games);

    return (
        <div className="md:ml-[250px]">
            <h2 className="text-3xl font-bold mb-2">GameList</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 cursor-pointer">
                {Array.isArray(games) ? (
                    games.map((game, idx) => (
                        <div key={idx} className="mb-10 mx-3 border bg-white shadow-lg">
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
