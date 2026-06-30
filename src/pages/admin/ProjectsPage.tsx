import { useEffect, useMemo, useState } from 'react';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog.js';
import { DataTable } from '../../components/admin/DataTable.js';
import { Modal } from '../../components/admin/Modal.js';
import { Pagination } from '../../components/admin/Pagination.js';
import { SearchBar } from '../../components/admin/SearchBar.js';
import { adminApi, type AdminProject } from '../../services/adminService.js';
import { ProjectEditor } from './ProjectEditor.js';

export function ProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleting, setDeleting] = useState<AdminProject | null>(null);

  const load = () => adminApi.projects().then((payload) => setProjects(payload.projects));

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(
    () => projects.filter((project) => `${project.title} ${project.slug} ${project.status}`.toLowerCase().includes(query.toLowerCase())),
    [projects, query],
  );

  async function save(project: AdminProject) {
    console.info('[Admin CRUD] ProjectsPage save executed', {
      mode: project._id ? 'update' : 'create',
      id: project._id,
      slug: project.slug,
    });
    if (project._id) await adminApi.updateProject(project._id, project);
    else await adminApi.createProject(project);
    setEditing(null);
    setIsCreating(false);
    await load();
  }

  async function toggleFeatured(project: AdminProject) {
    if (project._id) {
      await adminApi.updateProject(project._id, { ...project, featured: !project.featured });
      await load();
    }
  }

  return (
    <>
      <div className="bbAdminPanel bbAdminControlsPanel">
        <div className="bbAdminPageHead">
          <div><h1 className="bbAdminTitle">Projects</h1><p className="bbAdminMuted">Create, edit, search, feature, and delete portfolio projects.</p></div>
          <button className="bbAdminButton" type="button" onClick={() => setIsCreating(true)}>Add Project</button>
        </div>
        <SearchBar value={query} onChange={setQuery} placeholder="Search projects" />
      </div>
      <DataTable headers={['Title', 'Status', 'Featured', 'Technologies', 'Actions']}>
        {filtered.map((project) => (
          <tr key={project._id ?? project.slug}>
            <td>{project.title}<div className="bbAdminMuted">{project.slug}</div></td>
            <td><span className="bbAdminBadge">{project.status ?? 'Draft'}</span></td>
            <td>{project.featured ? 'Yes' : 'No'}</td>
            <td>{project.technologies?.join(', ')}</td>
            <td className="bbAdminActions">
              <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={() => setEditing(project)}>Edit</button>
              <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={() => toggleFeatured(project)}>{project.featured ? 'Unfeature' : 'Feature'}</button>
              <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={() => setDeleting(project)}>Delete</button>
            </td>
          </tr>
        ))}
      </DataTable>
      <Pagination label={`${filtered.length} projects`} />
      {(isCreating || editing) && <Modal title={editing ? 'Edit Project' : 'Add Project'} onClose={() => { setEditing(null); setIsCreating(false); }}><ProjectEditor project={editing ?? undefined} onSave={save} onCancel={() => { setEditing(null); setIsCreating(false); }} /></Modal>}
      {deleting && <ConfirmDialog title="Delete Project" message={`Delete ${deleting.title}?`} onCancel={() => setDeleting(null)} onConfirm={async () => { if (deleting._id) await adminApi.deleteProject(deleting._id); setDeleting(null); await load(); }} />}
    </>
  );
}
