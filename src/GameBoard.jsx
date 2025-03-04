import { useGameState } from "./GameProvider";

export default function GameBoard() {
  const { gameCards, attempts, isComparingCards, maxAttempts, dispatch } =
    useGameState();

  return (
    <div className="order-2 grid grid-cols-4 justify-items-center gap-4 md:order-1">
      {gameCards.map((card, i) => (
        <Card
          key={i}
          isDisabled={
            isComparingCards || attempts === maxAttempts || card.flipped
          }
          card={card}
          onCardClick={() => dispatch({ type: "cardClicked", payload: i })}
        />
      ))}
    </div>
  );
}

function Card({ isDisabled, card, onCardClick }) {
  return (
    <button
      disabled={isDisabled}
      onClick={onCardClick}
      className={`${card.discovered ? "bg-green-400" : ""} card-button hover:card-button-hover focus:card-button-focus active:card-button-active h-20 w-20 md:h-30 md:w-30`}
    >
      <img
        className={`w-full ${card.flipped ? "block" : "hidden"}`}
        src={card.url}
        alt="EMOJI HERE?"
      />
    </button>
  );
}
