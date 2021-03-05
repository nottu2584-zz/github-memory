import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  const nRandom = (number, arr) => {
    if (number && number > 1) {
      const a = [];
      for (let i = 0; i < number; i++) {
        a.push(arr[Math.floor(Math.random() * arr.length)]);
      }
      return a;
    } else
      return arr[Math.floor(Math.random() * arr.length)];
  };

  useEffect(() => {
    axios
      .get(
        "https://api.github.com/repos/facebook/react/contributors?per_page=25&page=1"
      )
      .then((res) => {
        const newItems = nRandom(6, res.data.map((item) => {
          return {
            login: item.login,
            avatar: item.avatar_url,
          };
        }));
        console.log("items", newItems);
      });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {items}
      </header>
    </div>
  );
}

export default App;
