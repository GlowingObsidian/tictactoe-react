import { useState } from "react";
import calculateWinner from "./winner";
import "./styles.scss";
import Board from "./components/Board";
import StatusMessage from "./components/StatusMessage";

function App() {
  const [squares, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const winner = calculateWinner(squares);

  const handleSquareClick = (clickedPosition) => {
    if (squares[clickedPosition] || winner) {
      return;
    }
    setSquare((currentSquares) => {
      return currentSquares.map((squareVal, position) => {
        if (clickedPosition === position) {
          return isXNext ? "X" : "O";
        }
        return squareVal;
      });
    });
    setIsXNext((currentIsXNext) => !currentIsXNext);
  };

  return (
    <div className="app">
      <h2>
        <StatusMessage winner={winner} isXNext={isXNext} squares={squares} />
      </h2>
      <Board squares={squares} handleSquareClick={handleSquareClick}></Board>
    </div>
  );
}

export default App;
