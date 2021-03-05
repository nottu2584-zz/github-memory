import React from "react";

import "./Card.css";

const Card = (props) => {
  const {item} = props;

  return (
    <div className="Card">
        <img src={item.avatar} alt={item.login}/>
    </div>
  );
};

export default Card;
