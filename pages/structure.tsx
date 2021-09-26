import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

interface StructureState {
  structure: any;
}

export default function Structure() {
  const [structure, setStructure] = useState([]);

  useEffect(() => {
    setStructure(randomizeSongStructure());
  }, []);

  const randomizeSongStructure = () => {
    const songStructureParts = ["A", "B", "C", "D", "Intro", "Outro", "Bridge"];
    let randomNumberOfParts = Math.floor(Math.random() * 5) + 3;
    let songStructure: any = [];
    for (var i = 0; i < randomNumberOfParts; i++) {
      songStructure.push(
        songStructureParts[
          Math.floor(Math.random() * songStructureParts.length)
        ]
      );
    }
    setStructure(songStructure);
    return songStructure;
    //working but doesn't make sense, haha. ABCs need to be in order. Intro needs to be first. Outro needs to be last.
  };

  return (
    <div>
      <h1>Generate Song Structure</h1>
      <button onClick={() => randomizeSongStructure()}>
        Randomize a song structure
      </button>
      <div>{structure}</div>
    </div>
  );
}
