import { FormEvent, useState } from 'react';
import { FileUploader } from '../../components/admin/FileUploader.js';
import { RichTextEditor } from '../../components/admin/RichTextEditor.js';
import { type AdminBlog } from '../../services/adminService.js';

const emptyBlog: AdminBlog = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  tags: [],
  category: '',
  readingTime: '',
  publishedDate: new Date().toISOString().slice(0, 10),
  coverImage: '',
  featured: false,
  published: false,
};

const csv = (items?: string[]) => (items ?? []).join(', ');
const fromCsv = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean);
const formValue = (data: FormData, key: string) => String(data.get(key) ?? '');

export function BlogEditor({
  blog,
  onSave,
  onCancel,
}: {
  blog?: AdminBlog;
  onSave: (blog: AdminBlog) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<AdminBlog>({ ...emptyBlog, ...blog });
  const [isSaving, setIsSaving] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const payload: AdminBlog = {
      ...form,
      title: form.title,
      slug: form.slug,
      category: formValue(data, 'category'),
      readingTime: formValue(data, 'readingTime'),
      publishedDate: formValue(data, 'publishedDate'),
      tags: fromCsv(formValue(data, 'tags')),
      excerpt: formValue(data, 'excerpt'),
      coverImage: formValue(data, 'coverImage'),
      featured: data.get('featured') === 'on',
      published: data.get('published') === 'on',
    };

    setIsSaving(true);
    try {
      await onSave(payload);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="bbAdminForm" onSubmit={submit}>
      <input className="bbAdminInput" name="title" value={form.title} placeholder="Title" onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} />
      <input className="bbAdminInput" name="slug" value={form.slug} placeholder="Slug" onChange={(e) => setForm((current) => ({ ...current, slug: e.target.value }))} />
      <input className="bbAdminInput" name="category" value={form.category} placeholder="Category" onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))} />
      <input className="bbAdminInput" name="readingTime" value={form.readingTime} placeholder="Reading Time" onChange={(e) => setForm((current) => ({ ...current, readingTime: e.target.value }))} />
      <input className="bbAdminInput" name="publishedDate" type="date" value={form.publishedDate} onChange={(e) => setForm((current) => ({ ...current, publishedDate: e.target.value }))} />
      <input className="bbAdminInput" name="tags" value={csv(form.tags)} placeholder="Tags, comma separated" onChange={(e) => setForm((current) => ({ ...current, tags: fromCsv(e.target.value) }))} />
      <textarea className="bbAdminTextarea bbAdminFormFull" name="excerpt" value={form.excerpt} placeholder="Excerpt" onChange={(e) => setForm((current) => ({ ...current, excerpt: e.target.value }))} />
      <div className="bbAdminFormFull"><RichTextEditor value={form.content} onChange={(content) => setForm((current) => ({ ...current, content }))} /></div>
      <input className="bbAdminInput bbAdminFormFull" name="coverImage" value={form.coverImage} placeholder="Cover image path" onChange={(e) => setForm((current) => ({ ...current, coverImage: e.target.value }))} />
      <div className="bbAdminFormFull"><FileUploader onUploaded={(path) => setForm((current) => ({ ...current, coverImage: path }))} /></div>
      <label className="bbAdminMuted"><input type="checkbox" name="featured" checked={form.featured} onChange={(e) => setForm((current) => ({ ...current, featured: e.target.checked }))} /> Featured</label>
      <label className="bbAdminMuted"><input type="checkbox" name="published" checked={form.published} onChange={(e) => setForm((current) => ({ ...current, published: e.target.checked }))} /> Published</label>
      <div className="bbAdminActions bbAdminFormFull">
        <button className="bbAdminButton" type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Blog'}</button>
        <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
