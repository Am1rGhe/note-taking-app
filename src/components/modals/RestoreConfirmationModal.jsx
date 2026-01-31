import styles from "./RestoreConfirmationModal.module.css";

function RestoreConfirmationModal({ isOpen, onClose, onConfirm, noteTitle }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#0E121B"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z"
              />
              <path
                stroke="#0E121B"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 10 12 7l3 3M12 17V7"
              />
            </svg>
          </div>
          <h3 className={styles.modalTitle}>Restore Note</h3>
        </div>
        <p className={styles.modalMessage}>
          Are you sure you want to restore this note? It will be moved back to
          your All Notes section.
        </p>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.restoreButton} onClick={onConfirm}>
            Restore Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestoreConfirmationModal;
