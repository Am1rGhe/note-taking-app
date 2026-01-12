# Note-Taking App - Project Structure

## Recommended Project Structure

### 1. **Folder Structure**
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Button, Input, Modal, etc.)
│   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   └── notes/          # Note-specific components
├── pages/              # Page-level components (routes)
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx   # Main app page with 3-column layout
│   └── ArchivedNotes.jsx
├── context/            # React Context for global state (or use a state management library)
│   ├── AuthContext.jsx
│   └── NotesContext.jsx
├── hooks/              # Custom React hooks
│   ├── useAuth.js
│   └── useNotes.js
├── services/           # API calls and business logic
│   ├── authService.js
│   └── notesService.js
├── utils/              # Helper functions
│   ├── storage.js      # localStorage utilities
│   └── formatters.js   # Date/tag formatters
├── routes/             # Route configuration
│   └── AppRoutes.jsx
└── App.jsx             # Main app component with router
```

### 2. **Component Hierarchy** (based on the 3-column layout)

**Main Dashboard Component:**
- `Dashboard.jsx` (container)
  - `Sidebar.jsx` (left column)
    - `NavigationMenu.jsx`
    - `TagsList.jsx`
  - `NotesList.jsx` (middle column)
    - `NoteCard.jsx` (individual note preview)
    - `CreateNoteButton.jsx`
  - `NoteDetail.jsx` (right column)
    - `SearchBar.jsx`
    - `NoteEditor.jsx` (or `NoteViewer.jsx`)
    - `NoteActions.jsx` (Archive, Delete buttons)

### 3. **Routing Structure**
- `/login` - Login page
- `/signup` - Signup page (if you have it)
- `/dashboard` or `/` - Main app (protected route)
  - Default view: "All Notes"
  - `/archived` - Archived notes view
  - `/notes/:id` - Optional: direct note view

### 4. **State Management Approach**

**Options:**
- **React Context API** (good for this size)
  - `AuthContext` - User authentication state
  - `NotesContext` - Notes data, tags, selected note
- **Or a state library** (Zustand, Redux Toolkit) if you prefer

**Data Models:**
- **Notes:** `{ id, title, content, tags: [], createdAt, updatedAt, archived: boolean }`
- **User:** `{ id, email, name }`
- **Tags:** Array of strings (could be managed globally or per-note)

### 5. **Key Features to Implement**
1. Authentication - Login/Logout with protected routes
2. Notes Management - Create, Read, Update, Delete notes
3. Tags - Filter and organize notes by tags
4. Archive - Separate archived notes view
5. Search - Filter notes by title, content, or tags
6. Responsive Design - Mobile/Tablet/Desktop (mentioned in Figma)

### 6. **Styling Approach**
- CSS Modules
- Tailwind CSS (if you want utility-first)
- Styled Components (if you prefer CSS-in-JS)
- Or plain CSS with BEM naming

### 7. **Data Persistence** (for now)
- Start with `localStorage` (browser storage)
- Later: Backend API (REST/GraphQL)

### 8. **Additional Considerations**
- Theme: Dark/Light mode (Figma shows "Light")
- Responsive breakpoints for Mobile/Tablet/Desktop
- Loading states
- Error handling
- Form validation for login and note creation

## Recommended Tech Stack Additions
- React Router (already installed ✅)
- Form library: React Hook Form (for login/notes forms)
- Date formatting: date-fns or Day.js
- UI components: Optional (or build custom based on Figma)
