import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from './pages/auth/Login'
import Dashboard from "./pages/Dashboard";
import ArchivedNotes from "./pages/ArchivedNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/archived" element={<ArchivedNotes />} />
        <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
