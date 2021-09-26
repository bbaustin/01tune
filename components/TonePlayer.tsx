import React, { useEffect } from "react";
import * as Tone from "tone";

interface tonePlayerProps {
  tones: any;
}

export default function TonePlayer(tones: any) {
  useEffect(() => {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    if (tones.tones) {
      console.log(tones);
      console.log(tones.tones[0]);
      let timeIncrease = 0.5;
      for (var i = 0; i < 2; i++) {
        console.log(tones.tones[i]);
        synth.triggerAttackRelease(`${tones.tones[i]}4`, timeIncrease);
        timeIncrease += 0.5;
        // synth.triggerAttackRelease("C4", "4n");
      }
    }
  });

  return <h6>this is TonePlayer</h6>;
}
