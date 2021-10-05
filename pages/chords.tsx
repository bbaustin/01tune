import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TonePlayer from "../components/TonePlayer";
import chordsStyles from "../styles/modules/Chords.module.scss";

interface ChordsState {
  // chords: Array<string>;
  chords: any;
}

export default function Chords() {
  const [chords, setChords] = useState();
  const chordKey: Array<any> = [
    { chord: "A", color: "red" },
    { chord: "B", color: "blue" },
    { chord: "C", color: "orange" },
    { chord: "D", color: "purple" },
    { chord: "E", color: "yellow" },
    { chord: "F", color: "green" },
    { chord: "G", color: "pink" },
  ];
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
      let randomNumber = Math.floor(Math.random() * chordKey.length);
      chordsToAdd.push(
        chordKey[Math.floor(Math.random() * chordKey.length)].chord
        // [
        //   {
        //     chord: chordKey[Math.floor(Math.random() * chordKey.length)].chord,
        //     color: chordKey[randomNumber].color,
        //   },
        // ]
      );
    }
    setChords(chordsToAdd);
    return chordsToAdd;
  };

  const playChords = () => {};

  return (
    <Layout>
      <div className={chordsStyles.chordHolder}>
        <h1>Generate Chords</h1>
        <button onClick={() => playChords()}>Play next chord</button>
        <button onClick={() => randomizeChords()}>Randomize chords</button>
        <div className="chord-holder">
          {/* {{ chords }
            ? { chords }.map((oneChord: string, keyId: number) => (
              <span key={keyId} style={{ color: oneChord }}>
                {oneChord}
              </span>
            ))
          : null} */}
          {chords
            ? chords.map((oneChord) => (
                <div className={`${chordsStyles.chordBox} ${oneChord}`}>
                  <span className={oneChord}>{oneChord}</span>
                </div>
              ))
            : null}
        </div>

        {/* <p>{chords}</p> */}
        <TonePlayer tones={chords} />
      </div>
    </Layout>
  );
}
