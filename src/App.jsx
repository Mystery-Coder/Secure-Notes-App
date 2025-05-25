import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import NoteEditor from "./components/NoteEditor";
import SharePage from "./components/SharePage";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/edit-note" element={<NoteEditor />} />
                <Route path="/share" element={<SharePage />} />
            </Routes>
        </Router>
    );
}

export default App;
