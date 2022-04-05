import "./App.css";
import Header from "./header";
import Main from "./main";
import WinMessage from "./win-message";
import { useState, useEffect } from "react";
import uniqid from "uniqid";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameReset, setGameReset] = useState(false);

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
  }, [score]);

  useEffect(() => {
    if (score >= 12) {
      setGameReset(true);
      // const noChoice = document.querySelector("#no-choice");
      // const yesChoice = document.querySelector("#yes-choice");
      // yesChoice.addEventListener("click", () => {
      //   window.location.reload();
      // });
      // noChoice.addEventListener("click", () => {
      //   setGameReset(false);
      // });

      //The above needs to be edited to allow for an on click that works and doesnt break the application: look at previous uses of the "OnClick" method
    }
  }, [score]);

  useEffect(() => {
    const cards = document.querySelectorAll(".cards");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const shuffledArray = shuffleArray(cardSet);
        setCardSet(shuffledArray);
      });
    });
  }, []);

  return (
    <div className="App">
      <Header score={score} bestScore={bestScore} />
      {!gameReset && <Main cardSet={cardSet} />}
      {gameReset && <WinMessage />}
    </div>
  );
}

export default App;
