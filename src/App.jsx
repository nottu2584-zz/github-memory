import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Grid from "./Grid";

function App() {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

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
            login: item.login
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

      // Start timer
      restartTime();
  }, []);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => setTime(time - 1), 1000);
    } else {
      // End game.
    }
  }, [time]);

  const restartTime = () => {
    setTime(60);
  };

  const shuffle = (arr) => {
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
      <div className="App-content">
        <Grid items={items}></Grid>
      </div>
      <footer className="App-footer">
        <div className="time">Time: {time} seconds</div>
        <div className="score">Score: {score}</div>
      </footer>
    </div>
  );
}

export default App;
