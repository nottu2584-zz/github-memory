import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.github.com/repos/facebook/react/contributors?per_page=25&page=1"
      )
      .then((res) => {
        const newItems = shuffle(res.data.map((item) => {
          return {
            id: item.id,
            avatar: item.avatar_url,
          };
        })).slice(0,6); // Get 6 contributors from the suffle

        setItems(
          newItems.concat(
            newItems.map((item) => {
              return {
                ...item,
                id: item.id,
              };
            })
          )
        );
      });
  }, []);

  const  shuffle = (arr) => {
    var currentIndex = arr.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
  
    return arr;
  }

  return (
    <div className="App">
      <header className="App-header">Github Memory</header>
      <ul>
        {items.map((item) => {
          return <li>{item.avatar}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
