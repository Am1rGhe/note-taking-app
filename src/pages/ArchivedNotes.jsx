import Sidebar from "../components/notes/Sidebar";
import styles from "./dashboard.module.css";

function ArchivedNotes() {
  return (
    <div className={styles.mainContainer}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.rightSide}>
        <div className={styles.header}>Archived Notes</div>
        <div className={styles.contentContainer}>Archived content container (later)</div>
      </div>
    </div>
  );
}

export default ArchivedNotes;
