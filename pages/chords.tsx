import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TonePlayer from "../components/TonePlayer";
import chordsStyles from "../styles/modules/Chords.module.scss";
import { COLORS } from "../lib/constants";

interface ChordsState {
  // chords: Array<string>;
  chordTonics: Array<string>;
  fullChords: Array<string>;
  keyOfSong: string;
}

// // highlighter colors

export default function Chords() {
  const [chordTonics, setChordTonics] = useState();
  const [fullChords, setFullChords] = useState();
  const keyOfSong: string = ""; //TODO: Randomize a key, to help determine variable randomness of chords.
  const chordKey: Array<any> = [
    //TODO: This can just be strings. Doesn't need to be object. Or, you can apply extras. sharpFlat and modifier(1,2)
    { chord: "A", sharpFlat: "", modifierOne: "", modifierTwo: "" },
    { chord: "B", sharpFlat: "", modifierOne: "", modifierTwo: "" },
    { chord: "C", sharpFlat: "", modifierOne: "", modifierTwo: "" },
    { chord: "D", sharpFlat: "", modifierOne: "", modifierTwo: "" },
    { chord: "E", sharpFlat: "", modifierOne: "", modifierTwo: "" },
    { chord: "F", sharpFlat: "", modifierOne: "", modifierTwo: "" },
    { chord: "G", sharpFlat: "", modifierOne: "", modifierTwo: "" },
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
    setChordTonics(randomizeChords());
  }, []);

  const randomizeChords = () => {
    let possibleNumberOfChords: Array<number> = [4]; //, 8, 12, 16];
    let numberOfChords: number =
      possibleNumberOfChords[
        Math.floor(Math.random() * possibleNumberOfChords.length)
      ];
    let chordTonicsToAdd: any = [];

    for (var i = 0; i < numberOfChords; i++) {
      let randomNumber = Math.floor(Math.random() * chordKey.length);
      chordTonicsToAdd.push(chordKey[randomNumber].chord);
    }
    setChordTonics(chordTonicsToAdd);
    return chordTonicsToAdd;
  };

  const createFullChordFromChordTonic = (chordTonic: string) => {
    let fullChord: Array<string> = [""];
    switch (chordTonic) {
      case "A":
        fullChord = ["A4", "C#4", "E4"];
        break;
      case "B":
        fullChord = ["B4", "D#4", "F#4"];
        break;
      case "C":
        fullChord = ["C4", "E4", "G4"];
        break;
      case "D":
        fullChord = ["D4", "F#4", "A4"];
        break;
      case "E":
        fullChord = ["E4", "G#4", "B4"];
        break;
      case "F":
        fullChord = ["F4", "A4", "C4"];
        break;
      case "G":
        fullChord = ["G4", "D4", "B4"];
        break;
    }
    return fullChord;
  };

  const playChords = () => {};

  return (
    <Layout>
      <div className={chordsStyles.chordHolder}>
        <h1>Generate Chords</h1>
        <button onClick={() => playChords()}>Play next chord</button>
        <button onClick={() => randomizeChords()}>Randomize chords</button>
        <div className="chord-holder">
          {chordTonics
            ? chordTonics.map((chordTonic: any, index: number) => (
                <div className={`chordBox ${chordTonic}`} key={index}>
                  <span>{chordTonic}</span>
                </div>
              ))
            : null}
        </div>
        <TonePlayer
          fullChords={fullChords}
          createFullChordFromChordTonic={createFullChordFromChordTonic} //Not needed? Just send chords
          // sendChordsToPlayer={sendChordsToPlayer}
        />
      </div>
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
            background: ${COLORS.hotPink};
          }
          .B {
            background: ${COLORS.softAqua};
          }
          .C {
            background: ${COLORS.softGreen};
          }
          .D {
            background: ${COLORS.hotPurple};
          }
          .E {
            background: ${COLORS.hotCyan};
          }
          .F {
            background: ${COLORS.hotOrange};
          }
          .G {
            background: ${COLORS.hotRed};
          }
        `}
      </style>
    </Layout>
  );
}
