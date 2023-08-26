import { useState } from "react";
import calculateWinner from "./winner";
import "./styles.scss";
import Board from "./components/Board";
import StatusMessage from "./components/StatusMessage";
import History from "./components/History";

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: true }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);

  const handleSquareClick = (clickedPosition) => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory((currentHistory) => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextSquaresState = lastGamingState.squares.map(
        (squareVal, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? "X" : "O";
          }
          return squareVal;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquaresState,
        isXNext: !lastGamingState.isXNext,
      });
    });
    setCurrentMove((move) => move + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  };

  const resetGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        Tic <span className="text-green">Tac</span> Toe
      </h1>
      <h2>
        <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      </h2>
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      ></Board>
      <button
        className={`btn-reset ${winner ? "active" : ""}`}
        onClick={resetGame}
      >
        <h2>Reset Game</h2>
      </button>
      <h2 style={{ fontWeight: "normal" }}>Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls"></div>
    </div>
  );
}

export default App;
