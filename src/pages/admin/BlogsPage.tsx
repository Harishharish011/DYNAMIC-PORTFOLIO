import { useEffect, useMemo, useState } from 'react';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog.js';
import { DataTable } from '../../components/admin/DataTable.js';
import { Modal } from '../../components/admin/Modal.js';
import { Pagination } from '../../components/admin/Pagination.js';
import { SearchBar } from '../../components/admin/SearchBar.js';
import { adminApi, type AdminBlog } from '../../services/adminService.js';
import { BlogEditor } from './BlogEditor.js';

export function BlogsPage() {
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<AdminBlog | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleting, setDeleting] = useState<AdminBlog | null>(null);

  const load = () => adminApi.blogs().then((payload) => setBlogs(payload.blogs));

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(
    () => blogs.filter((blog) => `${blog.title} ${blog.slug} ${blog.category}`.toLowerCase().includes(query.toLowerCase())),
    [blogs, query],
  );

  async function save(blog: AdminBlog) {
    console.info('[Admin CRUD] BlogsPage save executed', {
      mode: blog._id ? 'update' : 'create',
      id: blog._id,
      slug: blog.slug,
    });
    if (blog._id) await adminApi.updateBlog(blog._id, blog);
    else await adminApi.createBlog(blog);
    setEditing(null);
    setIsCreating(false);
    await load();
  }

  async function togglePublished(blog: AdminBlog) {
    if (blog._id) {
      await adminApi.updateBlog(blog._id, { ...blog, published: !blog.published });
      await load();
    }
  }

  async function toggleFeatured(blog: AdminBlog) {
    if (blog._id) {
      await adminApi.updateBlog(blog._id, { ...blog, featured: !blog.featured });
      await load();
    }
  }

  return (
    <>
      <div className="bbAdminPanel bbAdminControlsPanel">
        <div className="bbAdminPageHead">
          <div><h1 className="bbAdminTitle">Blogs</h1><p className="bbAdminMuted">Create drafts, publish articles, edit metadata, and manage content.</p></div>
          <button className="bbAdminButton" type="button" onClick={() => setIsCreating(true)}>Add Blog</button>
        </div>
        <SearchBar value={query} onChange={setQuery} placeholder="Search blogs" />
      </div>
      <DataTable headers={['Title', 'Category', 'State', 'Featured', 'Actions']}>
        {filtered.map((blog) => (
          <tr key={blog._id ?? blog.slug}>
            <td>{blog.title}<div className="bbAdminMuted">{blog.slug}</div></td>
            <td>{blog.category}</td>
            <td><span className="bbAdminBadge">{blog.published ? 'Published' : 'Draft'}</span></td>
            <td>{blog.featured ? 'Yes' : 'No'}</td>
            <td className="bbAdminActions">
              <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={() => setEditing(blog)}>Edit</button>
              <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={() => togglePublished(blog)}>{blog.published ? 'Draft' : 'Publish'}</button>
              <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={() => toggleFeatured(blog)}>{blog.featured ? 'Unfeature' : 'Feature'}</button>
              <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={() => setDeleting(blog)}>Delete</button>
            </td>
          </tr>
        ))}
      </DataTable>
      <Pagination label={`${filtered.length} blogs`} />
      {(isCreating || editing) && <Modal title={editing ? 'Edit Blog' : 'Add Blog'} onClose={() => { setEditing(null); setIsCreating(false); }}><BlogEditor blog={editing ?? undefined} onSave={save} onCancel={() => { setEditing(null); setIsCreating(false); }} /></Modal>}
      {deleting && <ConfirmDialog title="Delete Blog" message={`Delete ${deleting.title}?`} onCancel={() => setDeleting(null)} onConfirm={async () => { if (deleting._id) await adminApi.deleteBlog(deleting._id); setDeleting(null); await load(); }} />}
    </>
  );
}
