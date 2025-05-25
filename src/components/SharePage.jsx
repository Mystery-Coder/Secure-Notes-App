import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SharePage() {
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('currentUser');
    const [recipient, setRecipient] = useState('');
    const [notes, setNotes] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState([]);

    useEffect(() => {
        const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
        setNotes(allNotes[currentUser] || []);
    }, [currentUser]);

    const toggleNoteSelection = (id) => {
        setSelectedNotes(prev =>
            prev.includes(id) ? prev.filter(noteId => noteId !== id) : [...prev, id]
        );
    };

    return (
        <div className="note-editor-page">
            <button
                onClick={() => navigate('/dashboard')}
                style={{
                    backgroundColor: '#e63946',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    marginBottom: '20px',
                    cursor: 'pointer',
                }}
            >
                Back
            </button>

            <h2 style={{ marginBottom: '20px' }}>Share Notes</h2>
            <input
                type="text"
                placeholder="Enter recipient's username"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#2c2c2c',
                    color: 'white',
                    fontSize: '1rem'
                }}
            />

            {notes.map(note => (
                <div key={note.id} style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={selectedNotes.includes(note.id)}
                            onChange={() => toggleNoteSelection(note.id)}
                        />
                        <span>{note.title}</span>
                    </label>
                </div>
            ))}


            <button
                onClick={() => alert('Send action is not implemented yet')}
                style={{
                    backgroundColor: '#00adb5',
                    padding: '12px 30px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    border: 'none',
                    color: 'white',
                }}
            >
                Send
            </button>
        </div>
    );
}

export default SharePage;