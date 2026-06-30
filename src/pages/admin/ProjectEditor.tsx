import { FormEvent, useState } from 'react';
import { FileUploader } from '../../components/admin/FileUploader.js';
import { type AdminProject } from '../../services/adminService.js';

const emptyProject: AdminProject = {
  title: '',
  slug: '',
  category: '',
  shortDescription: '',
  fullDescription: '',
  overview: '',
  technologies: [],
  githubUrl: '',
  liveDemoUrl: 'Coming Soon',
  status: 'In Progress',
  featured: false,
  challenges: [],
  solutions: [],
  outcome: [],
  outcomes: [],
  futureImprovements: [],
  galleryImages: [],
  heroImage: '',
  thumbnailImage: '',
};

const toLines = (items?: string[]) => (items ?? []).join('\n');
const fromLines = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean);
const fromCsv = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean);
const formValue = (data: FormData, key: string) => String(data.get(key) ?? '');

export function ProjectEditor({
  project,
  onSave,
  onCancel,
}: {
  project?: AdminProject;
  onSave: (project: AdminProject) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<AdminProject>({ ...emptyProject, ...project });
  const [isSaving, setIsSaving] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const payload: AdminProject = {
      ...form,
      title: form.title,
      slug: form.slug,
      category: formValue(data, 'category'),
      status: formValue(data, 'status'),
      shortDescription: formValue(data, 'shortDescription'),
      fullDescription: formValue(data, 'fullDescription'),
      overview: formValue(data, 'fullDescription'),
      technologies: fromCsv(formValue(data, 'technologies')),
      githubUrl: formValue(data, 'githubUrl'),
      liveDemoUrl: formValue(data, 'liveDemoUrl'),
      featured: data.get('featured') === 'on',
      challenges: fromLines(formValue(data, 'challenges')),
      solutions: fromLines(formValue(data, 'solutions')),
      outcome: fromLines(formValue(data, 'outcome')),
      outcomes: fromLines(formValue(data, 'outcome')),
      futureImprovements: fromLines(formValue(data, 'futureImprovements')),
      heroImage: formValue(data, 'heroImage'),
      thumbnailImage: formValue(data, 'heroImage'),
      galleryImages: fromLines(formValue(data, 'galleryImages')),
    };

    setIsSaving(true);
    try {
      await onSave({
        ...payload,
        description: payload.shortDescription ?? '',
        gallery: payload.galleryImages ?? [],
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="bbAdminForm" onSubmit={submit}>
      <input className="bbAdminInput" name="title" value={form.title} placeholder="Title" onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} />
      <input className="bbAdminInput" name="slug" value={form.slug} placeholder="Slug" onChange={(e) => setForm((current) => ({ ...current, slug: e.target.value }))} />
      <input className="bbAdminInput" name="category" value={form.category} placeholder="Category" onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))} />
      <select className="bbAdminSelect" name="status" value={form.status} onChange={(e) => setForm((current) => ({ ...current, status: e.target.value }))}>
        <option>Completed</option>
        <option>In Progress</option>
      </select>
      <input className="bbAdminInput bbAdminFormFull" name="shortDescription" value={form.shortDescription} placeholder="Short description" onChange={(e) => setForm((current) => ({ ...current, shortDescription: e.target.value }))} />
      <textarea className="bbAdminTextarea bbAdminFormFull" name="fullDescription" value={form.fullDescription} placeholder="Overview / full description" onChange={(e) => setForm((current) => ({ ...current, fullDescription: e.target.value, overview: e.target.value }))} />
      <input className="bbAdminInput" name="technologies" value={(form.technologies ?? []).join(', ')} placeholder="Technologies, comma separated" onChange={(e) => setForm((current) => ({ ...current, technologies: fromCsv(e.target.value) }))} />
      <input className="bbAdminInput" name="githubUrl" value={form.githubUrl} placeholder="GitHub URL" onChange={(e) => setForm((current) => ({ ...current, githubUrl: e.target.value }))} />
      <input className="bbAdminInput" name="liveDemoUrl" value={form.liveDemoUrl} placeholder="Live Demo URL" onChange={(e) => setForm((current) => ({ ...current, liveDemoUrl: e.target.value }))} />
      <label className="bbAdminMuted"><input type="checkbox" name="featured" checked={Boolean(form.featured)} onChange={(e) => setForm((current) => ({ ...current, featured: e.target.checked }))} /> Featured</label>
      <textarea className="bbAdminTextarea" name="challenges" value={toLines(form.challenges)} placeholder="Challenges, one per line" onChange={(e) => setForm((current) => ({ ...current, challenges: fromLines(e.target.value) }))} />
      <textarea className="bbAdminTextarea" name="solutions" value={toLines(form.solutions)} placeholder="Solutions, one per line" onChange={(e) => setForm((current) => ({ ...current, solutions: fromLines(e.target.value) }))} />
      <textarea className="bbAdminTextarea" name="outcome" value={toLines(form.outcomes?.length ? form.outcomes : form.outcome)} placeholder="Outcome, one per line" onChange={(e) => setForm((current) => ({ ...current, outcome: fromLines(e.target.value), outcomes: fromLines(e.target.value) }))} />
      <textarea className="bbAdminTextarea" name="futureImprovements" value={toLines(form.futureImprovements)} placeholder="Future improvements, one per line" onChange={(e) => setForm((current) => ({ ...current, futureImprovements: fromLines(e.target.value) }))} />
      <input className="bbAdminInput bbAdminFormFull" name="heroImage" value={form.heroImage} placeholder="Cover image path" onChange={(e) => setForm((current) => ({ ...current, heroImage: e.target.value, thumbnailImage: e.target.value }))} />
      <textarea className="bbAdminTextarea bbAdminFormFull" name="galleryImages" value={toLines(form.galleryImages)} placeholder="Gallery image paths, one per line" onChange={(e) => setForm((current) => ({ ...current, galleryImages: fromLines(e.target.value) }))} />
      <div className="bbAdminFormFull">
        <FileUploader onUploaded={(path) => setForm((current) => ({ ...current, heroImage: path, thumbnailImage: path, galleryImages: [...(current.galleryImages ?? []), path] }))} />
      </div>
      <div className="bbAdminActions bbAdminFormFull">
        <button className="bbAdminButton" type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Project'}</button>
        <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

