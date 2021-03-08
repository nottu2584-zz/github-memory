import React from "react";

import "./Card.css";

const Card = (props) => {
  const { className, item, onClick } = props;

  return (
    <div className={`card ${className}`} onClick={onClick}>
      <img src={item.avatar} alt={item.login} />
    </div>
  );
};

export default Card;
