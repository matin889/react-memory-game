import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card";

const cardImages = [
  { src: "/images/1.jpg", matched: false },
  { src: "/images/2.jpg", matched: false },
  { src: "/images/3.jpg", matched: false },
  { src: "/images/4.jpg", matched: false },
  { src: "/images/5.jpg", matched: false },
  { src: "/images/6.jpg", matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [cardOne, setcardOne] = useState(null);
  const [cardTwo, setcardTwo] = useState(null);
  const [turns, seetTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const Shuffle = () => {
    const doubled = [...cardImages, ...cardImages];
    const shuffled = doubled.sort(() => Math.random() - 0.5);
    const memoryCards = shuffled.map((card) => ({
      ...card,
      id: Math.random(),
    }));
    setcardOne(null);
    setcardTwo(null);
    setCards(memoryCards);
    seetTurns(0);
  };
  console.log(cards);
  const handleCardChoice = (card) => {
    // om var kort har ingen värde/null så körds setCardOne för att null är false. Om true om det har värde körs card två
    cardOne ? setcardTwo(card) : setcardOne(card);
    console.log(card);
  };
  console.log(cardOne, cardTwo);

  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true);
      if (cardOne.src === cardTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === cardOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        console.log("matched");
        reset();
      } else {
        console.log("not matched");
        setTimeout(() => reset(), 1000);
      }
    }
  }, [cardOne, cardTwo]);

  useEffect(() => {
    Shuffle();
  }, []);

  const reset = () => {
    setcardOne(null);
    setcardTwo(null);
    seetTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  console.log(turns);

  return (
    <div className="App">
      <button className="start-game" onClick={Shuffle}>
        Start Game
      </button>
      <div className="cards">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              handleCardChoise={handleCardChoice}
              flipped={card === cardOne || card === cardTwo}
              disabled={disabled}
            />
          );
        })}
      </div>
      <p className="p">Turns:{turns}</p>
    </div>
  );
};

export default App;
