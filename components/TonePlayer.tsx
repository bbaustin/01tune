import React from "react";
import * as Tone from "tone";
import { TIME } from "../lib/constants";

interface tonePlayerProps {
  fullChords: any;
}

export default function TonePlayer(props: any) {
  //    Tone.Transport.bpm.value = 150;

  const playChords = () => {
    if (props.fullChords) {
      let synth = new Tone.PolySynth(Tone.Synth).toDestination();
      for (var i = 0; i < props.fullChords.length; i++) {
        synth.triggerAttackRelease(props.fullChords[i], "4n", TIME[i]);
        console.log(props.fullChords[i]);
      }
      // After loop, stop/reset synth somehow?
    }
  };

  return (
    <>
      <button onClick={() => playChords()}>Play chords ▸</button>
      <button onClick={() => props.randomizeChords()}>
        Randomize chords ↺
      </button>
    </>
  );
}
