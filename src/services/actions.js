export const ADD_CARD = 'ADD_CARD';
export const SAVE_OPENED_CARDS = 'SAVE_OPENED_CARDS';
export const SET_FIRST_CLICK = 'SET_FIRST_CLICK';
export const SET_TIMER = 'SET_TIMER';
export const DECREMENT_TIMER = 'DECREMENT_TIMER';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_FLAGS = 'SET_FLAGS';
export const SET_STATE_TO_DEFAULT = 'SET_STATE_TO_DEFAULT';

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

export const decrementTimer = (counter) => {
  return {
    type: DECREMENT_TIMER,
    counter,
  };
};

export const openModal = () => {
  return {
    type: OPEN_MODAL,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const setFlags = (flags) => {
  return {
    type: SET_FLAGS,
    flags
  };
};

export const setStateToDefault = () => {
  return {
    type: SET_STATE_TO_DEFAULT,
  };
};