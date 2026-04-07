import { moods } from "./moods";

export interface TemplateEntry {
  id: string;
  title: string;
  description: string;
  href: string;
  tags: { label: string; className: string }[];
}

export const templates: TemplateEntry[] = moods.map((m) => ({
  id: m.id,
  title: m.title,
  description: m.description,
  href: `/editor/${m.id}`,
  tags: m.tags.map((tag) => ({
    label: tag,
    className: m.tagClassName,
  })),
}));
