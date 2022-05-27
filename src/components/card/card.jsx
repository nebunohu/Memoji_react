import React, { useContext, useEffect, useRef } from "react";
import { addCard } from "../../services/actions";
import { AppContext } from "../../services/context";

// Styles
import styles from './card.module.scss';
// import '../../style.scss';

const Card = ({ id, onClick, emoji, dispatch }) => {
  const flipperRef = useRef(null);
  const backRef = useRef(null);
  const { cards } = useContext(AppContext);
  const numRegExp = /\d+/;
  const cardNumId = parseInt(id.match(numRegExp)[0]);

  useEffect(() => {

    dispatch(addCard({
      flipper: flipperRef.current,
      back: backRef.current
    }));
  }, [cards[cardNumId]]);



  return (
    <div className="card playground__card" id={id}>
      <div 
        className={`${styles.cardFlipper}`}
        onClick={onClick}
        ref={flipperRef}
      >
        <div className={`${styles.cardWrapperFront}`} />
        <div 
          className={`${styles.cardWrapperBack}`}
          ref={backRef}
        >
          <div className={`${styles.imageWrapper}`}>{emoji}</div>
        </div>
      </div>
    </div>
  )
};

export default Card;