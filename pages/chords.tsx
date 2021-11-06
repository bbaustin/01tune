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
    { chord: "A", safeName: "A", modifierOne: "", modifierTwo: "", placement: 0 },
    { chord: "A#", safeName: "Asharp", modifierOne: "", modifierTwo: "", placement: 1 },
    { chord: "B", safeName: "B", modifierOne: "", modifierTwo: "", placement: 2 },
    { chord: "C", safeName: "C", modifierOne: "", modifierTwo: "", placement: 3 },
    { chord: "C#", safeName: "Csharp", modifierOne: "", modifierTwo: "", placement: 4 },
    { chord: "D", safeName: "D", modifierOne: "", modifierTwo: "", placement: 5 },
    { chord: "D#", safeName: "Dsharp", modifierOne: "", modifierTwo: "", placement: 6 },
    { chord: "E", safeName: "E", modifierOne: "", modifierTwo: "", placement: 7 },
    { chord: "F", safeName: "F", modifierOne: "", modifierTwo: "", placement: 8 },
    { chord: "F#", safeName: "Fsharp", modifierOne: "", modifierTwo: "", placement: 9 },
    { chord: "G", safeName: "G", modifierOne: "", modifierTwo: "", placement: 10 },
    { chord: "G#", safeName: "Gsharp", modifierOne: "", modifierTwo: "", placement: 11 },
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
        placement: chordKey[randomNumber].placement
      });
    }
    setChordTonics(chordTonicsToAdd);
    createFullChordsFromChordTonic(chordTonicsToAdd);
    return chordTonicsToAdd;
  };

  const createFullChordsFromChordTonic = (chordTonics: any) => {
    let fullChords: any = [];
    if (chordTonics) {
      for (var i = 0; i < chordTonics.length; i++) {
        let fullChord: any = [];
        let tonic = chordTonics[i].placement;
        let third = loopBackToZero(chordTonics[i].placement + 4);
        let fifth = loopBackToZero(chordTonics[i].placement + 7);
        fullChord.push(`${chordKey[tonic].chord}3`, `${chordKey[tonic].chord}4`, `${chordKey[third].chord}4`, `${chordKey[fifth].chord}4`);
        fullChords.push(fullChord);
      }
    }
    setFullChords(fullChords);
    return fullChords;
  };

  const loopBackToZero = (placement: number) => {
    if (placement > 11) 
      {return placement - 12}
    return placement;
  }

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
