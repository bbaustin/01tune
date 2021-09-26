import React, { useEffect, useState } from "react";
import TonePlayer from "../components/TonePlayer";

interface ChordsState {
  // chords: Array<string>;
  chords: any;
}

export default function Chords() {
  const [chords, setChords] = useState();
  const chordKey: Array<string> = ["A", "B", "C", "D", "E", "F", "G"];
  const chordExtras: any = [
    {
      type: "sharp",
      frequency: 10,
    },
    {
      type: "flat",
      frequency: 10,
    },
    {
      type: "",
      frequency: 10,
    },
    {
      type: "minor",
      frequency: 7,
    },
    {
      type: "7",
      frequency: 2,
    },
    {
      type: "maj7",
      frequency: 2,
    },
    {
      type: "min7",
      frequency: 2,
    },
    {
      type: "6",
      frequency: 2,
    },
    {
      type: "dim",
      frequency: 1,
    },
    {
      type: "aug",
      frequency: 1,
    },
  ];
  useEffect(() => {
    setChords(randomizeChords());
  }, []);

  const randomizeChords = () => {
    // let numberOfChords: number;
    let randomNumberOfChords: Array<number> = [4, 8, 12, 16];
    let theNumber: number =
      randomNumberOfChords[
        Math.floor(Math.random() * randomNumberOfChords.length)
      ];
    let chordsToAdd: any = [];

    for (var i = 0; i < theNumber; i++) {
      chordsToAdd.push(chordKey[Math.floor(Math.random() * chordKey.length)]);
    }
    setChords(chordsToAdd);
    return chordsToAdd;
  };

  return (
    <div className="generate-chords">
      <h1>Generate Chords</h1>
      <button onClick={() => randomizeChords()}>Randomize chords</button>
      <div className="chord-holder">{chords}</div>
      <TonePlayer tones={chords} />
    </div>
  );
}
