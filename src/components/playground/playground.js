import React, { Component } from 'react';
import Card from '../card/card.jsx';


const Playground = ({ onClick }) => {
    let cards = Array(12).fill('card'); 

    for(let i = 0; i < 12; i++) {
        cards[i] += i;
    }

    return (
        <div className='playground'>
            <div className='playground__cardsContainer'>
                {cards.map((item, index) => <Card id={item} onClick={onClick} key={index + Math.random()} />)}
            </div>
            <div className='playground__timerWrapper'>01:00</div>
        </div>
    );
    
}

export default Playground;