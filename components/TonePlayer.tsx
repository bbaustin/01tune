import React from "react";
import * as Tone from "tone";
import { TIME } from "../lib/constants";

interface tonePlayerProps {
  fullChords: any;
}

export default function TonePlayer(props: any) {
  const playChords = () => {
    Tone.Transport.start();

    let sequenceData = [];
    for (var i = 0; i < props.fullChords.length; i++) {
      sequenceData.push({
        note: props.fullChords[i],
        dur: "16n",
        time: TIME[i],
      });
    }

    if (props.fullChords) {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const performance = new Tone.Part((time, event) => {
        synth.triggerAttackRelease(event.note, "16n", time);
      }, sequenceData);
      performance.start();
    }
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
