function StatusMessage({ winner, isXNext, squares }) {
  const noMovesLeft = squares.every((sqareValue) => sqareValue !== null);

  const nextPlayer = isXNext ? "X" : "O";

  const renderStatusMessage = () => {
    if (winner) {
      return (
        <>
          Winner is{" "}
          <span className={winner === "X" ? "text-green" : "text-orange"}>
            {winner}
          </span>
        </>
      );
    }
    if (!winner && noMovesLeft) {
      return <>This is a Tie</>;
    }
    if (!winner && !noMovesLeft) {
      return (
        <>
          Next player is{" "}
          <span className={isXNext ? "text-green" : "text-orange"}>
            {nextPlayer}
          </span>
        </>
      );
    }
  };
  return <div className="status-message">{renderStatusMessage()}</div>;
}

export default StatusMessage;
