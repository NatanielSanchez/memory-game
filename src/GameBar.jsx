import Button from "./Button";
import { useGameState } from "./GameProvider";

export default function GameBar() {
  const { status, difficulty, isComparingCards, dispatch } = useGameState();

  return (
    <div className="mx-2 mt-4 flex items-center justify-center">
      <div className="text-shadow flex size-fit flex-col items-center justify-center space-y-2 rounded-2xl bg-purple-300 p-4 shadow-xl ring-2 shadow-purple-800 ring-purple-900 md:flex-row md:space-y-0 md:space-x-4">
        <select
          disabled={isComparingCards}
          value={difficulty}
          onChange={(e) => {
            dispatch({ type: "changeDifficulty", payload: e.target.value });
          }}
          className="font-mgs1 h-16 w-fit rounded-2xl border-2 bg-slate-300 py-4 pr-8 pl-4 text-center text-3xl tracking-wider hover:shadow-2xl hover:shadow-purple-800 active:transform-[translateY(3px)] active:shadow-none active:ring-2 active:ring-purple-800 disabled:hover:text-red-500 disabled:hover:ring-2 disabled:hover:ring-red-500"
        >
          <option value={""} disabled hidden>
            Choose difficulty
          </option>
          <option value={"easy"}>Easy</option>
          <option value={"normal"}>Normal</option>
          <option value={"hard"}>Hard</option>
        </select>
        {status === "ready" && (
          <Button
            disabled={!difficulty}
            onClick={() => dispatch({ type: "gameStart" })}
          >
            START!
          </Button>
        )}
        {status === "active" && (
          <Button
            disabled={isComparingCards}
            onClick={() => {
              dispatch({ type: "reset" });
            }}
          >
            RESET
          </Button>
        )}
        {(status === "gameWon" || status === "gameLost") && (
          <Button
            disabled={isComparingCards}
            onClick={() => {
              dispatch({ type: "reset" });
            }}
          >
            TRY AGAIN!
          </Button>
        )}
      </div>
    </div>
  );
}
