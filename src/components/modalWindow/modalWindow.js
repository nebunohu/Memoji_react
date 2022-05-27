import React, { useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import { closeModal, setFlags, setTimer } from '../../services/actions';
import { AppContext } from '../../services/context';
import ModalOverlay from '../modal-overlay/modal-overlay';

// Styles
import styles from './modalWindow.module.scss';

const ModalWindow = ({ overlayClick, children }) => {
  const { flags, timer } = useContext(AppContext);
  const portalDiv = document.getElementById('modal-root');

  const clickPopupButton = ()  => {
      // let popupButtons = document.querySelectorAll('.modalWindow__popupWindow .button'),
      //     modalWindow = document.querySelector('.modalWindow');
  
      // modalWindow.addEventListener("mousedown", function(event) {
      //     let button = event.target.closest('.modalWindow__popupWindow .button');
      //     if(button == popupButtons[0] ||
      //         button == popupButtons[1] ||
      //         button == popupButtons[2] ||
      //         button == popupButtons[3]) {
  
      //         button.classList.add('pressed');
      //     }
          
      // }, true);
      // modalWindow.addEventListener("mouseup", mouseUpListener(event, popupButtons, modalWindow), true);
  }

  const mouseUpListener = (event, popupButtons, modalWindow) => {

      // let button = event.target.closest('.modalWindow__popupWindow .button'),
      //     popupWindow = event.target.closest('.modalWindow__popupWindow');

      // if (button == popupButtons[0] ||
      //   button == popupButtons[1] ||
      //   button == popupButtons[2] ||
      //   button == popupButtons[3]) {
      //   button.classList.remove('pressed');
      //   modalWindow.classList.remove('visible');
      //   popupWindow.classList.remove('visible');
      //   if(button === popupButtons[0]) this.props.toDefault();
      // }
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

    useEffect(() => {
        clickPopupButton();
    }, []);

    return ReactDOM.createPortal(
      <ModalOverlay onClick={overlayClick}>
        {children}
          {/*
          {flags.settings && <div className={`${styles.popup} modalWindow__popupWindow settingsWindow`}>
              <span className="modalWindow__popupWindowHeader">Game settings</span>
              <form>
                  <label htmlFor="GET-name">Name:</label>
                  <input id="GET-name" type="text" name="name" onChange={onChange}></input>
              
                  <ul>
                      <li>
                          <input className="difficultyLevel" type="radio" name="difficultyLevel"  value="low" defaultChecked onChange={onChange} />    
                          <span>Low</span>
                      </li>
                      <li>
                          <input className="difficultyLevel" type="radio" name="difficultyLevel"  value="medium" onChange={onChange} />
                          <span>Medium</span>
                      </li>
                      <li>
                          <input className="difficultyLevel" type="radio" name="difficultyLevel"  value="hard" onChange={onChange} />
                          <span>High</span>
                      </li>
                  </ul> 
              </form>
              <label htmlFor="submit">
                  <div className="button" onClick={onClick}>
                      <span>Confirm</span>
                  </div>
              </label>
              <input className="modalWindow__popupWindowSubmitInput" type="submit" id="submit" value="Confirm"></input>
              
          </div>} */}
          
          {/* <div className="modalWindow__popupWindow recordsWindow">
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
          </div> */}
      </ModalOverlay>,
      portalDiv
    );
    
}

export default ModalWindow;