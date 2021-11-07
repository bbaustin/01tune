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
  const [chordTypes, setChordTypes] = useState();
  const keyOfSong: string = ""; //TODO: Randomize a key, to help determine variable randomness of chords.
  const chordKey: Array<any> = [
    { chord: "A", safeName: "A", placement: 0 },
    { chord: "A#", safeName: "Asharp", placement: 1 },
    { chord: "B", safeName: "B", placement: 2 },
    { chord: "C", safeName: "C", placement: 3 },
    { chord: "C#", safeName: "Csharp", placement: 4 },
    { chord: "D", safeName: "D", placement: 5 },
    { chord: "D#", safeName: "Dsharp", placement: 6 },
    { chord: "E", safeName: "E", placement: 7 },
    { chord: "F", safeName: "F", placement: 8 },
    { chord: "F#", safeName: "Fsharp", placement: 9 },
    { chord: "G", safeName: "G", placement: 10 },
    { chord: "G#", safeName: "Gsharp", placement: 11 },
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
        placement: chordKey[randomNumber].placement,
      });
    }
    setChordTonics(chordTonicsToAdd);
    createFullChordsFromChordTonic(chordTonicsToAdd);
    return chordTonicsToAdd;
  };

  const determineChordType = () => {
    let randomNumber = Math.floor(Math.random() * 10);
    let chordType = "";
    if (randomNumber % 3 == 0) {
      chordType += "m";
    }
    // TODO: more here... 7, 6, aug, dim, etc.
    return chordType;
  };

  const createFullChordsFromChordTonic = (chordTonics: any) => {
    let fullChords: any = [];
    let allChordTypes: any = [];
    if (chordTonics) {
      for (var i = 0; i < chordTonics.length; i++) {
        let chordType = determineChordType();
        allChordTypes.push(chordType);
        let fullChord: any = [];
        let tonic = chordTonics[i].placement;
        let third;
        if (chordType == "m") {
          third = loopBackToZero(chordTonics[i].placement + 3);
        } else {
          third = loopBackToZero(chordTonics[i].placement + 4);
        }
        let fifth = loopBackToZero(chordTonics[i].placement + 7);
        fullChord.push(
          `${chordKey[tonic].chord}3`,
          `${chordKey[tonic].chord}4`,
          `${chordKey[third].chord}4`,
          `${chordKey[fifth].chord}4`
        );
        fullChords.push(fullChord);
      }
    }
    setChordTypes(allChordTypes);
    setFullChords(fullChords);
    return fullChords;
  };

  /*
    Since A=0 and G#=11, we need to "loop back to zero" 
    to make sure we're playing the right notes.
  */
  const loopBackToZero = (placement: number) => {
    if (placement > 11) {
      return placement - 12;
    }
    return placement;
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
                  <span>{chordTypes[index]}</span>
                </div>
              ))
            : null}

          <TonePlayer
            chordTonics={chordTonics}
            fullChords={fullChords}
            randomizeChords={randomizeChords}
          />
        </div>
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
