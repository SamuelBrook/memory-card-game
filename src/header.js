import "./header.css";

function Header(props) {
  return (
    <div className="header">
      <div id="left-side">
        <h1 id="title">Memory Card Game</h1>
        <span id="instructions">
          Click on cards to earn points but don't click on any card more than
          once!
        </span>
      </div>
      <div id="scores">
        <span id="score">Score: {props.score}</span>
        <span id="best-score">Best Score: {props.bestScore}</span>
      </div>
    </div>
  );
}

export default Header;
