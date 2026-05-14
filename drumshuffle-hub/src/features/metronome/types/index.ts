export type SoundType = "woodblock" | "digital" | "cowbell";
export type Subdivision = "quarter" | "eighth" | "sixteenth" | "triplet";

export interface MetronomeState {
  isPlaying: boolean;
  bpm: number;
  beatsPerMeasure: number;
  subdivision: Subdivision;
  soundType: SoundType;
  accentFirstBeat: boolean;
}

export interface MetronomePreset {
  id: string;
  name: string;
  bpm: number;
  beatsPerMeasure: number;
  subdivision: Subdivision;
  soundType: SoundType;
  accentFirstBeat: boolean;
}
