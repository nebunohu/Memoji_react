import React from 'react';

// Styles
import styles from './pause-popup.module.scss';

const PausePopup = ({onClick}) => {
  return (
    <div className={`${styles.popup} modalWindow__popupWindow pauseWindow`}>
      <span className="modalWindow__popupWindowHeader">Pause</span>
      <div className="button" onClick={onClick}>
        <span>Continue</span>
      </div>
    </div>
  );
};

export default PausePopup;