import React, { Component } from 'react';

class MenuBlock extends Component {
    render() {
        return (
            <div className="menuBlock" onClick={this.props.onClick}>
                <div className="menuBlock__burgerButton">
                    <div className="menuBlock__menuButtonBar"></div>
                    <div className="menuBlock__menuButtonBar"></div>
                    <div className="menuBlock__menuButtonBar"></div>
                </div>
                <div className="menuBlock__pauseButton">
                    <div className="menuBlock__pauseButtonBar"></div>
                    <div className="menuBlock__pauseButtonBar"></div>
                </div>
                <ul className="menuBlock__list">
                    <li className="menuBlock__listItem" id="newGame">Новая игра</li>
                    <li className="menuBlock__listItem" id="difficulty">Уровень сложности</li>
                    <li className="menuBlock__listItem" id="recordsTable">Таблица рекордов</li>
                </ul>
            </div>
        );
        
    }
}

export default MenuBlock;