import GameBar from "./GameBar";
import GameBoard from "./GameBoard";
import GameHeader from "./GameHeader";
import { useGameState } from "./GameProvider";
import GameSideBox from "./GameSideBox";

function App() {
  const { status } = useGameState();

  return (
    <>
      <GameHeader />
      <GameBar />
      {(status === "active" ||
        status === "gameWon" ||
        status === "gameLost") && (
        <div className="mt-6 flex flex-col items-center justify-center gap-8 md:flex-row">
          <GameBoard />
          <GameSideBox />
        </div>
      )}
    </>
  );
}

export default App;
