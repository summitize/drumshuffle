export type DrumType = 
  | "kick" 
  | "snare" 
  | "tom1" 
  | "tom2" 
  | "floorTom" 
  | "crash" 
  | "ride" 
  | "splash" 
  | "china" 
  | "hihatOpen" 
  | "hihatClosed" 
  | "cowbell";

export interface DrumPadConfig {
  id: DrumType;
  label: string;
  keybind: string;
  type: "drum" | "cymbal";
  color: string;
}

export interface RecordingTrack {
  id: string;
  name: string;
  startTime: number;
  events: DrumEvent[];
}

export interface DrumEvent {
  drumId: DrumType;
  time: number; // offset from recording start in ms
  velocity: number;
}
