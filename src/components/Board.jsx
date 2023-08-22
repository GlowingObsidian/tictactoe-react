import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquare] = useState(Array(9).fill(null));

  const handleSquareClick = (clickedPosition) => {
    setSquare((currentSquares) => {
      return currentSquares.map((squareVal, position) => {
        if (clickedPosition === position) {
          return "X";
        }
        return squareVal;
      });
    });
  };

  const renderSquare = (position) => (
    <Square
      value={squares[position]}
      onClick={() => handleSquareClick(position)}
    />
  );

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;