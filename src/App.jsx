import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import ArchivedNotes from "./pages/ArchivedNotes";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import TaggedNotes from "./pages/TaggedNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/archived" element={<ArchivedNotes />} />
        <Route path="/tags/:tagName" element={<TaggedNotes />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
