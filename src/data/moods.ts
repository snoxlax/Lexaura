export const MOOD_IDS = [
  "grammar",
  "git-commit",
  "email",
  "costume",
] as const;

export type MoodId = (typeof MOOD_IDS)[number];

export interface MoodConfig {
  id: MoodId;
  title: string;
  description: string;
  tags: string[];
  tagClassName: string;
}

export const moods: MoodConfig[] = [
  {
    id: "grammar",
    title: "Fix grammar",
    description: "Fix spelling mistakes and grammar basics.",
    tags: ["casual", "formal", "academic"],
    tagClassName:
      "border border-violet-500/25 bg-violet-500/15 text-violet-300",
  },
  {
    id: "git-commit",
    title: "Git commit",
    description: "Make a commit message simple and short.",
    tags: ["concise", "descriptive", "conventional"],
    tagClassName: "border border-amber-500/25 bg-amber-500/15 text-amber-300",
  },
  {
    id: "email",
    title: "Email",
    description: "Professional tone for email and replies.",
    tags: ["professional", "friendly", "formal"],
    tagClassName: "border border-sky-500/25 bg-sky-500/15 text-sky-300",
  },
  {
    id: "costume",
    title: "Costume",
    description: "Coming soon\u2026",
    tags: ["creative", "casual", "playful"],
    tagClassName: "border border-rose-500/25 bg-rose-500/15 text-rose-300",
  },
];

export function isMoodId(id: string): id is MoodId {
  return (MOOD_IDS as readonly string[]).includes(id);
}

export function getMoodById(id: string): MoodConfig | undefined {
  return moods.find((m) => m.id === id);
}
