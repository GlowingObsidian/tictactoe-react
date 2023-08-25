import { useState } from "react";
import calculateWinner from "./winner";
import "./styles.scss";
import Board from "./components/Board";
import StatusMessage from "./components/StatusMessage";
import History from "./components/History";

function App() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), isXNext: false },
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const winner = calculateWinner(gamingBoard.squares);

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

  return (
    <div className="app">
      <h2>
        <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      </h2>
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
      ></Board>
      <h2>Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
