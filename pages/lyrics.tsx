import React, { useEffect, useState } from "react";
import axios from "axios";

interface LyricsState {
  lyrics: any;
  userInput: string;
}

export default function Lyrics() {
  const [lyrics, setLyrics] = useState([]);
  const [userInput, setUserInput] = useState("");

  const getLyrics = () => {
    //if (userInput) {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&explaintext&redirects=1&origin=*&titles=${userInput}`
      )
      .then(function (response) {
        console.log(response);
        let pages = response.data.query.pages;
        let wikiID = Object.keys(pages);
        let textContent = response.data.query.pages[wikiID[0]].extract;
        console.log(textContent);
        mangleLyrics(textContent);
        // return textContent;
      })
      .catch(function (error) {
        console.log(error);
      });
    //}
    // } else {
    //   setLyrics(["Please", "choose", "a", "theme!"]);
    //   return "Please choose a theme!";
    // }
  };

  const mangleLyrics = (lyrics: any) => {
    console.log(lyrics);
    let individualWords = lyrics.split(" ");
    let newLyrics: string = "";
    for (var i = 0; i < 25; i++) {
      newLyrics +=
        " " +
        individualWords[Math.floor(Math.random() * individualWords.length)];
    }
    newLyrics = newLyrics
      .replace(/[.",\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .replace(/\s{2,}/g, " ")
      .toLowerCase();
    setLyrics(newLyrics);
  };

  //TODO: This would be better than having the mangle call in the then of getLyrics
  // const generateLyrics = () => { //need async here
  //   let lyricsToMangle = getLyrics();
  //   mangleLyrics(lyricsToMangle);
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <h1>Generate Lyrics</h1>
      <p>What is your song about?</p>
      <input
        placeholder="Type a song theme here"
        onChange={handleChange}
      ></input>
      <button onClick={() => getLyrics()}>Generate lyrics</button>
      <div className="lyrics-holder">{lyrics}</div>
    </div>
  );
}
