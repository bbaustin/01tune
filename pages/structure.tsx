import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

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
    const songStructureAdditions = [
      "Transpose up one whole step",
      "All instruments cut out; if you're using them, only singing, percussion, and optionally, bass, remain",
      "Add a counter-melody with an unexpected instrument, such as flute, French horn, or steel drum",
      "Consider adding a sample here. Be careful, and avoid cliche",
      "Add handclaps",
      "If there are drums, make them go half-time here",
    ];
    let randomNumberOfParts = Math.floor(Math.random() * 5) + 3;
    let songStructure: any = [];
    for (var i = 0; i < randomNumberOfParts; i++) {
      songStructure.push(
        songStructureParts[
          Math.floor(Math.random() * songStructureParts.length)
        ] + " "
      );
    }
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
