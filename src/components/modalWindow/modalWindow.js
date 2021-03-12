import React, { Component } from 'react';

class ModalWindow extends Component {
    render() {
        return (
            <div className="modalWindow">
                <div className="modalWindow__popupWindow afterGame">
                    <div className="popupText"></div>
                    <div className="button">
                        <span>Try again</span>
                    </div>
                </div>
                <div className="modalWindow__popupWindow difficultyWindow">
                    <ul>
                        <li>
                            <input className="difficultyLevel" type="radio" name="difficultyLevel"  value="low" />    
                            <span>Low</span>
                        </li>
                        <li>
                            <input className="difficultyLevel" type="radio" name="difficultyLevel"  value="medium" />
                            <span>Medium</span>
                        </li>
                        <li>
                            <input className="difficultyLevel" type="radio" name="difficultyLevel"  value="hard" />
                            <span>High</span>
                        </li>
                    </ul>
                    <div className="button">
                        <span>Confirm</span>
                    </div>
                </div>
                <div className="modalWindow__popupWindow pauseWindow">
                    <span>Pause</span>
                    <div className="button">
                        <span>Continue</span>
                    </div>
                </div>
                <div className="modalWindow__popupWindow recordsWindow">
                    <span>Records table</span>
                    <div className="button">
                        <span>Back</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalWindow;