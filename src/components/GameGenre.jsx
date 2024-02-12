import { useState, useEffect } from "react";
import useGenre from "../hooks/useGenre";

const GameGenre = () => {
    const [genreList, setGenreList] = useState([]);
    const { games, loading, error } = useGenre();

    useEffect(() => {
        // Update the state only if games are fetched successfully
        if (!loading && !error) {
            setGenreList(games);
        }
    }, [games, loading, error]);

    return (
        <div className="hidden md:block pr-5 max-h-screen overflow-y-auto fixed pb-20">
            <p className="text-3xl font-bold mb-2">Genre</p>
            {genreList.map((genre, idx) => (
                <div
                    key={idx}
                    className="flex gap-2 items-center mb-3 cursor-pointer"
                >
                    <img
                        src={genre.image_background}
                        alt="genre_image"
                        className="h-8 w-8 rounded-full"
                    />
                    <p className="font-semibold hover:underline">{genre.name}</p>
                </div>
            ))}
        </div>
    );
};

export default GameGenre;