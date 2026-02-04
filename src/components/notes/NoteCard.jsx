import styles from "./notes.module.css";

function NoteCard({ note, onClick, isSelected }) {
  if (!note) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(note);
    }
  };

  return (
    <div
      className={`${styles.noteCard} ${isSelected ? styles.selected : ""}`}
      onClick={handleClick}
    >
      <h3 className={styles.noteTitle}>{note.title}</h3>
      <div className={styles.noteTags}>
        {note.tags && note.tags.length > 0 ? (
          note.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))
        ) : (
          <span>No tags</span>
        )}
      </div>
      <p className={styles.noteDate}>{formatDate(note.date || note.lastEdited)}</p>
    </div>
  );
}

export default NoteCard;
