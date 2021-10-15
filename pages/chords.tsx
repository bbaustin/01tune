import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TonePlayer from "../components/TonePlayer";
import chordsStyles from "../styles/modules/Chords.module.scss";

interface ChordsState {
  // chords: Array<string>;
  chords: any;
}

// // highlighter colors
const softPink = "#ff81d3";
const hotPink = "#ff68ca";
const softPurple = "#b6b0ff";
const hotPurple = "#c180ff";
const hotCyan = "#14e7ff";
const softCyan = "#92dce5";
const hotAqua = "#39d4bb";
const softAqua = "#399999";
const hotGreen = "#48ff14";
const softGreen = "#2fb863";
const hotYellow = "#eeff14";
const hotOrange = "#dfae45";
const softOrange = "#e9c194";
const hotRed = "#dd7474";
const softRed = "#e99999";

export default function Chords() {
  const [chords, setChords] = useState();
  const chordKey: Array<any> = [
    //TODO: COlors?
    { chord: "A", color: "#ff81d3" },
    { chord: "B", color: "#39d4bb" },
    { chord: "C", color: "#dfae45" },
    { chord: "D", color: "#b6b0ff" },
    { chord: "E", color: "#eeff14" },
    { chord: "F", color: "#14e7ff" },
    { chord: "G", color: "#dd7474" },
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
    let randomNumberOfChords: Array<number> = [4]; //, 8, 12, 16];
    let theNumber: number =
      randomNumberOfChords[
        Math.floor(Math.random() * randomNumberOfChords.length)
      ];
    let chordsToAdd: any = [];

    for (var i = 0; i < theNumber; i++) {
      let randomNumber = Math.floor(Math.random() * chordKey.length);
      chordsToAdd.push(chordKey[randomNumber].chord);
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
          {chords
            ? chords.map((oneChord: any, index: number) => (
                <div className={`chordBox ${oneChord}`} key={index}>
                  <span>{oneChord}</span>
                </div>
              ))
            : null}
          <style global jsx>
            {`
              span {
                font-size: 36px;
                color: white;
              }
              .A {
                background: $hotpink;
              }
              .chordBox {
                width: 100px;
                height: 50px;
                display: inline-block;
                border-radius: 25px;
                margin: 10px 10px 0px 0px;
              }

              .A {
                background: ${hotPink};
              }
              .B {
                background: ${softAqua};
              }
              .C {
                background: ${softGreen};
              }
              .D {
                background: ${hotPurple};
              }
              .E {
                background: ${hotCyan};
              }
              .F {
                background: ${hotOrange};
              }
              .G {
                background: ${hotRed};
              }
            `}
          </style>
        </div>
        <TonePlayer tones={chords} />
      </div>
    </Layout>
  );
}
