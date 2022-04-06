import "./App.css";
import Header from "./header";
import Main from "./main";
import WinMessage from "./win-message";
import { useState, useEffect } from "react";
import uniqid from "uniqid";
import chicken from "./images/chicken-wizard.png";
import frogLog from "./images/frog-on-log.png";
import frogWizard from "./images/frog-wizard.png";
import hedgeFruit from "./images/hedgehog-with-fruit.png";
import hedgehog from "./images/hedgehog.png";
import owlBlue from "./images/owl-on-blue-mug.png";
import owlPink from "./images/owl-on-pink-mug.png";
import owl from "./images/owl.png";
import rabbitCarrot from "./images/rabbit-with-carrot.png";
import rabbit from "./images/rabbit.png";
import panda from "./images/red-panda-with-hat.png";
import squirrel from "./images/squirrel.png";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameReset, setGameReset] = useState(false);

  const cards = [
    {
      text: "Wiz Chick",
      clicked: false,
      id: uniqid(),
      image: chicken,
    },
    {
      text: "Log Frog",
      clicked: false,
      id: uniqid(),
      image: frogLog,
    },
    {
      text: "Enchantoad",
      clicked: false,
      id: uniqid(),
      image: frogWizard,
    },
    {
      text: "Fruithog",
      clicked: false,
      id: uniqid(),
      image: hedgeFruit,
    },
    {
      text: "Hedgehogger",
      clicked: false,
      id: uniqid(),
      image: hedgehog,
    },
    {
      text: "Owlo",
      clicked: false,
      id: uniqid(),
      image: owlBlue,
    },
    {
      text: "Owlie",
      clicked: false,
      id: uniqid(),
      image: owlPink,
    },
    {
      text: "Owlstrix",
      clicked: false,
      id: uniqid(),
      image: owl,
    },
    {
      text: "Rabatious",
      clicked: false,
      id: uniqid(),
      image: rabbitCarrot,
    },
    {
      text: "Gunny",
      clicked: false,
      id: uniqid(),
      image: rabbit,
    },
    {
      text: "Bamboom",
      clicked: false,
      id: uniqid(),
      image: panda,
    },
    {
      text: "Acornski",
      clicked: false,
      id: uniqid(),
      image: squirrel,
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

  const resetPage = () => {
    window.location.reload();
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
        console.log(card);
        const target = e.currentTarget;
        const checkedIfNew = checkIfNew(target);
        console.log(checkedIfNew);

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
  }, [gameReset]);

  useEffect(() => {
    const cards = document.querySelectorAll(".cards");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const shuffledArray = shuffleArray(cardSet);
        setCardSet(shuffledArray);
      });
    });
  }, [gameReset]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);

  useEffect(() => {
    if (score >= 12) {
      setGameReset(true);
    }
  }, [score]);

  useEffect(() => {
    if (score >= 12) {
      const noButton = document.querySelector("#no-choice");
      noButton.addEventListener("click", () => {
        setScore(0);
        setCardSet(cards);
      });
    }
  }, [gameReset]);

  useEffect(() => {
    if (score === 0 && gameReset) {
      setGameReset(false);
    }
  }, [cardSet]);

  return (
    <div className="App">
      <Header score={score} bestScore={bestScore} />
      {!gameReset && <Main cardSet={cardSet} />}
      {gameReset && <WinMessage resetPage={resetPage} />}
    </div>
  );
}

export default App;
