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
            popupWindow = event.target.closest('.modalWindow__popupWindow'),            
            i;

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

    /*handleChange() {
        let difficultyLvlInputs = Array.from(document.querySelectorAll('.difficultyLevel')),
            i;

        for(i = 0; i < difficultyLvlInputs.length; i++) {
            if(difficultyLvlInputs[i].checked === true) {
                this.props.difficulty = i;
            }
        }
        
    }*/

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
                <div className="modalWindow__popupWindow settingsWindow">
                    <span className="modalWindow__popupWindowHeader">Game settings</span>
                    <form>
                        <label htmlFor="GET-name">Name:</label>
                        <input id="GET-name" type="text" name="name" onChange={this.props.onChange}></input>
                   
                        <ul>
                            <li>
                                <input className="difficultyLevel" type="radio" name="difficultyLevel"  value="low" defaultChecked onChange={this.props.onChange} />    
                                <span>Low</span>
                            </li>
                            <li>
                                <input className="difficultyLevel" type="radio" name="difficultyLevel"  value="medium" onChange={this.props.onChange} />
                                <span>Medium</span>
                            </li>
                            <li>
                                <input className="difficultyLevel" type="radio" name="difficultyLevel"  value="hard" onChange={this.props.onChange} />
                                <span>High</span>
                            </li>
                        </ul> 
                    </form>
                    <label htmlFor="submit">
                        <div className="button">
                            <span>Confirm</span>
                        </div>
                    </label>
                    <input className="modalWindow__popupWindowSubmitInput" type="submit" id="submit" value="Confirm"></input>
                    
                </div>
                <div className="modalWindow__popupWindow pauseWindow">
                    <span className="modalWindow__popupWindowHeader">Pause</span>
                    <div className="button" onClick={this.props.onClick}>
                        <span>Continue</span>
                    </div>
                </div>
                <div className="modalWindow__popupWindow recordsWindow">
                    <span className="modalWindow__popupWindowHeader">Records table</span>
                    <table className="modalWindow__table">
                        <thead>
                            <tr>
                                <th>Name</th>    
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>    
                            <tr>
                                <td className="tdName">User1</td>
                                <td>1000</td>
                            </tr>
                            <tr>
                                <td className="tdName">User2</td>
                                <td>900</td>
                            </tr>
                        </tbody>
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