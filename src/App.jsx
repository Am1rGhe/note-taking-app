import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { supabase } from "./lib/supabase";

import ArchivedNotes from "./pages/ArchivedNotes";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import TaggedNotes from "./pages/TaggedNotes";
import Search from "./pages/Search";
import Settings from "./pages/Settings";

function App() {
  // Test Supabase connection
  console.log('Supabase client:', supabase);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/archived" element={<ArchivedNotes />} />
        <Route path="/tags/:tagName" element={<TaggedNotes />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
