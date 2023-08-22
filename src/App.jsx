import { useState } from "react";
import calculateWinner from "./winner";
import "./styles.scss";
import Board from "./components/Board";

function App() {
  const [squares, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const nextPlayer = isXNext ? "X" : "O";
  const winner = calculateWinner(squares);
  const statusMessage = winner
    ? `Winner is ${winner}`
    : `Next player is ${nextPlayer}`;

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
      <h2>{statusMessage}</h2>
      <Board squares={squares} handleSquareClick={handleSquareClick}></Board>
    </div>
  );
}

export default App;
