import React, { Component } from 'react';
import { useState } from 'react';
import Card from '../card/card.jsx';

// Styles
import styles from './playground.module.scss';

const Playground = ({ onClick, dispatch }) => {
    const [isEmojisReady, setIsEmojisReady] = useState(false);
    const [emojis, setEmojis] = useState([]);
    let cards = Array(12).fill('card'); 

    const mixEmojis = () => {
        let emojis = ['🐰', '🐰', '🐶', '🐶', '🐱', '🐱', '🐼', '🐼', '🐵', '🐵', '🐯','🐯'];

        emojis = emojis.sort(function() {
            return Math.random() - 0.5;
        });
        return emojis;
    }

    if (!isEmojisReady) {
        setEmojis(mixEmojis());
        setIsEmojisReady(true);
    }

    for (let i = 0; i < 12; i++) {
        cards[i] += i;
    }

    return (
        <div className='playground'>
            <div className={`${styles.cardsContainer}`}>
                {cards.map((item, index) => {
                    return (
                        <Card 
                            id={item}
                            emoji={emojis[index]} 
                            onClick={onClick} 
                            dispatch={dispatch}
                            key={item}
                        />
                    )
                })}
            </div>
            <div className='playground__timerWrapper'>01:00</div>
        </div>
    );
    
}

export default Playground;