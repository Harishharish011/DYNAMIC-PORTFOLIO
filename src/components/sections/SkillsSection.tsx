import { useEffect, useState } from 'react';
import { MotionWrapper } from '../animations/MotionWrapper.js';
import { Container } from '../ui/Container.js';

import type { Skill } from '../../data/skills.js';
import { getSkills } from '../../services/skillsService.js';

import './skills.css';
import { SkillCard } from './SkillCard.js';

export function SkillsSection() {
  const [data, setData] = useState<Skill[] | null>(null);

  useEffect(() => {
    let mounted = true;

    getSkills()
      .then((skills) => {
        if (mounted) setData(skills);
      })
      .catch(() => {
        // Preserve legacy UI even if service fails (should never happen for static provider).
        if (mounted) setData([]);
      });

    return () => {
      mounted = false;
    };
  }, []);


  const skills = data ?? [];

  return (
    <section id="skills" className="bbSkills">
      <Container>
        <div className="bbSkillsInner">


          <MotionWrapper
            className="bbSkillsIntro"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
          >
            <div className="bbSkillsEyebrow">SKILL SLOT</div>
            <h2 className="bbSkillsHeading">Crafted with Modern Technologies</h2>
            <p className="bbProjectsSupporting">
              Building scalable digital experiences with modern technologies and a passion for clean, maintainable code.
            </p>
          </MotionWrapper>

          <div className="bbSkillsGrid" role="list" aria-label="Technical skills">
            {skills.map((skill) => (
              <div key={skill.id} role="listitem" style={{ gridColumn: undefined }}>
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

