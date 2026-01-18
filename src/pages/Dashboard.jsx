import Sidebar from "../components/notes/Sidebar";
import styles from "./dashboard.module.css";
function Dashboard() {
  return (
    <div className={styles.mainContainer}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.rightSide}>
        <div className={styles.header}>Header content here (later)</div>
        <div className={styles.contentContainer}>Content container (later)</div>
      </div>
    </div>
  );
  
}

export default Dashboard;
