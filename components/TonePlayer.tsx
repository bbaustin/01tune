import React, { useEffect } from "react";
import * as Tone from "tone";

interface tonePlayerProps {
  tones: any;
}

export default function TonePlayer(tones: any) {
  useEffect(() => {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();
    if (tones.tones) {
      console.log(tones);
      console.log(tones.tones[0]);

      //synth.triggerAttackRelease("C4", "4n");   // <-- This works :)

      // tones.forEach((tone: any) => {
      //   synth.triggerAttackRelease(`${tone}4`, "4n");
      // });
      for (var i = 0; i < 2; i++) {
        console.log(tones.tones[i]);
        synth.triggerAttackRelease(`${tones.tones[i]}4`, "4n");
        // synth.triggerAttackRelease("C4", "4n");
      }
    }
  });

  return <h6>this is TonePlayer</h6>;
}
