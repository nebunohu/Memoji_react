const rotateCard = (currentCard, openedCards) =>{
  if(!(currentCard.back.classList.contains('correct') ||
    currentCard.back.classList.contains('incorrect')) &&
    !currentCard.flipper.classList.contains('rotate')) {
    openedCards.push(currentCard);
    currentCard.flipper.classList.add('rotate');
  }
  else if(!(currentCard.back.classList.contains('correct') ||
    currentCard.back.classList.contains('incorrect'))) {
    currentCard.flipper.classList.remove('rotate');
    openedCards.splice(0, 1);
  }
};

export default rotateCard;