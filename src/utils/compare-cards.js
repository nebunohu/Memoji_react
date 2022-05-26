const compareCards = (openedCards, cards) => {
  let correct = true;

  switch(openedCards.length)
  {
      case 2:
          if(openedCards[0].image === openedCards[1].image) {
              openedCards[0].back.classList.add('correct');
              openedCards[1].back.classList.add('correct');
          } else {
              openedCards[0].back.classList.add('incorrect');
              openedCards[1].back.classList.add('incorrect');
          }
      break;
      case 3:
          //перевернуть карточки и сбросить цвет задника, если они угаданы неверно
          if(!(openedCards[0].back.classList.contains('correct') && 
              openedCards[1].back.classList.contains('correct'))) {
              openedCards[0].flipper.classList.remove('rotate');
              openedCards[1].flipper.classList.remove('rotate'); 
              openedCards[0].back.classList.remove('incorrect');
              openedCards[1].back.classList.remove('incorrect'); 
          }

          openedCards.splice(0, 2);
      break;
      default:
      break;
  }

  for(let i = 0; i < cards.length; i++) {
      if(!cards[i].back.classList.contains('correct')) correct = false;
  }

  if(correct) win();            
}

export default compareCards;