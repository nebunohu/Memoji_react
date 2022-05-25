export const ADD_CARD = 'ADD_CARD';
export const SAVE_OPENED_CARDS = 'SAVE_OPENED_CARDS';

export const addCard = (card) => {
  return {
    type: ADD_CARD,
    card,
  };
};

export const saveOpenedCards = (openedCards) => {
  return {
    type: SAVE_OPENED_CARDS,
    openedCards,
  };
};