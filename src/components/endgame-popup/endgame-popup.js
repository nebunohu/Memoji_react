import React from 'react';

// Styles
import styles from './endgame-popup.module.scss';

const EndgamePopup = ({ onClick, children }) => {
  return (
   <div 
      className={`${styles.popup} modalWindow__popupWindow afterGame`}
    >
      <div className="popupText">
        {children}
      </div>
      <div className="button" onClick={onClick}>
          <span>Try again</span>
      </div>
    </div>
  );
};

export default EndgamePopup;