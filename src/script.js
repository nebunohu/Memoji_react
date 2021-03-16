"use strict"
import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import MemojiReactApp from './components/MemojiReactApp/MemojiReactApp';

let MEMOJIAPP = MEMOJIAPP || {};

MEMOJIAPP.namespace = function(propsString) {
    let parent = MEMOJIAPP,
        parts = propsString.split('.'),
        i;

    if(parts[0] === 'MEMOJIAPP') {
        parts = parts.slice(1);
    }

    for(i = 0; i < parts.length; i++) {
        if(typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}



/* 
    Функция перемешивает эмодзи в случайном порядке

MEMOJIAPP.mixEmojis = function () {
    let emojis = ['🐰', '🐰', '🐶', '🐶', '🐱', '🐱', '🐼', '🐼', '🐵', '🐵', '🐯','🐯'];

    emojis = emojis.sort(function(){
        return Math.random() - 0.5;
    });
    return emojis;
}*/

/*MEMOJIAPP.putCardsOnTable = function () {
    let emojis,
        imgsArray = [],
        i,
        backs = MEMOJIAPP.backs,
        cards = MEMOJIAPP.cards,
        flippers = MEMOJIAPP.flippers;

    emojis = MEMOJIAPP.mixEmojis();

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

}*/

MEMOJIAPP.putNewCards = function() {
    let emojis,
        imgsArray = Array.from(document.querySelectorAll('.image_wrapper')),
        cards = MEMOJIAPP.cards;

    emojis = MEMOJIAPP.mixEmojis();
    for(let i =0; i < emojis.length; i++)
    {
        cards[i].image = emojis[i];
        imgsArray[i].textContent = emojis[i];
    }
}

MEMOJIAPP.toDefault = function() {
    let timerObj = document.querySelector('.playground__timerWrapper'),
        cards = MEMOJIAPP.cards,
        openedCards = MEMOJIAPP.openedCards,
        firstClick = MEMOJIAPP.flags.firstClick,
        timer = MEMOJIAPP.timer.counter,
        i;

    for(i = 0; i < cards.length; i++)
    {
        cards[i].flipper.classList.remove('rotate');
        cards[i].back.classList.remove('correct'); 
        cards[i].back.classList.remove('incorrect');
    }
    openedCards.splice(0, openedCards.length);
    MEMOJIAPP.flags.firstClick = 1;
    MEMOJIAPP.timer.counter = 60;
    timerObj.textContent = '01:00';
    MEMOJIAPP.flags.lose = 0;
    MEMOJIAPP.flags.win = 0;
    MEMOJIAPP.putNewCards();

}

/*MEMOJIAPP.endGame = function() {
    let popupWindow = document.querySelector('.afterGame'),
        modalWindow = document.querySelector('.modalWindow'),
        timerId = MEMOJIAPP.timer.id;

    modalWindow.classList.add('visible');
    popupWindow.classList.add('visible');
    clearInterval(MEMOJIAPP.timer.id);
    
}*/

 MEMOJIAPP.clickPopupButton = function() {
    let popupButtons = document.querySelectorAll('.modalWindow__popupWindow .button'),
        modalWindow = document.querySelector('.modalWindow');

    modalWindow.addEventListener("mousedown", function(event) {
        let button = event.target.closest('.modalWindow__popupWindow .button');
        if(button === popupButtons[0] ||
           button === popupButtons[1] ||
           button === popupButtons[2] ||
           button === popupButtons[3]) {

            button.classList.add('pressed');
        }
        
    }, true);
    modalWindow.addEventListener("mouseup", function(event) {
        let button = event.target.closest('.modalWindow__popupWindow .button'),
            popupWindow = event.target.closest('.modalWindow__popupWindow');
        if(button === popupButtons[0] ||
           button === popupButtons[1] ||
           button === popupButtons[2] ||
           button === popupButtons[3])
        {
            button.classList.remove('pressed');
            modalWindow.classList.remove('visible');
            popupWindow.classList.remove('visible');
            if(button === popupButtons[0]) MEMOJIAPP.toDefault();
        }
    }, true);
}

/*MEMOJIAPP.gameEndingTextOunput = function(text) {
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
    
}*/

/*MEMOJIAPP.win = function() {
    let win = 1,        
        cards = MEMOJIAPP.cards,
        i;

        MEMOJIAPP.gameEndingTextOunput('W.i.n');

    for(i = 0; i < cards.length; i++)
    {
        if(!cards[i].back.classList.contains('correct')) win = 0;
    }
    if(win)
    {
        MEMOJIAPP.flags.win = 1;
        MEMOJIAPP.endGame();
    } 

}*/

/*MEMOJIAPP.lose = function() {
    MEMOJIAPP.gameEndingTextOunput('L.o.s.e');
    
    MEMOJIAPP.endGame();
}*/



 MEMOJIAPP.clickControl = function() {
    let menuList = document.querySelector(".menuBlock__list"),
        modalWindow = document.querySelector(".modalWindow"),
        pauseWindow = document.querySelector(".pauseWindow"),
        difficultyWindow = document.querySelector(".difficultyWindow"),
        recordsWindow = document.querySelector(".recordsWindow"),
        htmlDocument = document.querySelector("html"),
        timerId = MEMOJIAPP.timer.id;

    
    htmlDocument.addEventListener('click', function(event) {
        if(MEMOJIAPP.flags.menuOpened) {
            if(event.target.closest('#newGame')) {
                MEMOJIAPP.toDefault();
                clearInterval(MEMOJIAPP.timer.id);
        
            } else if (event.target.closest('#difficulty')) {
                MEMOJIAPP.flags.difficultyWindowOpened = 1;
                modalWindow.classList.add('visible');
                difficultyWindow.classList.add('visible');

            } else if (event.target.closest('#recordsTable')) {
                MEMOJIAPP.flags.recordsTableOpened = 1;
                modalWindow.classList.add('visible');
                recordsWindow.classList.add('visible');
            } 

            MEMOJIAPP.flags.menuOpened = 0;
            menuList.classList.remove('visible');
        } else {
            if(event.target.closest('.playground__cardsContainer')) {
                MEMOJIAPP.rotate(event);
            } else if(event.target.closest('.menuBlock')) {
                if(event.target.closest('.menuBlock__pauseButton')) {
                    MEMOJIAPP.flags.pause = 1;
                    modalWindow.classList.add('visible');
                    pauseWindow.classList.add('visible');
                    clearInterval(MEMOJIAPP.timer.id);
    
                } else if(event.target.closest('.menuBlock__burgerButton')) {
                    MEMOJIAPP.flags.menuOpened = 1;
                    menuList.classList.add('visible');
    
                } 
    
    
            } else if(event.target.closest('.pauseWindow .button')) {
                MEMOJIAPP.flags.pause = 0;
                modalWindow.classList.remove('visible');
                pauseWindow.classList.remove('visible');
                MEMOJIAPP.timer.id = window.setInterval(() => MEMOJIAPP.decrTimer(),1000);
    
            } else if(!event.target.closest('.modalWindow__popupWindow')) {
                MEMOJIAPP.flags.difficultyWindowOpened = 0;
                difficultyWindow.classList.remove('visible');
    
                MEMOJIAPP.flags.recordsTableWindowOpened = 0;
                recordsWindow.classList.remove('visible');
    
                if(!MEMOJIAPP.flags.pause) {
                    modalWindow.classList.remove('visible');
                }
                
    
            } 
        }
    }, true);
}

MEMOJIAPP.startgame = (function (){
    ReactDOM.render(<MemojiReactApp />, document.querySelector('#root'));

    MEMOJIAPP.clickPopupButton();

    
}());

export default MEMOJIAPP;









