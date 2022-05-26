const setCurrentCard = (cards, currentFlipper) => {
  let currentCard;

  for(let i = 0; i < cards.length;  i++) {
    if (cards[i].flipper === currentFlipper) {
        currentCard = cards[i];
    }
  }
  return currentCard;
};

export default setCurrentCard;