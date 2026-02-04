import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArchiveConfirmationModal from "../components/modals/ArchiveConfirmationModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import CreateNoteForm from "../components/notes/CreateNoteForm";
import NoteCard from "../components/notes/NoteCard";
import NoteDetail from "../components/notes/NoteDetail";
import notesStyles from "../components/notes/notes.module.css";
import Sidebar from "../components/notes/Sidebar";
import { useNotes } from "../contexts/NotesContext";
import styles from "./dashboard.module.css";

function Dashboard() {
  const {
    notes,
    createNote: createNoteInDB,
    updateNote: updateNoteInDB,
    deleteNote: deleteNoteInDB,
    archiveNote: archiveNoteInDB,
  } = useNotes();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const isArchivedPage = location.pathname === "/archived";

  // Filter notes based on archived status
  const activeNotes = notes.filter((note) => !note.archived);
  // Sort so latest created note (highest id) appears first
  const sortedActiveNotes = [...activeNotes].sort((a, b) => b.id - a.id);

  const [selectedNoteId, setSelectedNoteId] = useState(
    sortedActiveNotes.length > 0 ? sortedActiveNotes[0].id : null
  );

  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: [],
    archived: false,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  // Adding the editing state to the dashboard
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const handleNoteClick = (note) => {
    if (note.id !== "creating") {
      setSelectedNoteId(note.id);
      setIsCreating(false);
    }
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setNewNote({
      title: "",
      content: "",
      tags: [],
      archived: false, // Dashboard creates active notes
    });
    setSelectedNoteId("creating");
  };

  const handleSaveNote = async () => {
    try {
      const createdNote = await createNoteInDB({
        title: newNote.title || 'Untitled Note',
        content: newNote.content,
        tags: newNote.tags,
        archived: false,
      });
      setIsCreating(false);
      setNewNote({ title: '', content: '', tags: [], archived: false });
      // Select the newly created note
      if (createdNote) {
        setSelectedNoteId(createdNote.id);
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewNote({ title: "", content: "", tags: [], archived: false });
    if (sortedActiveNotes.length > 0) {
      setSelectedNoteId(sortedActiveNotes[0].id);
    } else {
      setSelectedNoteId(null);
    }
  };

  const handleSearchClick = () => {
    const trimmedQuery = searchInput.trim();
    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedNoteId) {
      try {
        await deleteNoteInDB(selectedNoteId);
        setIsDeleteModalOpen(false);
        // Select the first available note or set to null
        const remainingNotes = sortedActiveNotes.filter(
          (note) => note.id !== selectedNoteId
        );
        if (remainingNotes.length > 0) {
          setSelectedNoteId(remainingNotes[0].id);
        } else {
          setSelectedNoteId(null);
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleArchiveClick = () => {
    setIsArchiveModalOpen(true);
  };

  const handleArchiveConfirm = async () => {
    if (selectedNoteId) {
      try {
        await archiveNoteInDB(selectedNoteId);
        setIsArchiveModalOpen(false);
        // Auto-select next note
        const remainingNotes = sortedActiveNotes.filter(
          (note) => note.id !== selectedNoteId
        );
        if (remainingNotes.length > 0) {
          setSelectedNoteId(remainingNotes[0].id);
        } else {
          setSelectedNoteId(null);
        }
      } catch (error) {
        console.error('Error archiving note:', error);
      }
    }
  };

  const handleArchiveCancel = () => {
    setIsArchiveModalOpen(false);
  };

  const handleStartEdit = () => {
    if (selectedNote) {
      setEditNote({ ...selectedNote });
      setIsEditing(true);
    }
  };

  const handleSaveEdit = async () => {
    if (editNote && selectedNoteId) {
      try {
        await updateNoteInDB(selectedNoteId, {
          title: editNote.title,
          content: editNote.content,
          tags: editNote.tags,
        });
        setIsEditing(false);
        setEditNote(null);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditNote(null);
  };

  const selectedNote = sortedActiveNotes.find(
    (note) => note.id === selectedNoteId
  );

  return (
    <div className={styles.mainContainer}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.rightSide}>
        {/* header  */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>All Notes</h2>
          <div className={styles.headerRight}>
            <div className={styles.searchWrapper}>
              <button
                className={styles.searchButton}
                onClick={handleSearchClick}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#717784"
                    fillRule="evenodd"
                    d="M11.248 3.5a7.289 7.289 0 1 0 0 14.577 7.289 7.289 0 0 0 0-14.577ZM2.46 10.79a8.789 8.789 0 1 1 17.577 0 8.789 8.789 0 0 1-17.577 0Z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="#717784"
                    fillRule="evenodd"
                    d="m16.736 15.648 5.616 5.6-1.06 1.063-5.615-5.601 1.06-1.062Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search by title, content, or tags..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchClick();
                  }
                }}
              />
            </div>
            <button 
              className={styles.settingsButton}
              onClick={() => navigate("/settings")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0E121B"
                  fillRule="evenodd"
                  d="M8.959 4.529A2.529 2.529 0 0 1 11.488 2h1.221a1.243 1.243 0 0 0 .035.001 2.542 2.542 0 0 1 2.458 2.602c.004.164.05.324.133.467l.003.005.002.003.003.005c.289.488.92.65 1.408.36l.01-.005a2.541 2.541 0 0 1 3.464.93v.001l.583 1.011c.015.025.028.05.039.077a2.54 2.54 0 0 1-.967 3.386l-.005.003c-.156.09-.286.22-.375.376l-.009.015-.001.002c-.28.49-.112 1.112.374 1.396l.002.002.015.008.038.023a2.528 2.528 0 0 1 .887 3.445l-.004.008-.614 1.025a2.54 2.54 0 0 1-3.46.926 1.079 1.079 0 0 0-.497-.14h-.01a1.029 1.029 0 0 0-1.019 1.034v.01a2.54 2.54 0 0 1-2.541 2.524h-1.17a2.54 2.54 0 0 1-2.54-2.536.966.966 0 0 0-.147-.498 1.023 1.023 0 0 0-1.4-.37l-.003.002a.626.626 0 0 1-.03.016 2.541 2.541 0 0 1-3.442-.993l-.578-.996a1.144 1.144 0 0 1-.018-.03 2.528 2.528 0 0 1 .938-3.447 1.041 1.041 0 0 0-.001-1.803h-.001a2.54 2.54 0 0 1-.93-3.466l.01-.015.622-1.024a2.54 2.54 0 0 1 3.46-.923l.009.005a.963.963 0 0 0 .479.135 1.04 1.04 0 0 0 1.04-1.022V4.53Zm6.386.557v.002-.002ZM11.488 3.5c-.569 0-1.029.46-1.029 1.029v.023a2.541 2.541 0 0 1-2.547 2.505h-.005a2.463 2.463 0 0 1-1.226-.34 1.04 1.04 0 0 0-1.416.382l-.009.014-.62 1.02a1.04 1.04 0 0 0 .385 1.413l-.376.65.375-.65a2.542 2.542 0 0 1 0 4.402h-.002a1.029 1.029 0 0 0-.377 1.411l.59 1.016.007.014a1.041 1.041 0 0 0 1.42.406 2.523 2.523 0 0 1 3.43.897l.003.003.013.021.002.005c.221.373.34.797.344 1.232v.007c0 .574.466 1.04 1.042 1.04h1.169a1.04 1.04 0 0 0 1.041-1.03 2.528 2.528 0 0 1 2.511-2.539h.049c.426.011.84.128 1.209.338l.003.002a1.04 1.04 0 0 0 1.419-.382l.005-.01.615-1.025a1.028 1.028 0 0 0-.382-1.41 2.528 2.528 0 0 1-.95-3.439l.022-.036a2.51 2.51 0 0 1 .925-.923 1.04 1.04 0 0 0 .38-1.413.71.71 0 0 1-.032-.06l-.55-.953a1.041 1.041 0 0 0-1.415-.383 2.527 2.527 0 0 1-3.457-.887l-.003-.005-.002-.003c0-.002-.002-.003-.003-.005a2.464 2.464 0 0 1-.343-1.262 1.042 1.042 0 0 0-1-1.074h-.032l-.01-.001h-1.173ZM6.623 16.815l.002-.001-.002.001Zm5.455-6.785a1.717 1.717 0 1 0 0 3.434 1.717 1.717 0 0 0 0-3.434Zm-3.217 1.718a3.217 3.217 0 1 1 6.434-.001 3.217 3.217 0 0 1-6.434.001Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.notesList}>
            <button
              className={styles.createNoteButton}
              onClick={handleCreateClick}
            >
              + Create New Note
            </button>
            {isCreating && (
              <div
                className={`${notesStyles.noteCard} ${notesStyles.selected}`}
                onClick={() => {}}
              >
                <h3 className={notesStyles.noteTitle}>Untitled Note</h3>
              </div>
            )}
            {sortedActiveNotes.length > 0
              ? sortedActiveNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onClick={handleNoteClick}
                    isSelected={selectedNoteId === note.id && !isCreating}
                  />
                ))
              : !isCreating && (
                  <div className={notesStyles.emptyState}>
                    <p>
                      You don't have any notes yet. Start a new note to capture
                      your thoughts and ideas.
                    </p>
                  </div>
                )}
          </div>
          <div>
            {isCreating ? (
              <CreateNoteForm
                newNote={newNote}
                setNewNote={setNewNote}
                onSave={handleSaveNote}
                onCancel={handleCancelCreate}
              />
            ) : (
              <NoteDetail
                note={selectedNote}
                isEditing={isEditing}
                editNote={editNote}
                setEditNote={setEditNote}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                onStartEdit={handleStartEdit}
              />
            )}
          </div>
          <div className={styles.actionButtonsContainer}>
            <div className={notesStyles.archiveDeleteButtonsContainer}>
              <button
                className={notesStyles.archiveDeleteButton}
                onClick={handleArchiveClick}
              >
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
                    d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059"
                  />
                </svg>
                <p>Archive Note</p>
              </button>
              <button
                className={`${notesStyles.archiveDeleteButton} ${notesStyles.deleteButton}`}
                onClick={handleDeleteClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  fill="none"
                  viewBox="0 0 24 25"
                >
                  <path
                    stroke="#0E121B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m14.852 3.879.818 1.785h2.64c.811 0 1.47.658 1.47 1.47V8.22c0 .555-.45 1.005-1.006 1.005H5.005C4.45 9.226 4 8.776 4 8.221V7.133c0-.811.658-1.47 1.47-1.47h2.639l.818-1.784c.246-.536.78-.879 1.37-.879h3.185c.59 0 1.125.343 1.37.879ZM18.24 9.3v8.686c0 1.665-1.333 3.014-2.977 3.014H8.517c-1.644 0-2.977-1.349-2.977-3.014V9.301M10.2 12.816v4.509m3.38-4.509v4.509"
                  />
                </svg>
                <p>Delete Note</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        noteTitle={selectedNote?.title || "this note"}
      />
      <ArchiveConfirmationModal
        isOpen={isArchiveModalOpen}
        onClose={handleArchiveCancel}
        onConfirm={handleArchiveConfirm}
        noteTitle={selectedNote?.title || "this note"}
      />
    </div>
  );
}

export default Dashboard;
