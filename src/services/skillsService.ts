import { skills } from '../data/skills.js';
import type { Skill } from '../data/skills.js';

export async function getSkills(): Promise<Skill[]> {
  // Static provider for Phase 6 (no API calls yet).
  return skills;
}



