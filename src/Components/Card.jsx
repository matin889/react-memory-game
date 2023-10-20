/* eslint-disable react/prop-types */
const Card = ({ card, handleCardChoise, flipped, disabled }) => {
  const flip = () => {
    if (!disabled) {
      handleCardChoise(card);
    }
  };
  return (
    <div className="card-container">
      <div className={flipped ? "flipped" : ""}>
        <img className="frontcard" src={card.src} alt="Card front" />
        <img
          onClick={flip}
          className="backCard"
          src="images/cover.jpg"
          alt="Card back"
        />
      </div>
    </div>
  );
};

export default Card;
