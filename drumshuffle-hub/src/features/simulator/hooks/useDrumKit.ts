"use client";

import { useRef, useState, useCallback } from "react";
import * as Tone from "tone";
import { DrumType, DrumEvent } from "../types";

export function useDrumKit() {
  const [isReady, setIsReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Track recording state
  const recordingStartTime = useRef<number>(0);
  const currentRecording = useRef<DrumEvent[]>([]);
  const playbackLoops = useRef<Tone.Part | null>(null);

  // Synths
  const synths = useRef<Record<string, { play: (vel: number) => void }>>({});

  const initAudio = useCallback(async () => {
    await Tone.start();
    
    // Synthesize the drums for zero-latency realistic approximations
    
    // Kick
    const kick = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 4,
      oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 }
    }).toDestination();
    kick.volume.value = 4;

    // Snare (Layered)
    const snareDrum = new Tone.MembraneSynth({
      pitchDecay: 0.01,
      octaves: 2,
      envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }
    }).toDestination();
    const snareNoise = new Tone.NoiseSynth({
      noise: { type: "pink" },
      envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }
    }).toDestination();
    snareDrum.volume.value = 2;
    snareNoise.volume.value = -4;

    // Toms
    const tom1 = new Tone.MembraneSynth({ pitchDecay: 0.05, octaves: 4, envelope: { attack: 0.001, decay: 0.5, sustain: 0, release: 1.4 } }).toDestination();
    const tom2 = new Tone.MembraneSynth({ pitchDecay: 0.05, octaves: 4, envelope: { attack: 0.001, decay: 0.5, sustain: 0, release: 1.4 } }).toDestination();
    const floorTom = new Tone.MembraneSynth({ pitchDecay: 0.05, octaves: 4, envelope: { attack: 0.001, decay: 0.6, sustain: 0, release: 1.4 } }).toDestination();
    
    // Cymbals
    const crash = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 2.5, release: 2 }, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5 }).toDestination();
    const ride = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 1.5, release: 1 }, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5 }).toDestination();
    const splash = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.8, release: 1 }, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5 }).toDestination();
    const china = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 1.8, release: 1.5 }, harmonicity: 4.1, modulationIndex: 64, resonance: 4000, octaves: 1.5 }).toDestination();
    
    // HiHats
    const hihatClosed = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.1, release: 0.01 }, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5 }).toDestination();
    const hihatOpen = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.6, release: 0.1 }, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5 }).toDestination();
    
    // Cowbell
    const cowbell = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.2, release: 0.01 }, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5 }).toDestination();
    
    // Set frequencies
    crash.frequency.value = 300;
    ride.frequency.value = 400;
    splash.frequency.value = 500;
    china.frequency.value = 250;
    hihatClosed.frequency.value = 600;
    hihatOpen.frequency.value = 600;
    cowbell.frequency.value = 800;

    // Adjust volumes for mix
    crash.volume.value = -8;
    ride.volume.value = -10;
    splash.volume.value = -10;
    china.volume.value = -6;
    hihatClosed.volume.value = -12;
    hihatOpen.volume.value = -12;
    cowbell.volume.value = -15;

    synths.current = {
      kick: { play: (vel: number) => kick.triggerAttackRelease("C1", "8n", Tone.now(), vel) },
      snare: { play: (vel: number) => { snareDrum.triggerAttackRelease("G2", "8n", Tone.now(), vel); snareNoise.triggerAttackRelease("8n", Tone.now(), vel); } },
      tom1: { play: (vel: number) => tom1.triggerAttackRelease("C3", "8n", Tone.now(), vel) },
      tom2: { play: (vel: number) => tom2.triggerAttackRelease("A2", "8n", Tone.now(), vel) },
      floorTom: { play: (vel: number) => floorTom.triggerAttackRelease("E2", "8n", Tone.now(), vel) },
      crash: { play: (vel: number) => crash.triggerAttackRelease("8n", Tone.now(), vel) },
      ride: { play: (vel: number) => ride.triggerAttackRelease("8n", Tone.now(), vel) },
      splash: { play: (vel: number) => splash.triggerAttackRelease("8n", Tone.now(), vel) },
      china: { play: (vel: number) => china.triggerAttackRelease("8n", Tone.now(), vel) },
      hihatClosed: { play: (vel: number) => hihatClosed.triggerAttackRelease("8n", Tone.now(), vel) },
      hihatOpen: { play: (vel: number) => hihatOpen.triggerAttackRelease("8n", Tone.now(), vel) },
      cowbell: { play: (vel: number) => cowbell.triggerAttackRelease("8n", Tone.now(), vel) },
    };

    setIsReady(true);
  }, []);

  const playDrum = useCallback((id: DrumType, velocity: number = 1) => {
    if (!isReady || !synths.current[id]) return;
    
    // Trigger sound
    synths.current[id].play(velocity);

    // Record if active
    if (isRecording) {
      const time = performance.now() - recordingStartTime.current;
      currentRecording.current.push({ drumId: id, time, velocity });
    }
  }, [isReady, isRecording]);

  const startRecording = useCallback(() => {
    currentRecording.current = [];
    recordingStartTime.current = performance.now();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    return currentRecording.current;
  }, []);

  const togglePlayback = useCallback((trackEvents: DrumEvent[]) => {
    if (isPlaying) {
      if (playbackLoops.current) {
        playbackLoops.current.stop();
        playbackLoops.current.dispose();
      }
      Tone.Transport.stop();
      setIsPlaying(false);
    } else {
      if (trackEvents.length === 0) return;
      
      const partEvents = trackEvents.map(e => [e.time / 1000, e]); // convert to seconds
      
      playbackLoops.current = new Tone.Part((time, value) => {
        const event = value as DrumEvent;
        synths.current[event.drumId]?.play(event.velocity);
      }, partEvents).start(0);
      
      // Calculate max time to stop or loop
      const maxTime = Math.max(...trackEvents.map(e => e.time / 1000));
      playbackLoops.current.loop = true;
      playbackLoops.current.loopEnd = maxTime + 0.5;

      Tone.Transport.start();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return {
    isReady,
    initAudio,
    playDrum,
    isRecording,
    startRecording,
    stopRecording,
    isPlaying,
    togglePlayback,
    currentRecording: currentRecording.current
  };
}
