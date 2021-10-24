import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TonePlayer from "../components/TonePlayer";
import { COLORS } from "../lib/constants";

interface ChordsState {
  chordTonics: Array<string>;
  fullChords: Array<string>;
  keyOfSong: string;
}

export default function Chords() {
  const [chordTonics, setChordTonics] = useState();
  const [fullChords, setFullChords] = useState();
  const keyOfSong: string = ""; //TODO: Randomize a key, to help determine variable randomness of chords.
  const chordKey: Array<any> = [
    { chord: "A", safeName: "A", modifierOne: "", modifierTwo: "" },
    { chord: "A#", safeName: "Asharp", modifierOne: "", modifierTwo: "" },
    { chord: "B", safeName: "B", modifierOne: "", modifierTwo: "" },
    { chord: "C", safeName: "C", modifierOne: "", modifierTwo: "" },
    { chord: "C#", safeName: "Csharp", modifierOne: "", modifierTwo: "" },
    { chord: "D", safeName: "D", modifierOne: "", modifierTwo: "" },
    { chord: "D#", safeName: "Dsharp", modifierOne: "", modifierTwo: "" },
    { chord: "E", safeName: "E", modifierOne: "", modifierTwo: "" },
    { chord: "F", safeName: "F", modifierOne: "", modifierTwo: "" },
    { chord: "F#", safeName: "Fsharp", modifierOne: "", modifierTwo: "" },
    { chord: "G", safeName: "G", modifierOne: "", modifierTwo: "" },
    { chord: "G#", safeName: "Gsharp", modifierOne: "", modifierTwo: "" },
  ];
  const chordExtras: any = [
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
    setChordTonics(randomizeChords);
  }, []);

  const randomizeChords = () => {
    let possibleNumberOfChords: Array<number> = [4, 8]; //, 8, 12, 16];
    let numberOfChords: number =
      possibleNumberOfChords[
        Math.floor(Math.random() * possibleNumberOfChords.length)
      ];
    let chordTonicsToAdd: any = [];

    for (var i = 0; i < numberOfChords; i++) {
      let randomNumber = Math.floor(Math.random() * chordKey.length);
      chordTonicsToAdd.push({
        chordTonic: chordKey[randomNumber].chord,
        safeName: chordKey[randomNumber].safeName,
      });
    }
    setChordTonics(chordTonicsToAdd);
    createFullChordsFromChordTonic(chordTonicsToAdd);
    return chordTonicsToAdd;
  };

  const createFullChordsFromChordTonic = (chordTonics: any) => {
    let fullChord: any = [];
    let fullChords: any = [];
    if (chordTonics) {
      for (var i = 0; i < chordTonics.length; i++) {
        switch (chordTonics[i].chordTonic) {
          case "A":
            fullChord = ["A3", "A4", "C#4", "E3"];
            break;
          case "A#":
            fullChord = ["A#3", "A#4", "D4", "F3"];
            break;
          case "B":
            fullChord = ["B3", "B4", "D#4", "F#3"];
            break;
          case "C":
            fullChord = ["C3", "C4", "E4", "G3"];
            break;
          case "C#":
            fullChord = ["C#3", "C#4", "F4", "G#3"];
            break;
          case "D":
            fullChord = ["D3", "D4", "F#4", "A3"];
            break;
          case "D#":
            fullChord = ["D#3", "D#4", "G4", "A#3"];
            break;
          case "E":
            fullChord = ["E3", "E4", "G#4", "B3"];
            break;
          case "F":
            fullChord = ["F3", "F4", "A4", "C3"];
            break;
          case "F#":
            fullChord = ["F#3", "F#4", "A#4", "C#3"];
            break;
          case "G":
            fullChord = ["G3", "G4", "D4", "B3"];
            break;
          case "G#":
            fullChord = ["G#3", "G#4", "D#4", "C3"];
            break;
        }
        fullChords.push(fullChord);
      }
      setFullChords(fullChords);
      return fullChords;
    }
  };

  return (
    <Layout>
      <div className="chordHolder">
        <h1>Generate Chords</h1>
        <div className="chordHolder">
          {chordTonics
            ? chordTonics.map((chordTonic: any, index: number) => (
                <div className={`chordBox ${chordTonic.safeName}`} key={index}>
                  <span>{chordTonic.chordTonic}</span>
                </div>
              ))
            : null}
        </div>
        <TonePlayer
          chordTonics={chordTonics}
          fullChords={fullChords}
          createFullChordsFromChordTonic={createFullChordsFromChordTonic} //Not needed? Just send chords
          randomizeChords={randomizeChords}
        />
      </div>
      <style global jsx>
        {`
          span {
            font-size: 36px;
            color: white;
          }
          .chordBox {
            width: 100px;
            height: 50px;
            display: inline-block;
            border-radius: 25px;
            margin: 10px 10px 0px 0px;
          }
          .generateChords {
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
          }
          .chordHolder {
            margin: 5px 0px 15px 0px;
            overflow-wrap: anywhere;
            width: 440px;
          }

          .Asharp {
            background: ${COLORS.hotPink};
          }
          .A {
            background: ${COLORS.softPink};
          }
          .B {
            background: ${COLORS.softAqua};
          }
          .C {
            background: ${COLORS.softGreen};
          }
          .Csharp {
            background: ${COLORS.hotGreen};
          }
          .D {
            background: ${COLORS.hotPurple};
          }
          .Dsharp {
            background: ${COLORS.softPurple};
          }
          .E {
            background: ${COLORS.hotCyan};
          }
          .F {
            background: ${COLORS.hotOrange};
          }
          .Fsharp {
            background: ${COLORS.softOrange};
          }
          .G {
            background: ${COLORS.hotRed};
          }
          .Gsharp {
            background: ${COLORS.softRed};
          }
        `}
      </style>
    </Layout>
  );
}
