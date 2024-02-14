import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import GameList from "./components/GameList";
import GameGenre from "./components/GameGenre";
import useGames from "./hooks/useGames";
import MyProvider from "./context/MyProvider";

function App() {
  const storedDarkMode = localStorage.getItem("isDarkMode");
  const initialDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;

  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);

  const { games, loading, error, searchTerm, handleSearchChange } = useGames("");

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    localStorage.setItem("isDarkMode", JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <MyProvider>
      <div className={`font-rubik h-[2500px] ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} pt-8`}>
        <Navbar
          onToggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <div className="flex gap-10 mt-10 mx-2 lg:mx-5 xl:mx-10">
          <GameGenre />
          <GameList games={games} loading={loading} error={error} />
        </div>
      </div>
    </MyProvider>
  );
}

export default App;