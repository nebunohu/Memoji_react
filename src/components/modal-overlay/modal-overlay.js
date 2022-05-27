import React, { useRef } from 'react';

import styles from './modal-overlay.module.scss';

const ModalOverlay = ({ children, onClick }) => {
  const overlayRef = useRef(null);

  return (
    <div 
      className={`${styles.wrapper}`}
      onClick={(e) => onClick(e, overlayRef.current)}
      ref={overlayRef}
    >
     {children} 
    </div>
  );
};

export default ModalOverlay;