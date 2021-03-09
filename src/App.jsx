import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid/Grid";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [finishedItems, setFinishedItems] = useState([]);
  const [game, setGame] = useState(false);
  const [items, setItems] = useState([]);
  const [modal, showModal] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState();
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    // Start game at load
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Load timer on game state
    let interval = null;
    if (game && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (!game) {
      clearInterval(interval);
    } else if (time === 0) {
      showModal(true);
      setGame(false);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    // End game when items found
    if (finishedItems.length > 0 && finishedItems.length === items.length) {
      showModal(true);
      setGame(false);
    }
  }, [finishedItems, items]);

  /**
   * Identifies and stores found items
   * @param {Number} firstIndex 
   * @param {Number} secondIndex 
   */
  const checkItems = (firstIndex, secondIndex) => {
    if (
      firstIndex !== secondIndex &&
      items[firstIndex].id === items[secondIndex].id
    ) {
      // Found. Increment score and store
      setScore(score + 100);
      setFinishedItems([...finishedItems, firstIndex, secondIndex]);
    } else {
      setTimeout(() => {
        setVisibleItems([]);
      }, 500);
    }
  };

  /**
   * Resets item states
   */
  const cleanUpGame = () => {
    setVisibleItems([]);
    setFinishedItems([]);
    setItems([]);
    setScore(0);
  };

  /**
   * Fisher-Yates shuffle implementation
   * @param   {Array} arr The array to shuffle
   * @returns {Array}
   */
  const shuffle = (arr) => {
    var currentIndex = arr.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }

    return arr;
  };

  /**
   * Starts the game asynchronously
   */
  const startGame = async () => {
    showModal(false);
    cleanUpGame();
    axios
      .get(
        "https://api.github.com/repos/facebook/react/contributors?per_page=25&page=1"
      )
      .then((res) => {
        const newItems = shuffle(
          res.data.map((item) => {
            return {
              id: item.id,
              avatar: item.avatar_url,
              login: item.login,
            };
          })
        ).slice(0, 6); // Get first 6 contributors from the shuffle

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
      })
      .then(() => {
        // Start new game when contributors are loaded
        setGame(true);
        setTime(60);
      });
  };

  return (
    <div className="App">
      <header className="App-header">Github Memory</header>
      <div className="App-content">
        <Grid
          items={items}
          visibleItems={visibleItems}
          setVisibleItems={setVisibleItems}
          finishedItems={finishedItems}
          checkItems={checkItems}
        ></Grid>
      </div>
      <footer className="App-footer">
        <div className="time">Time: {time} seconds</div>
        <div className="score">Score: {score}</div>
      </footer>
      <Modal visible={modal}>
        <div className="title">
          Game
          <br /> Over
        </div>
        <div className="score">Score: {score}</div>
        <div className="button">
          <button onClick={startGame}>New game!</button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
