import { useGameState } from "./GameProvider";
import Timer from "./Timer";

export default function GameSideBox() {
  const { status, gameCards, attempts, maxAttempts } = useGameState();

  let pairsFound = Math.floor(
    gameCards.filter((card) => card.discovered === true).length / 2,
  );
  let totalPairs = gameCards.length / 2;

  return (
    <div className="font-jersey10 order-1 flex w-[40dvh] flex-col text-4xl font-light tracking-wide md:order-2">
      <Timer stop={status === "gameLost" || status === "gameWon"} />
      <p className={`${status === "gameLost" ? "text-red-500" : ""}`}>
        ATTEMPTS: {attempts} / {maxAttempts}
      </p>
      <p className={`${status === "gameWon" ? "text-green-800" : ""}`}>
        PAIRS FOUND: {pairsFound} / {totalPairs}
      </p>
      {status === "gameWon" && (
        <p className="text-green-600">
          CONGRATULATIONS! YOU FOUND THE {totalPairs} PAIRS!
        </p>
      )}
      {status === "gameLost" && <p className="text-red-500">GAME OVER!</p>}
    </div>
  );
}
