"use client";

import { useState, useEffect, useRef, useCallback, use } from "react";
import * as Tone from "tone";
import { MetronomeState, Subdivision, SoundType } from "../types";

export function useMetronome() {
  const [state, setState] = useState<MetronomeState>({
    isPlaying: false,
    bpm: 120,
    beatsPerMeasure: 4,
    subdivision: "quarter",
    soundType: "digital",
    accentFirstBeat: true,
  });

  const [currentBeat, setCurrentBeat] = useState(0);
  const [currentSub, setCurrentSub] = useState(0);

  const synths = useRef<Record<SoundType, { high: Tone.Synth | Tone.MembraneSynth | Tone.MetalSynth, low: Tone.Synth | Tone.MembraneSynth | Tone.MetalSynth }> | null>(null);
  const loop = useRef<Tone.Sequence | null>(null);

  // Initialize synths
  useEffect(() => {
    synths.current = {
      woodblock: {
        high: new Tone.MembraneSynth({ pitchDecay: 0.008, envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.01 } }).toDestination(),
        low: new Tone.MembraneSynth({ pitchDecay: 0.008, envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.01 } }).toDestination(),
      },
      digital: {
        high: new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.01 } }).toDestination(),
        low: new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.01 } }).toDestination(),
      },
      cowbell: {
        high: new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.1, release: 0.01 }, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5 }).toDestination(),
        low: new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.1, release: 0.01 }, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5 }).toDestination(),
      }
    };

    // Set volumes and frequencies
    synths.current.digital.high.volume.value = -10;
    synths.current.digital.low.volume.value = -15;
    synths.current.cowbell.high.volume.value = -15;
    synths.current.cowbell.low.volume.value = -20;
    synths.current.cowbell.high.frequency.value = 800;
    synths.current.cowbell.low.frequency.value = 400;

    return () => {
      if (synths.current) {
        Object.values(synths.current).forEach(s => {
          s.high.dispose();
          s.low.dispose();
        });
      }
    };
  }, []);

  // Sync BPM
  useEffect(() => {
    Tone.Transport.bpm.value = state.bpm;
  }, [state.bpm]);

  const startPlayback = async () => {
    await Tone.start();

    if (loop.current) {
      loop.current.dispose();
    }

    const subCount = state.subdivision === "quarter" ? 1 : state.subdivision === "eighth" ? 2 : state.subdivision === "triplet" ? 3 : 4;
    const totalSteps = state.beatsPerMeasure * subCount;

    let stepNumber = 0;

    loop.current = new Tone.Sequence((time, _) => {
      const beat = Math.floor(stepNumber / subCount);
      const sub = stepNumber % subCount;

      Tone.Draw.schedule(() => {
        setCurrentBeat(beat);
        setCurrentSub(sub);
      }, time);

      const isAccent = sub === 0 && beat === 0 && state.accentFirstBeat;
      const isQuarter = sub === 0;

      const activeSynth = synths.current?.[state.soundType];
      if (!activeSynth) return;

      if (isAccent) {
        if (state.soundType === 'woodblock') activeSynth.high.triggerAttackRelease("A5", "32n", time);
        else if (state.soundType === 'digital') activeSynth.high.triggerAttackRelease("A5", "32n", time);
        else activeSynth.high.triggerAttackRelease("32n", time); // metal synth doesn't take note
      } else if (isQuarter) {
        if (state.soundType === 'woodblock') activeSynth.low.triggerAttackRelease("E4", "32n", time);
        else if (state.soundType === 'digital') activeSynth.low.triggerAttackRelease("A4", "32n", time);
        else activeSynth.low.triggerAttackRelease("32n", time);
      } else {
        // Subdivisions are quieter and higher pitch or same pitch but very quiet
        if (state.soundType === 'woodblock') activeSynth.low.triggerAttackRelease("E3", "32n", time, 0.3);
        else if (state.soundType === 'digital') activeSynth.low.triggerAttackRelease("A3", "32n", time, 0.3);
        else activeSynth.low.triggerAttackRelease("32n", time, 0.3);
      }

      stepNumber = (stepNumber + 1) % totalSteps;
    }, Array.from({ length: totalSteps }, (_, i) => i), `${subCount * 4}n`).start(0);

    Tone.Transport.start();
    setState(s => ({ ...s, isPlaying: true }));
  };

  const stopPlayback = useCallback(() => {
    Tone.Transport.stop();
    if (loop.current) {
      loop.current.stop();
    }
    setState(s => ({ ...s, isPlaying: false }));
    setCurrentBeat(0);
    setCurrentSub(0);
  }, []);

  const togglePlay = useCallback(async () => {
    if (state.isPlaying) {
      stopPlayback();
    } else {
      await startPlayback();
    }
  }, [state.isPlaying, startPlayback, stopPlayback]);

  // Handle setting changes that require sequence restart
  useEffect(() => {
    if (state.isPlaying) {
      stopPlayback();
      startPlayback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.beatsPerMeasure, state.subdivision]);

  return {
    state,
    setState,
    currentBeat,
    currentSub,
    togglePlay,
    stopPlayback
  };
}
