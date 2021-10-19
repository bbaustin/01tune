import React from "react";
import * as Tone from "tone";
import { TIME } from "../lib/constants";

interface tonePlayerProps {
  fullChords: any;
}

// TODO: TIME controls rhythm, which is currently stored in constants
// let noteLength = "8n";
//       for (var i = 0; i < props.fullChords.length; i++) {
//         if (Math.floor(Math.random() * 10)) {
//           noteLength = "4n";
//         } else {
//           noteLength = "8n";
//         }
//         console.log(noteLength);
//       }

export default function TonePlayer(props: any) {
  const playChords = () => {
    Tone.start();
    Tone.context.resume();

    if (props.fullChords) {
      let synth = new Tone.PolySynth(Tone.Synth).toDestination();
      for (var i = 0; i < props.fullChords.length; i++) {
        synth.triggerAttackRelease(props.fullChords[i], "8n", TIME[i]);
      }

      // After loop, stop/reset synth somehow?
    }
  };

  // KNOWN ISSUES
  // no playing after playing once
  // if coming from another page, will play truncated version (seems to squish the first three? chords together, then play the rest)

  return (
    <div className="button-holder">
      <button onClick={() => playChords()}>Play chords ▸</button>
      <button onClick={() => props.randomizeChords()}>
        Randomize chords ↺
      </button>
    </div>
  );
}
