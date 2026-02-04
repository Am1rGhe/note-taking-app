import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes from Supabase when user logs in
  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setNotes([]);
      setLoading(false);
    }
  }, [user]);

  // Function to fetch notes from Supabase
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new note
  const createNote = async (noteData) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .insert([
          {
            ...noteData,
            user_id: user.id,
            date: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setNotes([data, ...notes]);
      return data;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  };

  // Update an existing note
  const updateNote = async (noteId, updates) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .update({
          ...updates,
          date: new Date().toISOString(),
        })
        .eq("id", noteId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      setNotes(notes.map((note) => (note.id === noteId ? data : note)));
      return data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  // Delete a note
  const deleteNote = async (noteId) => {
    try {
      const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", noteId)
        .eq("user_id", user.id);

      if (error) throw error;
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  // archive a note
  const archiveNote = async (noteId) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .update({ archived: true })
        .eq("id", noteId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      setNotes(notes.map((note) => (note.id === noteId ? data : note)));
      return data;
    } catch (error) {
      console.error("Error archiving note:", error);
      throw error;
    }
  };

  // restore a note
  const restoreNote = async (noteId) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .update({ archived: false })
        .eq("id", noteId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      setNotes(notes.map((note) => (note.id === noteId ? data : note)));
      return data;
    } catch (error) {
      console.error("Error restoring note:", error);
      throw error;
    }
  };

  const value = {
    notes,
    loading,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
    restoreNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

// Custom hook to use notes context
export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
