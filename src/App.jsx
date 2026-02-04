import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { supabase } from "./lib/supabase";

import ArchivedNotes from "./pages/ArchivedNotes";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import TaggedNotes from "./pages/TaggedNotes";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  console.log('Supabase client:', supabase);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/archived"
          element={
            <ProtectedRoute>
              <ArchivedNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tags/:tagName"
          element={
            <ProtectedRoute>
              <TaggedNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
