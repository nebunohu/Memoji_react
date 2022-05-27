import React, { useState, useEffect, useContext, useReducer } from 'react';
import Playground from '../playground/playground';
import MenuBlock from '../menuBlock/menuBlock';
import ModalWindow from '../modalWindow/modalWindow';
import UserInfo from '../userInfo/userInfo';
import { AppContext, appInitialState } from '../../services/context';
import reducer from '../../services/reducer';
import { decrementTimer, openModal, closeModal, saveOpenedCards, setFirstClick, setFlags, setTimer } from '../../services/actions';

// Styles
import styles from './app.module.scss';

// Utils
import compareCards from '../../utils/compare-cards';
import rotateCard from '../../utils/rotate-card';
import setCurrentCard from '../../utils/set-current-card';
import outputTimeString from '../../utils/output-time-string';
import PausePopup from '../pause-popup/pause-popup';
import EndgamePopup from '../endgame-popup/endgame-popup';

const MemojiReactApp = () => {
  const [endgameText, setEndgameText] = useState(null);
  const [appState, dispatch] = useReducer(reducer, appInitialState);
  const { timer } = useContext(AppContext);
  const { flags } = appState;

  const endGame = () => {
    dispatch(openModal());
    clearInterval(timer.id);
  }

/*
    Функция вывода текста в конце игры
*/
  const gameEndingTextOunput = (text) => {
    const letters = text.split('.');
    const nodes = [];

    for (let i = 0; i < letters.length; i++) {
      nodes.push(React.createElement(
        'span',
        {
          key: `letter${i}`,
          className: `${styles[`letter${i + 1}`]}`
        },
        letters[i]
      ));
    }
    const popupText = React.createElement(
      'div', 
      {
        className: `${styles.popupText}`
      }, 
      nodes);
    setEndgameText(popupText);
  }

  const win = () => {
    let win = true,        
      cards = [...appState.cards];

      gameEndingTextOunput('W.i.n');

    for (let i = 0; i < cards.length; i++) {
      if (!cards[i].back.classList.contains('correct')) win = false;
    }
    if (win) {
      dispatch(setFlags({...flags, win: true}));
      endGame();
    } 
  }

  const lose = () => {
    gameEndingTextOunput('L.o.s.e');
    dispatch(setFlags({ ...flags, lose: true }));
    endGame();
  };

  const decrTimer = () => {
    const timerWrapper = document.querySelector('.playground__timerWrapper');
      
    timer.counter--;
    
    timerWrapper.textContent = outputTimeString(timer.counter);

    if (!timer.counter) {
      // clearInterval(timer.id);
      lose();
    }
    dispatch(decrementTimer(timer.counter));
  };

    /* 
        Функция перемешивает эмодзи в случайном порядке 
    */
    // const mixEmojis = () => {
    //     let emojis = ['🐰', '🐰', '🐶', '🐶', '🐱', '🐱', '🐼', '🐼', '🐵', '🐵', '🐯','🐯'];

    //     emojis = emojis.sort(function(){
    //         return Math.random() - 0.5;
    //     });
    //     return emojis;
    // }

  const putNewCards = (cards) => {
      let emojis,
          imgsArray = Array.from(document.querySelectorAll('.image_wrapper'));
          //cards = this.cards.slice(0);
  
      emojis = mixEmojis();
      for(let i =0; i < emojis.length; i++)
      {
          cards[i].image = emojis[i];
          imgsArray[i].textContent = emojis[i];
      }

  }

  const toDefault = () => {
    let timerObj = document.querySelector('.playground__timerWrapper'),
      cards = state.cards.slice(0),
      openedCards = state.openedCards.slice(0),
      flags = {...flags},
      timer = {...timer};

    for(let i = 0; i < cards.length; i++) {
      cards[i].flipper.classList.remove('rotate');
      cards[i].back.classList.remove('correct'); 
      cards[i].back.classList.remove('incorrect');
    }
    openedCards.splice(0, openedCards.length);
    flags.firstClick = 1;
    timer.counter = 60;
    timerObj.textContent = '01:00';
    flags.lose = 0;
    flags.win = 0;
    putNewCards(cards);

    setState({
        cards: cards,
        openedCards: openedCards,
        flags: flags,
        timer: timer,
    });
  }

  // const onDifChangeHandler = (event) => {
  //     let difficultyLvlInputs = Array.from(document.querySelectorAll('.difficultyLevel')),
  //         difficultyLevel,
  //         playerName,
  //         i;

  //     if(event.target.closest('.settingsWindow ul')) {
  //         for(i = 0; i < difficultyLvlInputs.length; i++) {
  //             if(difficultyLvlInputs[i].checked === true) {
  //                 difficultyLevel = i;
  //             }
  //         }

  //         setState({
  //             ...state,
  //             difficultyLevel: difficultyLevel,
  //         })
  //     } else if(event.target.closest('.settingsWindow')) {    
  //         playerName = event.target.value;
          
  //         setState({
  //             ...state,
  //             playerName: playerName,
  //         });
  //     }
      
  // }

  const playgroundClickHandler = (event) => {
    let flags = {...appState.flags},
      cards = [...appState.cards],
      openedCards = appState.openedCards?.length ? [...appState.openedCards] : [];
      // timer = {...appState.timer};

    const currentFlipper = event.currentTarget;

    if (flags.firstClick) {
      dispatch(setFirstClick());
      timer.id = window.setInterval(() => decrTimer(), 1000);
      dispatch(setTimer(timer));
    }

    // сохранение текущего элемента
    const currentCard = setCurrentCard(cards, currentFlipper);
    // переворот карточки
    rotateCard(currentCard, openedCards);
    
    if (openedCards.length > 1) {
      const correct = compareCards(openedCards, cards);
      if(correct) win(); 
    }

    dispatch(saveOpenedCards(openedCards));
  }

  const menuBlockClickHandler = (event) => {
    let menuList = document.querySelector(".menuBlock__list"),
        modalWindow = document.querySelector(".modalWindow"),
        pauseWindow = document.querySelector(".pauseWindow"),
        settingsWindow = document.querySelector(".settingsWindow"),
        recordsWindow = document.querySelector(".recordsWindow");
    if (flags.menuOpened) {
      if (event.target.closest('#newGame')) {
        toDefault();
        clearInterval(timer.id);
  
      } else if (event.target.closest('#settings')) {
        flags.settingsWindowOpened = 1;
        modalWindow.classList.add('visible');
        settingsWindow.classList.add('visible');

      } else if (event.target.closest('#recordsTable')) {
        flags.recordsTableOpened = 1;
        modalWindow.classList.add('visible');
        recordsWindow.classList.add('visible');
      } 

      flags.menuOpened = 0;
      menuList.classList.remove('visible');
    } else {
      if (event.target.closest('.menuBlock')) {
        if(event.target.closest('.menuBlock__pauseButton')) {
          flags.pause = 1;
          dispatch(openModal());
          clearInterval(timer.id);

        } else if (event.target.closest('.menuBlock__burgerButton')) {
          flags.menuOpened = 1;
          menuList.classList.add('visible');

        } 
      }
    }
  }

  const modalWindowClickHandler = (event) => {
    let modalWindow = document.querySelector(".modalWindow"),
        pauseWindow = document.querySelector(".pauseWindow"),
        settingsWindow = document.querySelector(".settingsWindow"),
        recordsWindow = document.querySelector(".recordsWindow"),
        nameField = document.querySelector('.userInfo__name'),
        flags = {...appState.flags};

    if (event.target.closest('.pauseWindow .button')) {
        dispatch(setFlags({ ...flags, isModalOpen: false, pause: false }));
        timer.id = window.setInterval(() => decrTimer(), 1000);
        dispatch(setTimer(timer));

    } else if (event.target.closest('.settingsWindow .button')) {
        nameField.textContent = state.playerName;
    } else if (!event.target.closest('.modalWindow__popupWindow')) {
        flags.settingsWindowOpened = 0;
        settingsWindow.classList.remove('visible');

        flags.recordsTableWindowOpened = 0;
        recordsWindow.classList.remove('visible');

        if (!flags.pause) {
            modalWindow.classList.remove('visible');
        }
    }
  }

  const onModalOverlayClick = (e, overlay) => {
    if (e.target === overlay) {
      if (flags.pause) {
        dispatch(setFlags({ ...flags, pause: false }));
        timer.id = window.setInterval(() => decrTimer(), 1000);
        dispatch(setTimer(timer));
      }
      if (flags.win) {
        dispatch(setFlags({ ...flags, win: false }));
      }
      if (flags.lose) {
        dispatch(setFlags({ ...flags, lose: false }));
      }
      dispatch(closeModal());
    }
  };
  
  return (
    <AppContext.Provider value={appState}>
      <div className={`${styles.wrapper}`}>
        <MenuBlock 
          onClick = {(event) => menuBlockClickHandler(event)}
        />
        <Playground 
          dispatch={dispatch}
          onClick = {(event) => playgroundClickHandler(event)}
        />
        {/*<UserInfo playerName="User1" />*/}
      </div>

      {
        flags.isModalOpen && flags.pause && <ModalWindow
          overlayClick={onModalOverlayClick}
        >
          <PausePopup onClick={modalWindowClickHandler}/>
        </ModalWindow>
      }
      {
        flags.isModalOpen && (flags.win || flags.lose) && <ModalWindow
          overlayClick={onModalOverlayClick}
        >
          <EndgamePopup onClick={modalWindowClickHandler}>
            <div>{endgameText}</div>
          </EndgamePopup>
        </ModalWindow>
      }
    </AppContext.Provider>
  );
}


export default MemojiReactApp;