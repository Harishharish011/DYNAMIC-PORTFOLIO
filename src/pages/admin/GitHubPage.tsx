import { FormEvent, useEffect, useState } from 'react';
import { LoadingSpinner } from '../../components/admin/LoadingSpinner.js';
import { adminApi, type AdminGithub } from '../../services/adminService.js';

const emptyGithub: AdminGithub = {
  username: 'Harishharish011',
  personalAccessToken: '',
  avatarUrl: '',
  bio: '',
  followers: 0,
  following: 0,
  publicRepos: 0,
  repos: [],
  topLanguages: [],
};

const repoLines = (github: AdminGithub) => (github.repos ?? []).map((repo) => [repo.name, repo.htmlUrl, repo.language, repo.description, repo.stars, repo.updatedAt].join('|')).join('\n');
const langLines = (github: AdminGithub) => (github.topLanguages ?? []).map((language) => `${language.name}|${language.percent}`).join('\n');

export function GitHubPage() {
  const [github, setGithub] = useState<AdminGithub | null>(null);
  const [reposText, setReposText] = useState('');
  const [languagesText, setLanguagesText] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  useEffect(() => {
    void adminApi.github().then((payload) => {
      const next = payload.github ?? emptyGithub;
      setGithub(next);
      setReposText(repoLines(next));
      setLanguagesText(langLines(next));
    });
  }, []);

  if (!github) return <LoadingSpinner label="Loading GitHub settings..." />;

  async function save(event: FormEvent) {
    event.preventDefault();
    const repos = reposText.split('\n').filter(Boolean).map((line) => {
      const [name = '', htmlUrl = '', language = '', description = '', stars = '0', updatedAt = ''] = line.split('|');
      return { name, htmlUrl, language, description, stars: Number(stars) || 0, updatedAt };
    });
    const topLanguages = languagesText.split('\n').filter(Boolean).map((line) => {
      const [name = '', percent = '0'] = line.split('|');
      return { name, percent: Number(percent) || 0 };
    });
    const saved = await adminApi.updateGithub({ ...github, repos, topLanguages });
    setGithub(saved.github);
    setSyncMessage('GitHub settings saved successfully.');
    setTimeout(() => setSyncMessage(''), 3000);
  }

  async function handleSync() {
    setIsSyncing(true);
    setSyncMessage('');
    try {
      // Fetch GitHub profile and repos from the public API
      const username = github.username || 'Harishharish011';
      
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, {
          headers: github.personalAccessToken ? { Authorization: `Bearer ${github.personalAccessToken}` } : {},
        }),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
          headers: github.personalAccessToken ? { Authorization: `Bearer ${github.personalAccessToken}` } : {},
        }),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        setSyncMessage(`GitHub API error: ${userRes.status} / ${reposRes.status}`);
        setIsSyncing(false);
        return;
      }

      const userData = await userRes.json();
      const reposData = await reposRes.json();

      // Compute language percentages
      const langMap = new Map<string, number>();
      for (const repo of reposData) {
        if (repo.language) {
          langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1);
        }
      }
      const total = [...langMap.values()].reduce((a, b) => a + b, 0);
      const topLanguages = [...langMap.entries()]
        .map(([name, count]) => ({ name, percent: Math.round((count / total) * 100) }))
        .sort((a, b) => b.percent - a.percent)
        .slice(0, 10);

      const repos = reposData.map((repo: any) => ({
        name: repo.name,
        htmlUrl: repo.html_url,
        language: repo.language || '',
        description: repo.description || '',
        stars: repo.stargazers_count || 0,
        updatedAt: repo.updated_at || '',
      }));

      const synced: AdminGithub = {
        username,
        personalAccessToken: github.personalAccessToken,
        avatarUrl: userData.avatar_url || github.avatarUrl,
        bio: userData.bio || github.bio,
        followers: userData.followers || 0,
        following: userData.following || 0,
        publicRepos: userData.public_repos || 0,
        repos,
        topLanguages,
      };

      // Save via admin API
      const saved = await adminApi.updateGithub(synced);
      setGithub(saved.github);
      setReposText(repoLines(saved.github));
      setLanguagesText(langLines(saved.github));
      setSyncMessage('Sync completed successfully!');
    } catch (err) {
      setSyncMessage(`Sync failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(''), 5000);
    }
  }

  return (
    <form className="bbAdminForm" onSubmit={save}>
      <div className="bbAdminFormFull">
        <h1 className="bbAdminTitle">GitHub</h1>
        <p className="bbAdminMuted">Edit profile, repository order, and language stats.</p>
        {github.updatedAt && (
          <p className="bbAdminMuted">Last synced: {new Date(github.updatedAt).toLocaleString()}</p>
        )}
      </div>
      <input className="bbAdminInput" value={github.username} placeholder="GitHub Username" onChange={(e) => setGithub({ ...github, username: e.target.value })} />
      <input className="bbAdminInput" value={github.personalAccessToken ?? ''} placeholder="Personal Access Token (optional)" type="password" onChange={(e) => setGithub({ ...github, personalAccessToken: e.target.value })} />
      <input className="bbAdminInput" value={github.avatarUrl} placeholder="Avatar URL" onChange={(e) => setGithub({ ...github, avatarUrl: e.target.value })} />
      <input className="bbAdminInput" type="number" value={github.followers} placeholder="Followers" onChange={(e) => setGithub({ ...github, followers: Number(e.target.value) })} />
      <input className="bbAdminInput" type="number" value={github.following} placeholder="Following" onChange={(e) => setGithub({ ...github, following: Number(e.target.value) })} />
      <textarea className="bbAdminTextarea bbAdminFormFull" value={github.bio} placeholder="Bio" onChange={(e) => setGithub({ ...github, bio: e.target.value })} />
      <textarea className="bbAdminTextarea bbAdminFormFull" value={reposText} placeholder="Repos: name|url|language|description|stars|updatedAt" onChange={(e) => setReposText(e.target.value)} />
      <textarea className="bbAdminTextarea bbAdminFormFull" value={languagesText} placeholder="Languages: name|percent" onChange={(e) => setLanguagesText(e.target.value)} />
      <div className="bbAdminActions bbAdminFormFull">
        <button className="bbAdminButton" type="submit">Save GitHub</button>
        <button className="bbAdminButton" type="button" disabled={isSyncing} onClick={handleSync}>
          {isSyncing ? 'Syncing...' : 'Sync from GitHub'}
        </button>
      </div>
      {syncMessage && <div className="bbAdminFormFull bbAdminMuted" style={{ marginTop: 8 }}>{syncMessage}</div>}
    </form>
  );
}
