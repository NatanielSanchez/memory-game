/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";

const StateContext = createContext(null);

const easyCards = [
  "./cards/Buggin.png",
  "./cards/Clueless.png",
  "./cards/Gregory.png",
  "./cards/monkaW.png",
];

const normalCards = [...easyCards, "./cards/Pepega.png", "./cards/YEP.png"];

const hardCards = [
  ...normalCards,
  "./cards/FeelsDankMan.png",
  "./cards/Corpa.png",
];

const initialFlippedCards = {
  first: null,
  second: null,
  hasFirst: function () {
    return this.first !== null;
  },
  hasSecond: function () {
    return this.second !== null;
  },
};

const initialState = {
  status: "ready",
  difficulty: "",
  gameCards: generateGameCards("easy"),
  attempts: 0,
  flippedCards: initialFlippedCards,
};

function getMaxAttempts(difficulty) {
  let maxAttempts;
  switch (difficulty) {
    case "easy":
      maxAttempts = 40;
      break;
    case "normal":
      maxAttempts = 30;
      break;
    case "hard":
      maxAttempts = 20;
      break;
  }
  return maxAttempts;
}

function generateGameCards(difficulty) {
  let cards;
  switch (difficulty) {
    case "easy":
      cards = [...easyCards, ...easyCards];
      break;

    case "normal":
      cards = [...normalCards, ...normalCards];
      break;

    case "hard":
      cards = [...hardCards, ...hardCards];
      break;
  }

  cards = cards.map((card) => {
    return { url: card, flipped: false, discovered: false };
  });

  for (let i = cards.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

function reducer(state, action) {
  switch (action.type) {
    case "changeDifficulty":
      return {
        ...initialState,
        status: "ready",
        difficulty: action.payload,
        gameCards: generateGameCards(action.payload),
      };

    case "gameStart":
      if (!state.difficulty) return state;
      return { ...state, status: "active" };

    case "reset":
      return {
        ...initialState,
        status: "ready",
        gameCards: generateGameCards(state.difficulty),
      };

    case "cardClicked": {
      let newGameCards = state.gameCards.map((card, i) =>
        i === action.payload ? { ...card, flipped: true } : card,
      );
      // if i have both flipped cards, disable interaction and compare them after 1 second!
      return {
        ...state,
        gameCards: newGameCards,
        flippedCards: state.flippedCards.hasFirst()
          ? { ...state.flippedCards, second: action.payload }
          : { ...state.flippedCards, first: action.payload },
        attempts: state.flippedCards.hasFirst()
          ? state.attempts + 1
          : state.attempts,
      };
    }

    case "cardCompare": {
      // if the flipped cards are the same, discover them. else unflip them.
      let newGameCards;
      if (
        state.gameCards.at(state.flippedCards.first).url ===
        state.gameCards.at(state.flippedCards.second).url
      ) {
        newGameCards = state.gameCards.map((card, i) =>
          i === state.flippedCards.first || i === state.flippedCards.second
            ? { ...card, discovered: true }
            : card,
        );
      } else {
        newGameCards = state.gameCards.map((card, i) =>
          i === state.flippedCards.first || i === state.flippedCards.second
            ? { ...card, flipped: false }
            : card,
        );
      }

      let allDiscovered =
        newGameCards.filter((card) => card.discovered).length ===
        state.gameCards.length;
      let noMoreAttempts = state.attempts === getMaxAttempts(state.difficulty);
      return {
        ...state,
        status: allDiscovered
          ? "gameWon"
          : noMoreAttempts
            ? "gameLost"
            : "active",
        gameCards: newGameCards,
        flippedCards: initialFlippedCards,
      };
    }

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function GameProvider({ children }) {
  const [{ status, difficulty, gameCards, attempts, flippedCards }, dispatch] =
    useReducer(reducer, initialState);

  const haveBothCards = flippedCards.hasFirst() && flippedCards.hasSecond();

  useEffect(() => {
    // if i have both flipped cards, compare them after a second!
    if (haveBothCards) {
      setTimeout(() => dispatch({ type: "cardCompare" }), 1000);
    }
  }, [haveBothCards]);

  return (
    <StateContext.Provider
      value={{
        status,
        difficulty,
        gameCards,
        attempts,
        flippedCards,
        maxAttempts: getMaxAttempts(difficulty),
        isComparingCards: haveBothCards,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

function useGameState() {
  const gameState = useContext(StateContext);
  if (gameState === undefined)
    throw new Error("StateContext was used outside of the Provider component!");
  return gameState;
}
export { GameProvider, useGameState };
