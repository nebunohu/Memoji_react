import React, { createContext } from 'react';

export const appInitialState = {
  flags: {
    firstClick: true,               // флаг начала игры
    menuOpened: false,              // флаг открытия меню игры
    settings: false,    // флаг открытия меню выбора сложности
    recordsTableOpened: false,      // флаг открытия таблицы рекордов
    pause: false,                   // флаг паузы игры
    win: false,                     // флаг победы в игре
    lose: false,                    // флаг поражения в игре
    isModalOpen: false,
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
  cards: [
    // backs: [],
    // flippers: [],
  ],                          // массив карт на экране
//   backs: [],                          // массив обратных сторон карт
//   flippers: [],                     // массив флипперов карт
  cardsContainer: null,               // объект div-контейнера для карт
  openedCards: [],                    // открытые карты
  cardsState: Array(12).fill(false),  // статус карты на поле
};

export const AppContext = createContext(appInitialState);