import React, { useEffect } from "react";
import * as Tone from "tone";
import { Synth } from "tone";
import Layout from "../components/Layout";

interface tonePlayerProps {
  fullChords: any;
}

export default function TonePlayer(props: any) {
  //    Tone.Transport.bpm.value = 150;

  // const triggerPlayerForSingleChord = (chordNotes: any) => {
  //   const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  //   const now = Tone.now();
  //   for (var i = 0; i < 3; i++) {
  //     synth.triggerAttackRelease(`${chordNotes[i]}4`, 0.5);
  //   }
  // };

  const playChords = () => {
    if (props.fullChords) {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const time = [
        "0",
        "0:2",
        "1:0",
        "1:2",
        "2:0",
        "2:2",
        "3:0",
        "3:2",
        "4:0",
        "4:2",
        "5:0",
        "5:2",
        "6:0",
        "6:2",
        "7:0",
        "7:2",
        "8:0",
      ];

      for (var i = 0; i < props.fullChords.length; i++) {
        synth.triggerAttackRelease(props.fullChords[i], "8n", time[i]);
      }

      // This one works with one chord. Weird first time.
      // for (var i = 0; i < props.length; i++) {
      //   synth.triggerAttackRelease(`${props.tones[i]}4`, "1n");
      // }
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
