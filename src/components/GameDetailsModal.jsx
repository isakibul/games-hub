import React, { useEffect } from "react";

const GameDetailsModal = ({ game, onClose }) => {
    useEffect(() => {
        // Event listener for clicking outside the modal
        const closeModalOnOutsideClick = (event) => {
            if (event.target.classList.contains("bg-black")) {
                onClose();
            }
        };

        document.addEventListener("click", closeModalOnOutsideClick);

        return () => {
            document.removeEventListener("click", closeModalOnOutsideClick);
        };
    }, [onClose]);

    return (
        // Modal with overlay
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            {/* Modal content */}
            <div className="p-4 rounded-sm bg-gray-100">
                <img src={game.background_image} alt="game_image" className="w-full h-64 object-cover mb-4" />
                <div className="text-black text-xl font-semibold">
                    <p>{game.name}</p>
                    <p>Released: {game.released}</p>
                </div>
                {/* Close button */}
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Close</button>
            </div>
        </div>
    );
};

export default GameDetailsModal;
