import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  SONG_STRUCTURE_PARTS,
  SONG_STRUCTURE_ADDITIONS,
} from "../lib/constants";

interface StructureState {
  structure: Array<string>;
}

export default function Structure() {
  const [structure, setStructure] = useState([]);

  useEffect(() => {
    setStructure(randomizeSongStructure());
  }, []);

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
        console.log(counter);
        console.log(key);
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

  const randomizeSongStructure = () => {
    let randomNumberOfParts = Math.floor(Math.random() * 5) + 3;
    let songStructure: any = [];
    for (let i = 0; i < randomNumberOfParts; i++) {
      songStructure.push(
        SONG_STRUCTURE_PARTS[
          Math.floor(Math.random() * SONG_STRUCTURE_PARTS.length)
        ] + " "
      );
    }
    songStructure = removeIntroIfNotFirst(
      removeOutroIfNotLast(orderParts(songStructure))
    );
    setStructure(songStructure);
    return songStructure;
    //working but doesn't make sense, haha. ABCs need to be in order. Intro needs to be first. Outro needs to be last.
  };

  return (
    <Layout>
      <h1>Generate Song Structure</h1>
      <button onClick={() => randomizeSongStructure()}>
        Randomize a song structure
      </button>
      <div>{structure}</div>
    </Layout>
  );
}
