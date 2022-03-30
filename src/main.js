import "./main.css";

function Main(props) {
  const { cardSet } = props;
  return (
    <div className="main">
      <div className="cardSet">
        {cardSet.map((card) => {
          return (
            <div className="cards" key={card.id} id={card.text}>
              <div id="image-container">
                <img className="image" src={card.image} alt={card.text}></img>
              </div>
              <div id="card-text">{card.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
