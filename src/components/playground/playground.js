import React, { Component } from 'react';

class Playground extends Component {
    placeCards() {

    }
    
    render() {
        let cards = Array(12).fill('card'),
            i; 
        for(i=0; i<12; i++) {
            cards[i] += i;
        }
        return (
            <div className='plaground'>
                <div className='playground__cardsContainer'></div>
                {cards.map(item => (
                    <div className='card playground__card' id={item}>
                        <div className='card__flipper'>
                            <div className='card__wrapperFront'></div>
                            <div className='card__wrapperBack'></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Playground;