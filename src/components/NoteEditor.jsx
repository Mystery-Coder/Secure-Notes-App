import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NoteEditor() {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.state.noteData);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState({});

    useEffect(() => {
        setNotes(location.state.notes);
        let id = location.state.id;
        let note = location.state.notes[id];
        setContent(note["content"]);
        setTitle(note["title"]);
    }, [location.state]);

    // useEffect(() => {
    //     const currentUser = localStorage.getItem("currentUser");
    //     if (!currentUser) {
    //         navigate("/");
    //         return;
    //     }
    //     const allNotes = JSON.parse(localStorage.getItem("notes")) || {};
    //     const userNotes = allNotes[currentUser] || [];

    //     if (noteId) {
    //         const existingNote = userNotes.find((note) => note.id === noteId);
    //         if (existingNote) {
    //             setTitle(existingNote.title);
    //             setContent(existingNote.content);
    //             setLabel(existingNote.label || "Work");
    //         }
    //     }
    // }, [navigate]);

    const handleSave = () => {
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) return;

        const allNotes = JSON.parse(localStorage.getItem("notes")) || {};
        const userNotes = allNotes[currentUser] || [];

        if (noteId) {
            // Update existing note
            const updatedNotes = userNotes.map((note) =>
                note.id === noteId ? { ...note, title, content } : note
            );
            allNotes[currentUser] = updatedNotes;
        } else {
            // Create new note
            const newNote = {
                id: Date.now().toString(),
                title,
                content,
            };
            allNotes[currentUser] = [...userNotes, newNote];
        }

        localStorage.setItem("notes", JSON.stringify(allNotes));
        navigate("/dashboard");
    };

    return (
        <div className="note-editor-page">
            <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                rows="10"
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSave}>Save Note</button>
            <br />
            <br />
            <button
                onClick={() => {
                    console.log("Going back to dashboard");

                    navigate("/dashboard", {
                        state: {
                            notes,
                        },
                    });
                }}
                style={{
                    backgroundColor: "#e63946",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    marginBottom: "20px",
                    cursor: "pointer",
                }}
            >
                Back
            </button>
        </div>
    );
}

export default NoteEditor;
