import React, { useState } from "react";
import Quote from "./Quote";
import "./quote.css";
import Liked from "./Liked";

function App() {
  const [info, setInfo] = useState(null);

  const handleDataFromChild = (data) => {
    setInfo(data);
  };

  return (
    <>
      <Liked likedArr={info} />
      <div className="quoteBoxContainer">
        <Quote passFunction={handleDataFromChild} />
        <p id="byBaraka">by Baraka Karuru</p>
      </div>
    </>
  );
}

export default App;
