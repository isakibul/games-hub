import Navbar from "./components/Navbar";
import GameList from "./components/GameList";
import GameGenre from "./components/GameGenre";

function App() {
  return (
    <div className="font-rubik">
      <Navbar />
      <div className="flex gap-10 mt-20 mx-2 lg:mx-5 xl:mx-10">
        <GameGenre />
        <GameList />
      </div>

    </div>
  );
}

export default App;

// d5ee9bfaa32d43269bfd100f16a7e979