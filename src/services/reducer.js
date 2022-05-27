import { ADD_CARD, CLOSE_MODAL, DECREMENT_TIMER, OPEN_MODAL, SAVE_OPENED_CARDS, SET_FIRST_CLICK, SET_FLAGS, SET_STATE_TO_DEFAULT, SET_TIMER } from "./actions";
import { appInitialState } from "./context"

const reducer = (state = appInitialState, action) => {
  switch(action.type) {
    case ADD_CARD: {
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
    case DECREMENT_TIMER: {
      return {
        ...state,
        timer: {
          ...state.timer,
          counter: action.counter,
        }
      };
    }
    case OPEN_MODAL: {
      return {
        ...state,
        flags: {
          ...state.flags,
          isModalOpen: true,
        },
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        flags: {
          ...state.flags,
          isModalOpen: false,
        },
      };
    }
    case SET_FLAGS: {
      return {
        ...state,
        flags: action.flags,
      };
    }
    case SET_STATE_TO_DEFAULT: {
      return appInitialState;
    }
    default: {
      return state;
    }
  };
};

export default reducer;