import React from "react";

const Card = ({ id, onClick }) => {
  return (
    <div className="card playground__card" id={id}>
      <div className="card__flipper" onClick={onClick}>
        <div className="card__wrapperFront"></div>
        <div className="card__wrapperBack"></div>
      </div>
    </div>
  )
};

export default Card;