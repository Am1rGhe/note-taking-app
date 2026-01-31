import styles from "./notes.module.css";

function NoteDetail({ note, isEditing = false, editNote, setEditNote, onSave, onCancel, onStartEdit }) {
  if (!note) {
    return (
      <div className={styles.detailsContainer}>
        <p className={styles.emptyState}>Select a note to view details</p>
      </div>
    );
  }

  // Format content to preserve line breaks
  const formattedContent = note.content
    ? note.content.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          {index < note.content.split("\n").length - 1 && <br />}
        </span>
      ))
    : "";

  return (
    <div className={styles.detailsContainer}>
      {/* Header */}
      <div className={styles.detailHeader}>
        {isEditing ? (
          <input
            type="text"
            className={styles.createTitleInput}
            value={editNote?.title || ""}
            onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
            placeholder="Enter title..."
          />
        ) : (
          <h3 className={styles.detailTitle}>{note.title}</h3>
        )}
      </div>

      {/* Tags and Date */}
      <div className={styles.detailMetadata}>
          <div className={styles.metadataIcon}>
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             fill="none"
             viewBox="0 0 24 24"
           >
             <path
               stroke="#717784"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="1.8"
               d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z"
               clipRule="evenodd"
             />
             <path
               stroke="#717784"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="1.8"
               d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z"
               clipRule="evenodd"
             />
           </svg>
           <p>Tags</p>
         </div>
        <span className={styles.metadataItem}>
          {isEditing ? (
            <input
              type="text"
              className={styles.createTagsInput}
              value={editNote?.tags ? editNote.tags.join(", ") : ""}
              onChange={(e) => {
                const tagsString = e.target.value;
                const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
                setEditNote({ ...editNote, tags: tagsArray });
              }}
              placeholder="Enter tags separated by commas..."
            />
          ) : (
            <>{note.tags ? note.tags.join(", ") : "None"}</>
          )}
        </span>
          <div className={styles.metadataIcon}>
           <svg
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M12.2505 3.75C7.69378 3.75 4.00049 7.44329 4.00049 12C4.00049 16.5558 7.69384 20.25 12.2505 20.25C16.8072 20.25 20.5005 16.5558 20.5005 12C20.5005 7.44329 16.8072 3.75 12.2505 3.75ZM2.50049 12C2.50049 6.61487 6.86536 2.25 12.2505 2.25C17.6356 2.25 22.0005 6.61487 22.0005 12C22.0005 17.3841 17.6357 21.75 12.2505 21.75C6.8653 21.75 2.50049 17.3841 2.50049 12Z"
               fill="#717784"
             />
             <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M11.9224 7.82666C12.3366 7.82666 12.6724 8.16245 12.6724 8.57666V12.2493L15.4819 13.9283C15.8375 14.1408 15.9535 14.6013 15.741 14.9569C15.5285 15.3124 15.068 15.4284 14.7124 15.2159L11.5376 13.3186C11.3111 13.1832 11.1724 12.9388 11.1724 12.6748V8.57666C11.1724 8.16245 11.5082 7.82666 11.9224 7.82666Z"
               fill="#717784"
             />
           </svg>
           <p>Last edited </p>
         </div>
        <span className={styles.metadataItem}>
          {note.date || note.lastEdited || "Unknown"}
        </span>
      </div>

      {/* Content */}
      <div className={styles.detailContent}>
        {isEditing ? (
          <textarea
            className={styles.createContentTextarea}
            value={editNote?.content || ""}
            onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
            placeholder="Enter content..."
          />
        ) : (
          <p className={styles.contentText}>{formattedContent}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className={styles.detailActions}>
        {!isEditing ? (
          <button className={styles.saveButton} onClick={() => onStartEdit && onStartEdit()}>
            Edit
          </button>
        ) : (
          <>
            <button className={styles.saveButton} onClick={() => onSave && onSave()}>
              Save Note
            </button>
            <button className={styles.cancelButton} onClick={() => onCancel && onCancel()}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NoteDetail;
