import React, { useEffect } from "react";
import * as Tone from "tone";

interface tonePlayerProps {
  tones: any;
}

export default function TonePlayer(props: any) {
  const createChordFromNote = (note: string) => {
    console.log(`note ${note}`);
    let chord: Array<string> = [""];
    switch (note) {
      case "A":
        chord = ["A", "C#", "E"];
        break;
      case "B":
        chord = ["B", "D#", "F#"];
        break;
      case "C":
        chord = ["C", "E", "G"];
        break;
      case "D":
        chord = ["D", "F#", "A"];
        break;
      case "E":
        chord = ["E", "G#", "B"];
        break;
      case "F":
        chord = ["F", "A", "C"];
        break;
      case "G":
        chord = ["G", "D", "B"];
        break;
    }
    console.log("chord " + chord);
    return chord;
  };

  const triggerPlayerForSingleChord = (chordNotes: Array<string>) => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    for (var i = 0; i < 3; i++) {
      synth.triggerAttackRelease(`${chordNotes[i]}4`, 0.5);
    }
  };

  const triggerPlayerForAllChords = (chordNotes: Array<string>) => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    for (var c = 0; c < props.tones.length; c++) {
      console.log(c);
      for (var i = 0; i < 3; i++) {
        synth.triggerAttackRelease(`${chordNotes[i]}4`, 0.5);
      }
    }
  };

  useEffect(() => {
    if (props.tones) {
      // ATTEMPT at all chords #1
      // for (var i = 0; i < props.tones.length; i++) {
      //   triggerPlayerForSingleChord(createChordFromNote(props.tones[i]));
      // }

      /// ATTEMPT at all chords #2
      // triggerPlayerForAllChords(createChordFromNote(props.tones[0]));

      triggerPlayerForSingleChord(createChordFromNote(props.tones[0]));
    }
  });

  return <h6>this is TonePlayer</h6>;
}
