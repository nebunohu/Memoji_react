import React, { Component } from 'react';
import Playground from '../playground/playground';
import MenuBlock from '../menuBlock/menuBlock';
import ModalWindow from '../modalWindow/modalWindow';
import MEMOJIAPP from '../../script.js'

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
            backs: [],//Array.from(document.querySelectorAll('.card__wrapperBack')),
            flippers: null,//Array.from(document.querySelectorAll('.card__flipper')),
            cardsContainer: null,//document.querySelector('.playground__cardsContainer'),
            openedCards: [],
            cardsState: Array(12).fill(false),
        };
    }

    decrTimer() {
        let timerWrapper = document.querySelector('.playground__timerWrapper'),
            minutes, seconds,
            minutesStr, secondsStr,     // Значения минут и секунд записанные строкой 
            timer = this.state.timer;
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
           MEMOJIAPP.lose();
       }
       this.setState({
           timer: timer,
       });
    }

    clickHandler(event) {
        let currentCard = null,
            flags = this.state.flags,
            cards = MEMOJIAPP.cards,
            openedCards = this.state.openedCards,
            currentFlipper = null,
            timer = this.state.timer,
            i;
        if(event.target.closest('.card__flipper'))
        {
            currentFlipper = event.target.closest('.card__flipper');
            if(flags.firstClick)
            {
                flags.firstClick = false;

                let backs = Array.from(document.querySelectorAll('.card__wrapperBack'));
                this.setState({
                    backs: backs,
                    flippers: Array.from(document.querySelectorAll('.card__flipper')),
                    cardsContainer: document.querySelector('.playground__cardsContainer'),
                });

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

    compareCards(openedCards) {
        let correct = 1,
            cards = MEMOJIAPP.cards,
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
        if(correct) MEMOJIAPP.win();
            
    }

    render() {
        return (
            <div>
                <ModalWindow />
                <MenuBlock />
                <Playground 
                    onClick = {(event) => this.clickHandler(event)}
                />
            </div>
        );
    }
}

export default MemojiReactApp;