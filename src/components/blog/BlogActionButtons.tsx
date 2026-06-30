import { LikeButton } from './LikeButton.js';
import { CommentSectionPlaceholder } from './CommentSectionPlaceholder.js';
import { ShareButton } from './ShareButton.js';
import { SaveButton } from './SaveButton.js';

export function BlogActionButtons() {
  return (
    <div className="bbBlogActions" aria-label="Blog actions (placeholders)">
      <LikeButton />
      <button
        type="button"
        className="bbBlogAction bbBlogAction--comment"
        aria-label="Comments (placeholder)"
        disabled
      >
        Comment
      </button>
      <ShareButton />
      <SaveButton />

      {/* Structure placeholders for details page */}
      <div className="bbBlogActions__detailsPlaceholder">
        <CommentSectionPlaceholder />
      </div>
    </div>
  );
}

