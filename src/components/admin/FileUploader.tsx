import { useState } from 'react';
import { adminApi } from '../../services/adminService.js';

export function FileUploader({ onUploaded }: { onUploaded: (path: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="bbAdminUploader">
      <input
        className="bbAdminInput"
        type="file"
        accept="image/*"
        disabled={isUploading}
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          setIsUploading(true);
          try {
            const result = await adminApi.uploadImage(file);
            onUploaded(result.image.path);
          } finally {
            setIsUploading(false);
          }
        }}
      />
      <span className="bbAdminMuted">{isUploading ? 'Uploading...' : 'Upload image'}</span>
    </div>
  );
}

