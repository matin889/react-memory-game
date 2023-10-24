/* eslint-disable react/prop-types */

const Card = ({ card, handleCardChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleCardChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          className="back"
          src="/images/cover.jpeg"
          onClick={handleClick}
          alt="card-back"
        />
      </div>
    </div>
  );
};

export default Card;
