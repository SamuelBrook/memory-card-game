import "./main.css";

function WinMessage(props) {
  const { resetPage } = props;
  return (
    <div className="main">
      <div id="win-game-message" className="win-message">
        You win! Reset score or continue?
      </div>
      <div id="button-container" className="win-message">
        <button id="yes-choice" className="win-choice" onClick={resetPage}>
          Reset
        </button>
        <button id="no-choice" className="win-choice">
          Continue
        </button>
      </div>
    </div>
  );
}

export default WinMessage;
