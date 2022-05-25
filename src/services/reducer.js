import { ADD_CARD, SAVE_OPENED_CARDS } from "./actions";
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
    default: {
      return state;
    }
  };
};

export default reducer;