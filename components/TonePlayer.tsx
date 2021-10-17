import React from "react";
import * as Tone from "tone";
import { TIME } from "../lib/constants";

interface tonePlayerProps {
  fullChords: any;
}

// TIME controls rhythm
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
    Tone.Transport.start();
    if (props.fullChords) {
      let synth = new Tone.PolySynth(Tone.Synth).toDestination();
      for (var i = 0; i < props.fullChords.length; i++) {
        synth.triggerAttackRelease(props.fullChords[i], "8n", TIME[i]);
      }
      // After loop, stop/reset synth somehow?
    }
    Tone.Transport.stop();
  };

  return (
    <div className="button-holder">
      <button onClick={() => playChords()}>Play chords ▸</button>
      <button onClick={() => props.randomizeChords()}>
        Randomize chords ↺
      </button>
    </div>
  );
}
