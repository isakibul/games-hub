import React, { useContext, useState } from "react";
import useGenre from "../hooks/useGenre";
import MyContext from "../context/MyContext";

const GameGenre = () => {
    // Fetching genres using custom hook
    const { games: genres, loading: genreLoading, error: genreError } = useGenre();

    const { genre: selectedGenre, setGenre } = useContext(MyContext);
    const [activeGenreIndex, setActiveGenreIndex] = useState(null);

    // Event handler for genre selection
    const handleGenreClick = (genre, index) => {
        setGenre(genre);
        setActiveGenreIndex(index);
    };

    return (
        <div className="hidden md:block pr-5 max-h-screen overflow-y-auto fixed pb-20">
            <p className="text-3xl font-bold mb-2">Genre</p>
            {/* Loading and error messages */}
            {genreLoading && <p>Loading genres...</p>}
            {genreError && <p>Error loading genres.</p>}

            {genres.map((genre, idx) => (
                <div
                    key={idx}
                    className={`flex gap-2 items-center mb-1 cursor-pointer ${activeGenreIndex === idx ? 'bg-gray-400' : ''} p-1 rounded-sm`}
                    onClick={() => handleGenreClick(genre, idx)}
                >
                    {/* Genre image */}
                    <img
                        src={genre.image_background}
                        alt="genre_image"
                        className="h-8 w-8 rounded-full"
                    />
                    {/* Genre name with hover effect */}
                    <p className={`font-semibold hover:underline`}>
                        {genre.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default GameGenre;
