import styles from "./notes.module.css";

function CreateNoteForm({ newNote, setNewNote, onSave, onCancel }) {
  const handleTitleChange = (e) => {
    setNewNote({ ...newNote, title: e.target.value });
  };

  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    // Convert seperated string to array
    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setNewNote({ ...newNote, tags: tagsArray });
  };

  const handleContentChange = (e) => {
    setNewNote({ ...newNote, content: e.target.value });
  };

  const handleSave = () => {
    onSave();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={styles.detailsContainer}>
      {/* title input */}
      <input
        type="text"
        className={styles.createTitleInput}
        placeholder="Enter a title..."
        value={newNote.title}
        onChange={handleTitleChange}
      />

      {/* tags */}
      <div className={styles.createTagsSection}>
        <label className={styles.createTagsLabel}>Tags</label>
        <input
          type="text"
          className={styles.createTagsInput}
          placeholder="Add tags separated by commas"
          value={newNote.tags.join(", ")}
          onChange={handleTagsChange}
        />
      </div>

      {/* last edited status */}
      <div className={styles.createStatus}>
        <span className={styles.createStatusText}>Last edited</span>
        <span className={styles.createStatusValue}>Not yet saved</span>
      </div>

      {/* content text area  */}
      <textarea
        className={styles.createContentTextarea}
        placeholder="Start typing your note here..."
        value={newNote.content}
        onChange={handleContentChange}
      />

      {/* Action buttons (personnaly i think the first ones are very bad idea but the design is like that so i dont wanna change it) */}
      <div className={styles.detailActions}>
        <button className={styles.saveButton} onClick={handleSave}>
          Save Note
        </button>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CreateNoteForm;
