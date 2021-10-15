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

  const triggerPlayerForAllChords = (chordNotes: any) => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    for (var c = 0; c < props.tones.length; c++) {
      for (var i = 0; i < 3; i++) {
        synth.triggerAttackRelease(`${chordNotes[i]}4`, 0.5);
      }
    }
  };

  useEffect(() => {
    if (props.tones) {
      // ATTEMPT at all chords #1
      // Kinda plays everything at once?
      // for (var i = 0; i < props.tones.length; i++) {
      //   triggerPlayerForSingleChord(createChordFromNote(props.tones[i]));
      // }

      // const mainMelody = [
      //   { time: 0, note: "G4", duration: "8n" },
      //   { time: "0:0:2", note: "F4", duration: "8n" },
      //   { time: "0:1", note: "D4", duration: "8n." },
      //   { time: "0:2", note: "D4", duration: "8n" },
      //   { time: "0:2:2", note: "F4", duration: "8n." },
      //   { time: "0:3", note: "G4", duration: "8n" },
      //   { time: "0:3:2", note: "A4", duration: "2n" },
      //   { time: "2:0", note: "A4", duration: "8n" },
      //   { time: "2:0:2", note: "G4", duration: "8n" },
      //   { time: "2:1", note: "F4", duration: "8n" },
      //   { time: "2:2", note: "A4", duration: "8n" },
      //   { time: "2:2:2", note: "G4", duration: "8n" },
      //   { time: "2:3", note: "E4", duration: "8n" },
      //   { time: "2:3:2", note: "F4", duration: "2n" },
      //   { time: "4:0", note: "G4", duration: "8n" },
      //   { time: "4:0:2", note: "F4", duration: "8n" },
      //   { time: "4:1", note: "D4", duration: "8n" },
      //   { time: "4:2", note: "F4", duration: "8n" },
      //   { time: "4:2:2", note: "A4", duration: "8n" },
      //   { time: "4:3", note: "G4", duration: "8n" },
      //   { time: "4:3:2", note: "A4", duration: "2n" },
      //   { time: "5:2:2", note: "G4", duration: "8n" },
      //   { time: "5:3", note: "A4", duration: "8n" },
      //   { time: "5:3:2", note: "B4", duration: "8n" },
      //   { time: "6:0", note: "C5", duration: "8n" },
      //   { time: "6:1", note: "B4", duration: "8n" },
      //   { time: "6:1:2", note: "A4", duration: "8n" },
      //   { time: "6:2", note: "B4", duration: "8n" },
      //   { time: "6:2:2", note: "A4", duration: "8n" },
      //   { time: "6:3", note: "G4", duration: "8n" },
      //   { time: "6:3:2", note: "A4", duration: "1n" },
      // ];

      // const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      // for (var i = 0; i < mainMelody.length; i++) {
      //   synth.triggerAttackRelease(
      //     mainMelody[i].note,
      //     mainMelody[i].duration,
      //     mainMelody[i].time
      //   );
      // }

      // triggerPlayerForSingleChord(createChordFromNote(props.tones));

      ////////////////////////////
      /// ATTEMPT at all chords #2
      //I think this plays everything at once.
      // triggerPlayerForAllChords(createChordFromNote(props.tones[0]));
      /////////////////////////////
      // This one works with one chord. Weird first time.
      // for (var i = 0; i < props.length; i++) {
      //   synth.triggerAttackRelease(`${chordNotes[i]}4`, "1n");
      // }
      // for (var i = 0; i < props.tones.length; i++) {
      //   triggerPlayerForSingleChord(createChordFromNote(props.tones[i]));
      // }
      const time = [
        "0",
        "0:3",
        "1:0",
        "1:3",
        "2:0",
        "2:3",
        "3:0",
        "3:2",
        "3:3",
        "4:0",
        "4:3",
        "5:0",
        "5:3",
        "6:0",
        "6:3",
        "7:0",
        "7:2",
        "7:3",
      ];
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      for (var i = 0; i < props.tones.length; i++) {
        console.log(props.tones[i]);
        synth.triggerAttackRelease(
          createChordFromNote(props.tones[i]),
          "1n",
          time[i]
        );
      }
    }
  });

  return null;
}
