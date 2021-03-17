import React, { Component } from 'react';

class ModalWindow extends Component {

    clickPopupButton() {
        let popupButtons = document.querySelectorAll('.modalWindow__popupWindow .button'),
            modalWindow = document.querySelector('.modalWindow');
    
        modalWindow.addEventListener("mousedown", function(event) {
            let button = event.target.closest('.modalWindow__popupWindow .button');
            if(button == popupButtons[0] ||
                button == popupButtons[1] ||
                button == popupButtons[2] ||
                button == popupButtons[3]) {
    
                button.classList.add('pressed');
            }
            
        }, true);
        modalWindow.addEventListener("mouseup", this.mouseUpListener.bind(this,popupButtons, modalWindow), true);
    }

    mouseUpListener(popupButtons, modalWindow, event) {
 
        let button = event.target.closest('.modalWindow__popupWindow .button'),
            popupWindow = event.target.closest('.modalWindow__popupWindow');
        if(button == popupButtons[0] ||
            button == popupButtons[1] ||
            button == popupButtons[2] ||
            button == popupButtons[3])
        {
            button.classList.remove('pressed');
            modalWindow.classList.remove('visible');
            popupWindow.classList.remove('visible');
            if(button === popupButtons[0]) this.props.toDefault();
        }
    }

    componentDidMount() {
        this.clickPopupButton();
    }

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
                    <table className="modalWindow__table">
                        <tr>
                            <th>Name</th>    
                            <th>Score</th>
                        </tr>    
                        <tr>
                            <td>User1</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>User2</td>
                            <td>900</td>
                        </tr>
                    </table>
                    <div className="button">
                        <span>Back</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalWindow;