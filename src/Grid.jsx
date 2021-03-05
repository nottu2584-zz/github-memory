import React from "react";
import Card from "./Card.jsx";

import "./Grid.css";

const Grid = (props) => {
  const {items} = props;
  return (
    <div className="Grid">
      {items.map((item, index) => (
        <Card key={index} item={item}></Card>
      ))}
    </div>
  );
};

export default Grid;
