import React, { Component } from 'react';
import Playground from '../playground/playground';
import MenuBlock from '../menuBlock/menuBlock';
import ModalWindow from '../modalWindow/modalWindow';
import MEMOJIAPP from '../../script.js'

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

class MemojiReactApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flags: {
                firstClick: true,               // флаг начала игры
                menuOpened: false,              // флаг открытия меню игры
                difficultyWindowOpened: false,  // флаг открытия меню выбора сложности
                recordsTableOpened: false,      // флаг открытия таблицы рекордов
                pause: false,                   // флаг паузы игры
                win: false,                     // флаг победы в игре
                lose: false,                    // флаг поражения в игре
            },
            DOMCreated: false,
            diffucultyLevel: 0,
            resultTable: {
                playerName: null,
                score: null,
            },
            timer: {
                counter: 60,
                id: 0,
            },
            cards: [],
            backs: [],
            flippers: null,
            cardsContainer: null,
            openedCards: [],
            cardsState: Array(12).fill(false),
        };
    }

    endGame() {
        let popupWindow = document.querySelector('.afterGame'),
            modalWindow = document.querySelector('.modalWindow'),
            timer = {...this.timer};
    
        modalWindow.classList.add('visible');
        popupWindow.classList.add('visible');
        clearInterval(timer.id);
        
    }

    gameEndingTextOunput(text) {
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

    win() {
        let win = 1,        
            cards = this.state.cards.slice(0),
            flags = {...this.state.flags},
            i;
    
            this.gameEndingTextOunput('W.i.n');
    
        for(i = 0; i < cards.length; i++)
        {
            if(!cards[i].back.classList.contains('correct')) win = 0;
        }
        if(win)
        {
            flags.win = 1;
            this.setState({
                flags: flags,
            });
            this.endGame();
        } 
    
    }

    lose() {
        this.gameEndingTextOunput('L.o.s.e');
        
        this.endGame();
    }

    decrTimer() {
        let timerWrapper = document.querySelector('.playground__timerWrapper'),
            minutes, seconds,
            minutesStr, secondsStr,     // Значения минут и секунд записанные строкой 
            timer = {...this.state.timer};
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
           this.lose();
       }
       this.setState({
           timer: timer,
       });
    }

    playgroundClickHandler(event) {
        let currentCard = null,
            currentFlipper = null,
            flags = {...this.state.flags},
            cards = this.state.cards.slice(0),
            openedCards = this.state.openedCards.slice(0),
            timer = {...this.state.timer},
            i;
        if(event.target.closest('.card__flipper'))
        {
            currentFlipper = event.target.closest('.card__flipper');
            if(flags.firstClick)
            {
                flags.firstClick = false;

                timer.id = window.setInterval(() => this.decrTimer(),1000);
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
        }
        if(openedCards.length > 1) this.compareCards(openedCards);

        this.setState({
            flags: flags,
            openedCards: openedCards,
            timer: timer,
        })
    }

    modalWindowClickHandler() {
        
    }

    compareCards(openedCards) {
        let correct = 1,
            cards = this.state.cards.slice(0),
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
        if(correct) this.win();
            
    }

    /* 
        Функция перемешивает эмодзи в случайном порядке 
    */
    mixEmojis() {
        let emojis = ['🐰', '🐰', '🐶', '🐶', '🐱', '🐱', '🐼', '🐼', '🐵', '🐵', '🐯','🐯'];

        emojis = emojis.sort(function(){
            return Math.random() - 0.5;
        });
        return emojis;
    }
    putCardsOnTable() {
        let emojis,
            imgsArray = [],
            i,
            backs = this.state.backs.slice(0),
            cards = this.state.cards.slice(0),
            flippers = this.state.flippers.slice(0);
    
        emojis = this.mixEmojis();
    
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
    
        this.setState({
            backs: backs,
            cards: cards,
            DOMCreated: true,
        });
    }

    componentDidMount() {
        this.setState({
            backs: Array.from(document.querySelectorAll('.card__wrapperBack')),
            flippers: Array.from(document.querySelectorAll('.card__flipper')),
            cardsContainer: document.querySelector('.playground__cardsContainer'),
        });

    }

    componentDidUpdate() {
        if(!this.state.DOMCreated) this.putCardsOnTable();
    }

    render() {
        return (
            <div>
                <ModalWindow />
                <MenuBlock />
                <Playground 
                    onClick = {(event) => this.playgroundClickHandler(event)}
                />
            </div>
        );
    }
}

export default MemojiReactApp;