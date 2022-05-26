import React, { useContext, useEffect, useRef } from "react";
import { addCard } from "../../services/actions";
import { AppContext } from "../../services/context";

// Styles
import styles from './card.module.scss';
// import '../../style.scss';

const Card = ({ id, onClick, emoji, dispatch }) => {
  const { cards, backs, flippers} = useContext(AppContext);
  const flipperRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {

    dispatch(addCard({
      flipper: flipperRef.current,
      back: backRef.current
    }));
  }, []);

  return (
    <div className="card playground__card" id={id}>
      <div 
        className="card__flipper"
        onClick={onClick}
        ref={flipperRef}
      >
        <div className={`${styles.cardWrapperFront}`}></div>
        <div 
          className={`${styles.cardWrapperBack}`}
          ref={backRef}
        >
          {emoji}
        </div>
      </div>
    </div>
  )
};

export default Card;