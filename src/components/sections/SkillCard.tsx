import { MotionWrapper } from '../animations/MotionWrapper.js';
import type { Skill } from '../../data/skills.js';

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <MotionWrapper
      className="bbSkillCard"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="bbSkillIcon" aria-hidden="true">
        {skill.name.slice(0, 2).toUpperCase()}
      </div>

      <div className="bbSkillMeta">
        <div className="bbSkillName">{skill.name}</div>
        <div className="bbSkillCategory">{skill.category}</div>
      </div>
    </MotionWrapper>
  );
}
