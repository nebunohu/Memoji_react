import { ADD_CARD, SAVE_OPENED_CARDS, SET_FIRST_CLICK, SET_TIMER } from "./actions";
import { appInitialState } from "./context"

const reducer = (state = appInitialState, action) => {
  switch(action.type) {
    case ADD_CARD: {
      console.log(action.card.flipper.textContent);
      return {
        ...state,
        cards: [
          ...state.cards,
          {
            flipper: action.card.flipper,
            back: action.card.back,
            image: action.card.flipper.innerText,
          }
        ]
        
      };
    }
    case SAVE_OPENED_CARDS: {
      return {
        ...state,
        openedCards: action.openedCards,
      };
    }
    case SET_FIRST_CLICK: {
      return {
        ...state,
        flags: {
          firstClick: false,
        },
      };
    }
    case SET_TIMER: {
      return {
        ...state,
        timer: action.timer,
      };
    }
    default: {
      return state;
    }
  };
};

export default reducer;