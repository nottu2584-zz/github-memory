import React from "react";
import Card from "./Card.jsx";

import "./Grid.css";

const Grid = (props) => {
  const {items, visibleItems, setVisibleItems, finishedItems, checkItems} = props;

  return (
    <div className="grid">
      {items.map((item, index) => (
        <Card 
          className={`${visibleItems.includes(index) ? "show" : finishedItems.includes(index) ? "show finished": ""}`} 
          key={index} 
          item={item} 
          onClick={() => {
            if (!finishedItems.includes(index)) {
              switch (visibleItems.length) {
                case 0:
                  setVisibleItems([index]);
                  break;
                case 1:
                  if (visibleItems[0] !== index) {
                    setVisibleItems(visibleItems.concat(index));
                    checkItems(visibleItems[0], index);
                  }
                  break;
                case 2:
                  setVisibleItems([index]);
                  break;
                default:
                  setVisibleItems([]);
              }
            }
          }}
        >
        </Card>
      ))}
    </div>
  );
};

export default Grid;
