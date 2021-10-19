import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  SONG_STRUCTURE_PARTS,
  SONG_STRUCTURE_ADDITIONS,
  COLORS,
} from "../lib/constants";

interface StructureState {
  structure: Array<string>;
}

export default function Structure() {
  const [structure, setStructure] = useState([]);
  const [gradientColors, setGradientColors] = useState([]);

  useEffect(() => {
    setStructure(randomizeSongStructure());
  }, []);

  const randomizeGradientColors = () => {
    const colorChoices: Object = Object.entries(COLORS);
    let keys = Object.keys(colorChoices);
    let leftAndRightColors: Array<string> = [
      colorChoices[keys[createRandomNumber(colorChoices.length)]][1],
      colorChoices[keys[createRandomNumber(colorChoices.length)]][1],
    ];
    if (leftAndRightColors[0] == leftAndRightColors[1]) {
      leftAndRightColors[1] = "#bbbbbb";
    }
    setGradientColors(leftAndRightColors);
    return leftAndRightColors;
  };

  const removeIntroIfNotFirst = (structure: Array<string>) => {
    let newStructureWithoutIntros = [structure[0]];
    for (let i = 1; i < structure.length; i++) {
      if (structure[i] !== "Intro ") {
        //NOTE: Please note the space here. Added in randomizeSongStructure. If you change that, remember to change it here, too.
        newStructureWithoutIntros.push(structure[i]);
      }
    }
    return newStructureWithoutIntros;
  };

  const removeOutroIfNotLast = (structure: Array<string>) => {
    let newStructureWithoutOutros = [];
    for (let i = 0; i < structure.length - 1; i++) {
      if (structure[i] !== "Outro ") {
        //NOTE: Please note the space here. Added in randomizeSongStructure. If you change that, remember to change it here, too.
        newStructureWithoutOutros.push(structure[i]);
      }
    }
    newStructureWithoutOutros.push(structure[structure.length - 1]);
    return newStructureWithoutOutros;
  };

  const orderParts = (structure: Array<string>) => {
    let orderedParts = new Set();
    for (let i = 0; i < structure.length; i++) {
      if (
        structure[i] == "aPart " ||
        structure[i] == "anotherPart " ||
        structure[i] == "yetAnotherPart " ||
        structure[i] == "somePart "
      ) {
        orderedParts.add(structure[i]);
      }
      let counter: number = 0;
      let realParts = ["A ", "B ", "C ", "D "];
      for (let key of orderedParts) {
        for (let i = 0; i < structure.length; i++) {
          if (structure[i] == key) {
            structure[i] = realParts[counter];
          }
        }
        counter++;
      }
    }
    return structure;
  };

  const createRandomNumber = (multiplyBy: number) => {
    return Math.floor(Math.random() * multiplyBy);
  };

  //TODO: Make Intro Reprise?
  //TODO: Make Structure Additions
  //TODO: Add percentages to parts. E.g., tone down "Bridge," tone up "ABCD and Chorus." "Intro and Outro" are fine, based on the exisiting limitations on them

  const randomizeSongStructure = () => {
    let randomNumberOfParts = createRandomNumber(5) + 4;
    let songStructure: any = [];
    for (let i = 0; i < randomNumberOfParts; i++) {
      songStructure.push(
        SONG_STRUCTURE_PARTS[createRandomNumber(SONG_STRUCTURE_PARTS.length)] +
          " "
      );
    }
    songStructure = removeIntroIfNotFirst(
      removeOutroIfNotLast(orderParts(songStructure))
    );
    randomizeGradientColors();
    setStructure(songStructure);
    return songStructure;
  };

  return (
    <Layout>
      <h1 style={{ marginBottom: "10px" }}>Generate Song Structure</h1>
      <button onClick={() => randomizeSongStructure()}>
        Randomize a song structure
      </button>
      <h2 className="structureText">{structure}</h2>
      <style jsx>
        {`
          .structureText {
            background-color: red;

            background-image: linear-gradient(
              45deg,
              ${gradientColors[0]},
              ${gradientColors[1]}
            );

            background-size: 100%;
            background-repeat: repeat;

            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -moz-background-clip: text;
            -moz-text-fill-color: transparent;
          }
        `}
      </style>
    </Layout>
  );
  {
    /* TODO: Randomize gradient, or make each type a different color (like with
        chords) */
  }
}
