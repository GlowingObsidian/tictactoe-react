function History({ history, moveTo, currentMove }) {
  return (
    <div className="history-wrapper">
      <ul className="history">
        {history.map((_, index) => (
          <li key={index}>
            <button
              className={`btn-move ${currentMove == index ? "active" : ""}`}
              onClick={() => moveTo(index)}
            >
              {index == 0 ? "New Game" : `Goto move #${index}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
