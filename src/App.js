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
        const newItems = nRandom(6, res.data.map((item) => {
          return {
            id: item.id,
            avatar: item.avatar_url,
          };
        })).sort(() => 0.5 - Math.random()); // Between -1 <> 1
        console.log('items', newItems)
        setItems(newItems);
      });
  }, []);

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

  return (
    <div className="App">
      <header className="App-header">
        Github Memory
      </header>
      <div>
        {items.map((item) => item.avatar)}
      </div>
    </div>
  );
}

export default App;
