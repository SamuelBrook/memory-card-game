import "./App.css";
import Header from "./header";
import Main from "./main";
import { useState, useEffect } from "react";
import uniqid from "uniqid";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const cards = [
    {
      text: "Wiz Chick",
      clicked: false,
      id: uniqid(),
      image: "/images/chicken-wizard.png",
    },
    {
      text: "Log Frog",
      clicked: false,
      id: uniqid(),
      image: "/images/frog-on-log.png",
    },
    {
      text: "Enchantoad",
      clicked: false,
      id: uniqid(),
      image: "/images/frog-wizard.png",
    },
    {
      text: "Fruithog",
      clicked: false,
      id: uniqid(),
      image: "/images/hedgehog-with-fruit.png",
    },
    {
      text: "Hedgehogger",
      clicked: false,
      id: uniqid(),
      image: "/images/hedgehog.png",
    },
    {
      text: "Owlo",
      clicked: false,
      id: uniqid(),
      image: "/images/owl-on-blue-mug.png",
    },
    {
      text: "Owlie",
      clicked: false,
      id: uniqid(),
      image: "/images/owl-on-pink-mug.png",
    },
    {
      text: "Owlstrix",
      clicked: false,
      id: uniqid(),
      image: "/images/owl.png",
    },
    {
      text: "Rabatious",
      clicked: false,
      id: uniqid(),
      image: "/images/rabbit-with-carrot.png",
    },
    {
      text: "Gunny",
      clicked: false,
      id: uniqid(),
      image: "/images/rabbit.png",
    },
    {
      text: "Bamboom",
      clicked: false,
      id: uniqid(),
      image: "/images/red-panda-with-hat.png",
    },
    {
      text: "Acornski",
      clicked: false,
      id: uniqid(),
      image: "/images/squirrel.png",
    },
  ];

  const [cardSet, setCardSet] = useState(cards);

  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const checkIfNew = (card) => {
      for (let i = 0; i < cardSet.length; i++) {
        if (cardSet[i].text === card.id) {
          if (cardSet[i].clicked === true) {
            return false;
          } else {
            const newCardSet = cardSet;
            const editedSet = newCardSet.map((card) => {
              if (cardSet[i] === card) {
                card.clicked = true;
              }
              return card;
            });
            setCardSet(editedSet);
            return true;
          }
        }
      }
    };

    const cards = document.querySelectorAll(".cards");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const checkedIfNew = checkIfNew(target);

        if (checkedIfNew === true) {
          setScore((prevScore) => prevScore + 1);
        } else {
          const shuffledArray = shuffleArray(cardSet);
          const editedSet = shuffledArray.map((card) => {
            card.clicked = false;
            return card;
          });
          setCardSet(editedSet);
          setScore(0);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  });

  useEffect(() => {
    const cards = document.querySelectorAll(".cards");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const shuffledArray = shuffleArray(cardSet);
        setCardSet(shuffledArray);

        /*

        if (score === 12) {
          //remove cards and display win game box
          const cardSet = document.querySelector(".cardSet");
          const container = document.querySelector(".main");
          cardSet.remove();
          const winGameText = document.createElement("div");
          winGameText.id = "win-game-message";
          container.appendChild(winGameText);
          const yesButton = document.createElement("button");
          const noButton = document.createElement("button");
          const buttonContainer = document.createElement("div");
          yesButton.id = "win-choice";
          noButton.id = "win-choice";
          buttonContainer.id = "button-container";
          container.appendChild(buttonContainer);
          buttonContainer.appendChild(yesButton);
          buttonContainer.appendChild(noButton);
        }
        */
      });
    });
  }, []);

  return (
    <div className="App">
      <Header score={score} bestScore={bestScore} />
      <Main cardSet={cardSet} />
    </div>
  );
}

export default App;
