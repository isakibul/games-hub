import React, { useContext } from "react";
import useGenre from "../hooks/useGenre";
import MyContext from "../context/MyContext";

const GameGenre = () => {
    const { games: genres, loading: genreLoading, error: genreError } = useGenre();

    const { setGenre } = useContext(MyContext);

    const handleGenreClick = (genre) => {
        setGenre(genre);
    };

    return (
        <div className="hidden md:block pr-5 max-h-screen overflow-y-auto fixed pb-20">
            <p className="text-3xl font-bold mb-2">Genre</p>
            {genreLoading && <p>Loading genres...</p>}
            {genreError && <p>Error loading genres.</p>}
            {genres.map((genre, idx) => (
                <div
                    key={idx}
                    className="flex gap-2 items-center mb-3 cursor-pointer"
                    onClick={() => handleGenreClick(genre)}
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
