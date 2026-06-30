import { useEffect, useState } from 'react';
import { MotionWrapper } from '../animations/MotionWrapper.js';
import './githubActivity.css';

export type GithubProfile = {
  username: string;
  avatarUrl: string;
  bio?: string;
  followers: number;
  following: number;
  publicRepos: number;
};

const defaultProfile: GithubProfile = {
  username: 'Harishharish011',
  avatarUrl: 'https://avatars.githubusercontent.com/u/0?v=4',
  bio: 'Building thoughtful, scalable web experiences.',
  followers: 0,
  following: 0,
  publicRepos: 0,
};

function safeNumber(value: unknown, fallback = 0) {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function GithubProfileCard({ profile }: { profile?: Partial<GithubProfile> | null }) {
  const [data, setData] = useState<GithubProfile>(defaultProfile);

  useEffect(() => {
    if (!profile) return;

    setData({
      ...defaultProfile,
      ...profile,
      followers: safeNumber(profile.followers, defaultProfile.followers),
      following: safeNumber(profile.following, defaultProfile.following),
      publicRepos: safeNumber(profile.publicRepos, defaultProfile.publicRepos),
    });
  }, [profile]);

  const bio = data.bio?.trim() ? data.bio : defaultProfile.bio;

  return (
    <MotionWrapper
      className="bbGithubProfileCard glass-panel glass-edge glow-panel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="bbGithubProfileTop">
        <div className="bbGithubAvatarWrap" aria-hidden="true">
          <div className="bbGithubAvatarGlow" />
          <img className="bbGithubAvatar" src={data.avatarUrl} alt="GitHub avatar" loading="lazy" />
        </div>

        <div className="bbGithubProfileHeading">
          <div className="bbGithubProfileUserRow">
            <span className="bbGithubProfileName">{data.username}</span>
            <span className="bbGithubBadge">ACTIVE</span>
          </div>
          <div className="bbGithubProfileBio">{bio}</div>
        </div>
      </div>

      <div className="bbGithubProfileStats" role="list" aria-label="GitHub profile stats">
        <div className="bbGithubStat" role="listitem">
          <div className="bbGithubStatValue">{data.followers}</div>
          <div className="bbGithubStatLabel">Followers</div>
        </div>
        <div className="bbGithubStat" role="listitem">
          <div className="bbGithubStatValue">{data.following}</div>
          <div className="bbGithubStatLabel">Following</div>
        </div>
        <div className="bbGithubStat" role="listitem">
          <div className="bbGithubStatValue">{data.publicRepos}</div>
          <div className="bbGithubStatLabel">Public Repos</div>
        </div>
      </div>
    </MotionWrapper>
  );
}

