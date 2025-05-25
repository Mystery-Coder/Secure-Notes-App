import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NoteEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const noteId = queryParams.get('id');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/');
      return;
    }
    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    const userNotes = allNotes[currentUser] || [];

    if (noteId) {
      const existingNote = userNotes.find((note) => note.id === noteId);
      if (existingNote) {
        setTitle(existingNote.title);
        setContent(existingNote.content);
        setLabel(existingNote.label || 'Work');
      }
    }
  }, [navigate, noteId]);

  const handleSave = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    const userNotes = allNotes[currentUser] || [];

    if (noteId) {
      // Update existing note
      const updatedNotes = userNotes.map((note) =>
        note.id === noteId ? { ...note, title, content, label } : note
      );
      allNotes[currentUser] = updatedNotes;
    } else {
      // Create new note
      const newNote = {
        id: Date.now().toString(),
        title,
        content,
        label,
        lastAccessed: new Date(),
      };
      allNotes[currentUser] = [...userNotes, newNote];
    }

    localStorage.setItem('notes', JSON.stringify(allNotes));
    navigate('/dashboard');
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
      <select value={label} onChange={(e) => setLabel(e.target.value)} className="label-dropdown">
        <option value="Work">Work</option>
        <option value="Education">Education</option>
        <option value="Devices">Devices</option>
        <option value="Financial">Financial</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <button onClick={handleSave}>Save Note</button>
      <br/><br/>
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

    </div>
  );
}

export default NoteEditor;
