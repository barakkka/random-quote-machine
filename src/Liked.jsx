import React, { useEffect } from "react";
import "./quote.css";

function Liked({ likedArr }) {
  useEffect(() => {
    const likedContainer = document.getElementById("likedContainer");
    const quoteBoxContainer = document.querySelector(".quoteBoxContainer");

    const resize = () => {
      if (window.innerWidth < 768) {
        likedContainer.style.width = "25rem";
      } else {
        likedContainer.style.width = "30rem";
      }
    };
    window.addEventListener("resize", resize);
    resize();
  }, []);

  const showFavorites = () => {
    //Check if likedContainer is already open
    const likedContainer = document.getElementById("likedContainer");
    const quoteBoxContainer = document.querySelector(".quoteBoxContainer");
    if (likedContainer.style.marginLeft !== "0rem") {
      likedContainer.style.marginLeft = "0rem";

      quoteBoxContainer.style.filter = "blur(3px)";
      quoteBoxContainer.style.opacity = "80%";
      quoteBoxContainer.style.pointerEvents = "none";
    } else {
      if (window.innerWidth < 768) {
        likedContainer.style.marginLeft = "-25rem";
      } else {
        likedContainer.style.marginLeft = "-30rem";
      }
      quoteBoxContainer.style.filter = "none";
      quoteBoxContainer.style.opacity = "1000%";
      quoteBoxContainer.style.pointerEvents = "all";
    }
  };

  return (
    <div id="likedContainer">
      <div id="extender">
        <button id="favorites" onClick={showFavorites}>
          Favorites
        </button>
      </div>
      <div id="content">
        {likedArr !== null && likedArr !== undefined ? (
          likedArr.map((value, index) => (
            <div key={index} id="eachLiked">
              <h2 id="likedQuote">{value.quote}</h2>
              <p id="likedAuthor">- {value.author}</p>
              <hr />
            </div>
          ))
        ) : (
          <div id="eachLiked">
            <h2 id="likedQuote">No Quote Liked Yet</h2>
            <p id="likedAuthor">- Test Author</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Liked;
