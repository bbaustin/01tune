import React, { useEffect } from "react";
import * as Tone from "tone";
import { Synth } from "tone";

interface tonePlayerProps {
  tones: any;
}

export default function TonePlayer(props: any) {
  const createChordFromNote = (note: string) => {
    let chord: Array<string> = [""];
    switch (note) {
      case "A":
        chord = ["A4", "C#4", "E4"];
        break;
      case "B":
        chord = ["B4", "D#4", "F#4"];
        break;
      case "C":
        chord = ["C4", "E4", "G4"];
        break;
      case "D":
        chord = ["D4", "F#4", "A4"];
        break;
      case "E":
        chord = ["E4", "G#4", "B4"];
        break;
      case "F":
        chord = ["F4", "A4", "C4"];
        break;
      case "G":
        chord = ["G4", "D4", "B4"];
        break;
    }
    return chord;
  };

  //    Tone.Transport.bpm.value = 150;

  // const triggerPlayerForSingleChord = (chordNotes: any) => {
  //   const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  //   const now = Tone.now();
  //   for (var i = 0; i < 3; i++) {
  //     synth.triggerAttackRelease(`${chordNotes[i]}4`, 0.5);
  //   }
  // };

  useEffect(() => {
    if (props.tones) {
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

      for (var i = 0; i < props.tones.length; i++) {
        let chordToPlay: Array<string> = [];
        chordToPlay = createChordFromNote(props.tones[i]);
        chordToPlay = ["D4", "F4", "A5", "D1"];
        console.log(chordToPlay);
        synth.triggerAttackRelease(chordToPlay, "8n", time[i]);
      }

      // This one works with one chord. Weird first time.
      // for (var i = 0; i < props.length; i++) {
      //   synth.triggerAttackRelease(`${props.tones[i]}4`, "1n");
      // }
    }
  });

  return null;
}
