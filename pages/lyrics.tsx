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
        let pages = response.data.query.pages;
        let wikiID = Object.keys(pages);
        let textContent = response.data.query.pages[wikiID[0]].extract; // Can log these
        mangleLyrics(textContent);
        // TODO: Alternative ideas
        // https://www.npmjs.com/package/markov-strings
        // https://github.com/maximumdata/markov-generator
      })
      .catch(function (error) {
        console.log(`error: ${error}`);
      });
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
