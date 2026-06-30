import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { Github } from '../models/Github';

export const githubPlaceholder = asyncHandler(async (_req: Request, res: Response) => {
  const profile = await Github.findOne().sort({ createdAt: -1 });

  if (profile) {
    return res.json({
      success: true,
      data: {
        profile: {
          username: profile.username,
          avatarUrl: profile.avatarUrl,
          bio: profile.bio,
          followers: profile.followers,
          following: profile.following,
          publicRepos: profile.publicRepos,
        },
        repos: profile.repos,
        topLanguages: profile.topLanguages,
        contributionImageUrl: profile.contributionImageUrl,
      },
    });
  }

  return res.json({
    success: true,
    data: {
      profile: null,
      repos: [],
      topLanguages: [],
      followers: 0,
      following: 0,
      contributionImageUrl: null,
    },
  });
});

