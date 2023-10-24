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
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const ShuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
      }));
    setFirstCard(null);
    setSecondCard(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  // Handle card choice
  const handleCardChoice = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  // compare cards

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.src === secondCard.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstCard.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }
  }, [firstCard, secondCard]);
  // start game automatically
  useEffect(() => {
    ShuffleCards();
  }, []);
  const reset = () => {
    setFirstCard(null);
    setSecondCard(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  return (
    <div className="App">
      <h2>Memory Game</h2>
      <button className="button" onClick={ShuffleCards}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleCardChoice={handleCardChoice}
            flipped={card === firstCard || card === secondCard || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="turns">Turns: {turns}</p>
    </div>
  );
};

export default App;
