import React, { useEffect, useState } from "react";
import "./quote.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

function Quote({ passFunction }) {
  const [quote, setQuote] = useState(
    "Test Quote... This is just a test quote."
  );
  const [author, setAuthor] = useState("Test Author");
  const [isLoading, setLoading] = useState(false);
  const [likedArr, setLikedArr] = useState([]);
  const [randomColor, setRandomColor] = useState([89, 0, 167]);

  useEffect(() => {
    // Call back function (passFunction) called only when likedArr state changes.
    passFunction(likedArr);
  }, [likedArr]);

  useEffect(() => {
    getQuote();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--background",
      `rgb(${randomColor[0]},${randomColor[1]}, ${randomColor[2]})`
    );
  }, [randomColor]);

  const getQuote = async () => {
    setLoading(true);

    setRandomColor(() => {
      let generatedArr = [];
      for (let i = 0; i < 3; i++) {
        let randomValue = Math.floor(Math.random() * 256);
        generatedArr.push(randomValue);
      }
      return generatedArr;
    });

    const heart = document.getElementById("heart");
    heart.style.color = "white";
    heart.style.boxShadow = "none";

    try {
      const data = await fetch("https://api.quotable.io/random");
      const info = await data.json();
      setQuote(info.content);
      setAuthor(info.author);
    } catch (error) {
      alert(
        `Error Fetching Quote (Possible issues -> Internet Disconnected)  -  ${error}`
      );
    } finally {
      setLoading(false);
    }
  };

  const like = () => {
    //function to be called when the user likes a quote.
    const heart = document.getElementById("heart");
    if (heart.style.color === "red") {
      let filtered = likedArr.filter((value) => value.quote !== quote);
      setLikedArr(filtered);
      heart.style.color = "white";
      heart.style.boxShadow = "none";
    } else {
      heart.style.color = "red";
      heart.style.boxShadow = "0 0 10px red";
      setLikedArr((prevLikedArr) => [
        ...prevLikedArr,
        { quote: quote, author: author },
      ]);
    }
  };

  return (
    <div id="quote-box">
      {isLoading ? <Loading /> : null}
      <div id="text">
        <h1 className={isLoading ? "loading" : ""}>{quote}</h1>
      </div>
      <div id="author">
        <p className={isLoading ? "loading" : ""}>-{author}</p>
      </div>
      <div className="wrapper">
        <div>
          <a
            href={`https://twitter.com/intent/tweet?text=${quote}`}
            id="tweet-quote"
            target="_blank"
          >
            <button>
              <FontAwesomeIcon icon={faTwitter} />
            </button>
          </a>
          <button id="heart" onClick={like}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <div>
          <button id="new-quote" onClick={getQuote}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quote;
