export const ADD_CARD = 'ADD_CARD';
export const SAVE_OPENED_CARDS = 'SAVE_OPENED_CARDS';
export const SET_FIRST_CLICK = 'SET_FIRST_CLICK';
export const SET_TIMER = 'SET_TIMER';

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

export const setFirstClick = () => {
  return {
    type: SET_FIRST_CLICK,
  };
};

export const setTimer = (timer) => {
  return {
    type: SET_TIMER,
    timer,
  };
};