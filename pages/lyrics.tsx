import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import lyricsStyles from "../styles/modules/Lyrics.module.scss";

import axios from "axios";

interface LyricsState {
  lyrics: any;
  userInput: string;
}

export default function Lyrics() {
  const [lyrics, setLyrics] = useState([]);
  const [userInput, setUserInput] = useState("");

  const getLyrics = () => {
    let newString = "";
    if (userInput) {
      for (var i = 0; i < userInput.length; i++) {
        if (userInput[i] == " ") {
          newString += "+";
        } else newString += userInput[i];
      }
    }
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&explaintext&redirects=1&origin=*&titles=${newString}`
      )
      .then(function (response) {
        console.log("response");
        console.log(response);
        console.log("---");

        let pages = response.data.query.pages;
        let wikiID = Object.keys(pages);
        let textContent = response.data.query.pages[wikiID[0]].extract;
        console.log("response");
        console.log(textContent);
        console.log("---");
        mangleLyrics(textContent);
        // return textContent;
      })
      .catch(function (error) {
        console.log(`error: ${error}`);
      });
    //}
    // } else {
    //   setLyrics(["Please", "choose", "a", "theme!"]);
    //   return "Please choose a theme!";
    // }
  };

  const mangleLyrics = (lyrics: any) => {
    console.log("lyrics");
    console.log(lyrics);
    console.log("---");
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
    <Layout>
      <h1>Generate Lyrics</h1>
      <p>What is your song about?</p>
      <input
        placeholder="Type a song theme here"
        onChange={handleChange}
      ></input>
      <button onClick={() => getLyrics()}>Generate lyrics</button>
      <div className={lyricsStyles.lyricsHolder}>{lyrics}</div>
    </Layout>
  );
}
