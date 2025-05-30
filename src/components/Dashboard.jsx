import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [notes, setNotes] = useState(location.state?.notes || {});
    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem("currentUser")
    );

    // console.log(location.state?.notes);
    useEffect(() => {
        if (location.state?.notes) {
            // console.log("Received notes:", location.state.notes);
            setNotes(location.state.notes);
            /*
                notes look like this,
                
                {
                    "id-1" : {
                        'title' : DECRYPTED,
                        'content' : DECRYPTED
                    },
                    'id-2' : {
                        'title' : DECRYPTED,
                        'content' : DECRYPTED    
                    }
                }
            */
        } else {
            console.warn("No notes found in location.state");
        }
    }, [location.state]);

    useEffect(() => {
        if (!currentUser || notes.length === 0) {
            navigate("/");
        }
    }, [navigate, currentUser]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddNote = () => {
        navigate("/edit-note");
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        navigate("/");
    };

    const handleEditNote = (id) => {
        console.log(`Editing note of id ${id}`);

        navigate(`/edit-note`, {
            state: {
                notes,
                id,
            },
        });
    };

    const handleDeleteNote = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
    };

    return (
        <div className="notes-page">
            <div className="main-content">
                <div className="header">
                    <h2>{currentUser}</h2>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            className="share-btn"
                            onClick={() => navigate("/share")}
                        >
                            Share
                        </button>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>

                <div className="notes-list">
                    {Object.keys(notes).map((id) => (
                        <div
                            key={id}
                            className="note-card"
                            onClick={() => handleEditNote(id)}
                        >
                            <h3>{notes[id].title}</h3>
                            <p>{notes[id].content}</p>
                            <button
                                className="delete-note-btn"
                                style={{ marginTop: "10px" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteNote(id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    {/* {JSON.stringify(notes, null, 2)} */}
                </div>

                <div className="add-note-btn-container">
                    <button className="add-note-btn" onClick={handleAddNote}>
                        Add Note
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
