import React, { Component } from 'react';

class Playground extends Component {

    
    render() {
        let cards = Array(12).fill('card'),
            i; 
        for(i=0; i<12; i++) {
            cards[i] += i;
        }
        return (
            <div className='playground'>
                <div className='playground__cardsContainer'>
                    {cards.map(item => (
                        <div key={item} className='card playground__card' id={item}>
                            <div className='card__flipper' onClick={this.props.onClick}>
                                <div className='card__wrapperFront'></div>
                                <div className='card__wrapperBack'></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='playground__timerWrapper'>01:00</div>
            </div>
        );
    }
}

export default Playground;