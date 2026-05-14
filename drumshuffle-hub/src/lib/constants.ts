export const NAV_LINKS = [
  { label: "Home",           href: "/" },
  { label: "Metronome",      href: "/metronome" },
  { label: "Drum Simulator", href: "/simulator" },
  { label: "Drum Sheets",    href: "/sheets" },
  { label: "About",          href: "/about" },
  { label: "Contact",        href: "/contact" },
] as const;

export const SITE_NAME = "DrumShuffle Hub";
export const SITE_URL  = "https://drumshuffle.com";

export const STATS = [
  { label: "Active Drummers", value: 48000 },
  { label: "Sample Packs",    value: 260 },
  { label: "Lessons",         value: 1200 },
  { label: "BPM Range",       value: 300 },
] as const;

export const FEATURES = [
  {
    icon: "Drum",
    title: "Pro Drum Simulator",
    description: "Play a fully interactive e-drum kit in your browser with realistic samples from world-class kits.",
    color: "brand",
  },
  {
    icon: "Music",
    title: "26+ Sample Packs",
    description: "Download studio-grade drum samples. Rock, jazz, hip-hop, metal & more — curated by professionals.",
    color: "cyan",
  },
  {
    icon: "Metronome",
    title: "Smart Metronome",
    description: "Web Audio-based metronome with tap tempo, subdivisions, and visual beat indicators.",
    color: "purple",
  },
  {
    icon: "BookOpen",
    title: "Structured Lessons",
    description: "Video and PDF lessons for all skill levels, from your first rudiment to advanced polyrhythms.",
    color: "gold",
  },
  {
    icon: "Users",
    title: "Global Community",
    description: "Connect with drummers worldwide. Share recordings, get feedback, join challenges.",
    color: "brand",
  },
  {
    icon: "Activity",
    title: "Progress Tracking",
    description: "Track your BPM gains, practice streaks, and skill milestones over time.",
    color: "cyan",
  },
] as const;
