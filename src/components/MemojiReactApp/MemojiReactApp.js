import React, { useState, useEffect } from 'react';
import Playground from '../playground/playground';
import MenuBlock from '../menuBlock/menuBlock';
import ModalWindow from '../modalWindow/modalWindow';
import UserInfo from '../userInfo/userInfo';


class Card {
	constructor(id) {
		this.id = id;
    }
    setFlipperNode(flipper) {
        this.flipper = flipper;
    }

    setBackNode(back) {
        this.back = back;
    }
    setImageNode(image) {
        this.image = image;
    }
}

const MemojiReactApp = () => {
    const [state, setState] = useState({
        flags: {
            firstClick: true,               // флаг начала игры
            menuOpened: false,              // флаг открытия меню игры
            settingsWindowOpened: false,    // флаг открытия меню выбора сложности
            recordsTableOpened: false,      // флаг открытия таблицы рекордов
            pause: false,                   // флаг паузы игры
            win: false,                     // флаг победы в игре
            lose: false,                    // флаг поражения в игре
        },
        DOMCreated: false,                  // флаг 
        difficultyLevel: 0,                 // уровень сложности
        resultTable: {
            playerName: null,               // имя игрока
            score: null,                    // счёт
        },
        timer: {
            counter: 60,                    // счетчик таймера
            id: 0,                          // идентификатор таймера
        },
        cards: [],                          // массив карт на экране
        backs: [],                          // массив обратных сторон карт
        flippers: null,                     // массив флипперов карт
        cardsContainer: null,               // объект div-контейнера для карт
        openedCards: [],                    // открытые карты
        cardsState: Array(12).fill(false),  // статус карты на поле
    });

    const endGame = () => {
        let popupWindow = document.querySelector('.afterGame'),
            modalWindow = document.querySelector('.modalWindow'),
            timer = {...state.timer};
    
        modalWindow.classList.add('visible');
        popupWindow.classList.add('visible');
        clearInterval(timer.id);
        
    }

/*
    Функция вывода текста в конце игры
*/
    const gameEndingTextOunput = (text) => {
        let letters,
            letterSpan,
            deletingText = document.querySelectorAll('.popupText span'),
            popupText = document.querySelector(".popupText"),
            i;
    
        for(i = 0; i < deletingText.length; i++) {
            popupText.removeChild(deletingText[i]);
        }
    
        letters = text.split('.');
    
        for(i = 0; i < letters.length; i++) {
            letterSpan = document.createElement('span')
            letterSpan.textContent = letters[i];
            letterSpan.classList.add('letter'+(i+1));
            popupText.appendChild(letterSpan);
        }
        
    }

    const win = () => {
        let win = 1,        
            cards = state.cards.slice(0),
            flags = {...state.flags},
            i;
    
            gameEndingTextOunput('W.i.n');
    
        for(i = 0; i < cards.length; i++)
        {
            if(!cards[i].back.classList.contains('correct')) win = 0;
        }
        if(win)
        {
            flags.win = 1;
            setState({
                ...state,
                flags: flags,
            });
            endGame();
        } 
    
    }

    const lose = () => {
        gameEndingTextOunput('L.o.s.e');
        
        endGame();
    }

    const decrTimer = () => {
        let timerWrapper = document.querySelector('.playground__timerWrapper'),
            minutes, seconds,
            minutesStr, secondsStr,     // Значения минут и секунд записанные строкой 
            timer = {...state.timer};
        timer.counter--;
        minutes = Math.floor(timer.counter / 60);
        minutesStr = minutes.toString();
        if(minutes < 10) minutesStr = '0'+ minutesStr;
        seconds = timer.counter % 60;
        secondsStr =seconds.toString();
        if(seconds < 10) secondsStr = '0'+ secondsStr;
        timerWrapper.textContent = minutesStr+':'+secondsStr;
    
       if(!timer.counter)
       {
           clearInterval(timer.id);
           lose();
       }
       setState({
           ...state,
           timer: timer,
       });
    }

    const playgroundClickHandler = (event) => {
        let currentCard = null,
            currentFlipper = null,
            flags = {...state.flags},
            cards = [...state.cards],
            openedCards = state.openedCards?.length ? [...state.openedCards] : [],
            timer = {...state.timer},
            i;

        currentFlipper = event.currentTarget;
        if(flags.firstClick)
        {
            flags.firstClick = false;

            timer.id = window.setInterval(() => decrTimer(),1000);
        }

        // сохранение индекса текущего элемента
        for(i = 0; i < cards.length;  i++)
        {
            if(cards[i].flipper === currentFlipper)
            {
                currentCard = cards[i];
            }
        }
        // переворот карточки
        if(!(currentCard.back.classList.contains('correct') || currentCard.back.classList.contains('incorrect')) && !currentCard.flipper.classList.contains('rotate'))
        {
            openedCards.push(currentCard);
            currentCard.flipper.classList.add('rotate');
        }
        else if(!(currentCard.back.classList.contains('correct') || currentCard.back.classList.contains('incorrect')))
        {
            currentCard.flipper.classList.remove('rotate');
            openedCards.splice(0,1);
            }
        
        if(openedCards.length > 1) compareCards(openedCards);

        setState({
            ...state,
            flags: flags,
            openedCards: openedCards,
            timer: timer,
        })
    }

    const modalWindowClickHandler = (event) => {
        let modalWindow = document.querySelector(".modalWindow"),
            pauseWindow = document.querySelector(".pauseWindow"),
            settingsWindow = document.querySelector(".settingsWindow"),
            recordsWindow = document.querySelector(".recordsWindow"),
            nameField = document.querySelector('.userInfo__name'),
            flags = {...state.flags},
            timer = {...state.timer};

        if(event.target.closest('.pauseWindow .button')) {
            flags.pause = 0;
            modalWindow.classList.remove('visible');
            pauseWindow.classList.remove('visible');
            timer.id = window.setInterval(() => decrTimer(),1000);

        } else if(event.target.closest('.settingsWindow .button')) {
            nameField.textContent = state.playerName;
        } else if(!event.target.closest('.modalWindow__popupWindow')) {
            flags.settingsWindowOpened = 0;
            settingsWindow.classList.remove('visible');

            flags.recordsTableWindowOpened = 0;
            recordsWindow.classList.remove('visible');

            if(!flags.pause) {
                modalWindow.classList.remove('visible');
            }
        } 
        setState({
            ...state,
            flags: flags,
            timer: timer,
        });
    }

    const menuBlockClickHandler = (event) => {
        let menuList = document.querySelector(".menuBlock__list"),
            modalWindow = document.querySelector(".modalWindow"),
            pauseWindow = document.querySelector(".pauseWindow"),
            settingsWindow = document.querySelector(".settingsWindow"),
            recordsWindow = document.querySelector(".recordsWindow"),
            timer = {...state.timer},
            flags = {...state.flags};
        if(state.flags.menuOpened) {
            if(event.target.closest('#newGame')) {
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
            if(event.target.closest('.menuBlock')) {
                if(event.target.closest('.menuBlock__pauseButton')) {
                    flags.pause = 1;
                    modalWindow.classList.add('visible');
                    pauseWindow.classList.add('visible');
                    clearInterval(timer.id);
    
                } else if(event.target.closest('.menuBlock__burgerButton')) {
                    flags.menuOpened = 1;
                    menuList.classList.add('visible');
    
                } 
            }
        }
        setState({
            ...state,
            flags: flags,
        });
    }

    const compareCards = (openedCards) => {
        let correct = 1,
            cards = state.cards.slice(0),
            i;
        switch(openedCards.length)
        {
            case 2:
                if(openedCards[0].image === openedCards[1].image)
                {
                    openedCards[0].back.classList.add('correct');
                    openedCards[1].back.classList.add('correct');
                }
                else
                {
                    openedCards[0].back.classList.add('incorrect');
                    openedCards[1].back.classList.add('incorrect');
                }
            break;
            case 3:
                //перевернуть карточки и сбросить цвет задника, если они угаданы неверно
                if(!(openedCards[0].back.classList.contains('correct') && openedCards[1].back.classList.contains('correct')))
                {
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
    
        for(i = 0; i < cards.length; i++)
        {
            if(!cards[i].back.classList.contains('correct')) correct = 0;
        }
        if(correct) win();
            
    }

    /* 
        Функция перемешивает эмодзи в случайном порядке 
    */
    const mixEmojis = () => {
        let emojis = ['🐰', '🐰', '🐶', '🐶', '🐱', '🐱', '🐼', '🐼', '🐵', '🐵', '🐯','🐯'];

        emojis = emojis.sort(function(){
            return Math.random() - 0.5;
        });
        return emojis;
    }

    const putCardsOnTable = () => {
        let emojis,
            imgsArray = [],
            i,
            backs = state.backs.slice(0) || [],
            cards = state.cards?.slice(0) || [],
            flippers = state.flippers.slice(0);
    
        emojis = mixEmojis();
        
        if (cards.length) return;

        for(i=0; i < emojis.length; i++)
        {
            imgsArray.push(document.createElement('div'));
            imgsArray[i].textContent = emojis[i];
            imgsArray[i].className = 'image_wrapper';
            backs[i].appendChild(imgsArray[i]);
            cards.push(new Card(i));
            cards[i].setFlipperNode(flippers[i]);
            cards[i].setBackNode(backs[i]);
            cards[i].setImageNode(imgsArray[i].textContent);
        }
    
        setState({
            ...state,
            backs: backs,
            cards: cards,
            DOMCreated: true,
        });
    }

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
            timer = {...timer},
            i;
    
        for(i = 0; i < cards.length; i++)
        {
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

    const onDifChangeHandler = (event) => {
        let difficultyLvlInputs = Array.from(document.querySelectorAll('.difficultyLevel')),
            difficultyLevel,
            playerName,
            i;

        if(event.target.closest('.settingsWindow ul')) {
            for(i = 0; i < difficultyLvlInputs.length; i++) {
                if(difficultyLvlInputs[i].checked === true) {
                    difficultyLevel = i;
                }
            }

            setState({
                ...state,
                difficultyLevel: difficultyLevel,
            })
        } else if(event.target.closest('.settingsWindow')) {    
            playerName = event.target.value;
            
            setState({
                ...state,
                playerName: playerName,
            });
        }
        
    }

    useEffect(() => {
        setState({
            backs: Array.from(document.querySelectorAll('.card__wrapperBack')),
            flippers: Array.from(document.querySelectorAll('.card__flipper')),
            cardsContainer: document.querySelector('.playground__cardsContainer'),
        });

    }, []);

    useEffect(() => {
        if(state.flippers) putCardsOnTable();
    }, [state.DOMCreated]);

    
    return (
        <div>
            <ModalWindow 
                toDefault={toDefault}
                onChange={onDifChangeHandler}
                onClick = {(event) => modalWindowClickHandler(event)}
            />
            <MenuBlock 
                onClick = {(event) => menuBlockClickHandler(event)}
            />
            <Playground 
                onClick = {(event) => playgroundClickHandler(event)}
            />
            {/*<UserInfo playerName="User1" />*/}
        </div>
    );
}


export default MemojiReactApp;