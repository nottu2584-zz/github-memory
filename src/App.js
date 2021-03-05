import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  const [items, setItems] = useState();

  useEffect(
    () => {
      axios
        .get(
          "https://api.github.com/repos/facebook/react/contributors"
        )
        .then(res => {
          const newItems = res.data.map(item => {
            return {
              id: item.login,
              avatar: item.avatar_url
            };
          })
          setItems(newItems)
        });
    },
  );

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
