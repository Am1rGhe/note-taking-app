# Note-Taking App

A modern, full-stack note-taking application built with React and Supabase. Organize your thoughts, ideas, and tasks with a clean, intuitive interface featuring tags, search, and archive functionality.

## ✨ Features

### Authentication
- **User Registration & Login** - Secure authentication using Supabase Auth
- **Protected Routes** - Automatic redirect to login for unauthenticated users
- **Session Management** - Persistent sessions across browser refreshes
- **Password Management** - Change password functionality with validation
- **Logout Confirmation** - Safety confirmation before logging out

### Notes Management
- **Create Notes** - Add new notes with title, content, and tags
- **Edit Notes** - Inline editing for title, content, and tags
- **Delete Notes** - Permanent deletion with confirmation modal
- **Archive Notes** - Archive and restore notes without deleting
- **View Notes** - Detailed note view with formatted dates and metadata

### Organization
- **Tags System** - Organize notes with custom tags
- **Tag Filtering** - View notes by specific tags
- **Search Functionality** - Search notes by title, content, or tags
- **Archived Notes View** - Separate view for archived notes
- **Sorting** - Notes sorted by creation date (newest first)

### User Interface
- **Responsive Design** - Fully responsive for mobile, tablet, and desktop
- **Three-Column Layout** - Sidebar, notes list, and note detail view
- **Modern UI** - Clean, minimalist design with smooth animations
- **Font Customization** - Choose between Sans-serif, Serif, and Monospace fonts
- **Color Theme Options** - Light, Dark, and System theme support (UI ready)

### Settings
- **Font Theme Selection** - Customize app font family
- **Color Theme Selection** - Choose your preferred color scheme
- **Password Management** - Change password with old password verification

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped styling

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication service
  - Real-time capabilities
  - Row Level Security (RLS) policies

### State Management
- **React Context API** - Global state management
  - `AuthContext` - User authentication state
  - `NotesContext` - Notes data and operations

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/note-taking-app.git
   cd note-taking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   You can find these values in your Supabase project settings.

4. **Set up Supabase Database**
   
   Create a table named `note` with the following structure:
   ```sql
   CREATE TABLE note (
     id SERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     title TEXT NOT NULL,
     content TEXT,
     tags TEXT[],
     date TIMESTAMPTZ DEFAULT NOW(),
     archived BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```
   
   Enable Row Level Security (RLS) and create policies:
   - Users can only see their own notes
   - Users can only create notes for themselves
   - Users can only update their own notes
   - Users can only delete their own notes

5. **Disable Email Confirmation (for development)**
   
   In Supabase Dashboard → Authentication → Settings:
   - Disable "Enable email confirmations" for local development

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── modals/              # Confirmation modals
│   │   ├── ArchiveConfirmationModal.jsx
│   │   ├── DeleteConfirmationModal.jsx
│   │   ├── LogoutConfirmationModal.jsx
│   │   └── RestoreConfirmationModal.jsx
│   ├── notes/               # Note-related components
│   │   ├── CreateNoteForm.jsx
│   │   ├── NoteCard.jsx
│   │   ├── NoteDetail.jsx
│   │   └── Sidebar.jsx
│   └── ProtectedRoute.jsx   # Route protection component
├── contexts/                # React Context providers
│   ├── AuthContext.jsx      # Authentication state
│   └── NotesContext.jsx     # Notes state and operations
├── lib/
│   └── supabase.js          # Supabase client configuration
├── pages/
│   ├── auth/                # Authentication pages
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── ArchivedNotes.jsx    # Archived notes view
│   ├── Dashboard.jsx        # Main dashboard
│   ├── Search.jsx           # Search results page
│   ├── Settings.jsx          # User settings
│   └── TaggedNotes.jsx       # Tag-filtered notes view
├── App.jsx                  # Main app component with routes
└── main.jsx                 # App entry point
```

## 🚀 Usage

### Creating a Note
1. Click "Create New Note" button
2. Enter note title and content
3. Add tags (comma-separated)
4. Click "Save Note"

### Editing a Note
1. Select a note from the list
2. Click "Edit" button
3. Modify title, content, or tags
4. Click "Save Note" to save changes

### Organizing Notes
- **Tags**: Add tags when creating/editing notes, then click tags in sidebar to filter
- **Archive**: Click "Archive Note" to move notes to archived view
- **Search**: Use the search bar to find notes by title, content, or tags

### Settings
- Navigate to Settings from the sidebar
- Change font theme (Sans-serif, Serif, Monospace)
- Change color theme (Light, Dark, System)
- Update your password

## 🔒 Security

- **Environment Variables** - API keys stored in `.env` file (not committed)
- **Row Level Security** - Database policies ensure users only access their own data
- **Protected Routes** - Authentication required for all app pages
- **Password Validation** - Secure password requirements and verification

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- **Desktop**: > 1024px - Full three-column layout
- **Tablet**: 768px - 1024px - Adjusted column widths
- **Mobile**: < 767px - Stacked layout with slide-out sidebar

## 🎨 Customization

### Font Themes
- **Sans-serif**: Clean, modern (Inter font)
- **Serif**: Classic, elegant (Georgia, Times New Roman)
- **Monospace**: Code-like, technical (Courier New, Monaco)

Font preferences are saved to localStorage and persist across sessions.

## 🔮 Future Enhancements

- [ ] Dark mode implementation
- [ ] Rich text editing (markdown support)
- [ ] Note sharing functionality
- [ ] Export notes (PDF, Markdown)
- [ ] Note templates
- [ ] Reminders and due dates
- [ ] Note attachments
- [ ] Collaborative editing

## 👤 Author

**Amir Ghouari** - [GitHub Profile](https://github.com/Am1rGhe/)
