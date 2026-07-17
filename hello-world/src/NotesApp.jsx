import { useState, useEffect } from 'react';

// Child component to show prop passing
function NoteItem({ note, onDelete, onToggle }) {
  return (
    <li style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      marginBottom: '8px',
      padding: '8px',
      border: '1px solid #eee',
      borderRadius: '4px'
    }}>
      <span 
        onClick={() => onToggle(note.id)} 
        style={{ 
          cursor: 'pointer', 
          textDecoration: note.completed ? 'line-through' : 'none',
          color: note.completed ? '#888' : 'inherit',
          flex: 1,
          textAlign: 'left'
        }}
      >
        {note.text}
      </span>
      <button onClick={() => onDelete(note.id)} style={{ marginLeft: '10px', padding: '4px 8px' }}>
        Delete
      </button>
    </li>
  );
}

// Intermediate component to show list rendering and conditional rendering
function NoteList({ notes, onDelete, onToggle }) {
  // Conditional rendering
  if (notes.length === 0) {
    return <p style={{ fontStyle: 'italic', color: '#666' }}>No notes or to-dos yet. Add one above!</p>;
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {notes.map(note => (
        // List rendering with keys
        <NoteItem 
          key={note.id} 
          note={note} 
          onDelete={onDelete} 
          onToggle={onToggle} 
        />
      ))}
    </ul>
  );
}

export default function NotesApp() {
  // Uses useState
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');

  // Uses useEffect to simulate fetching initial data or reading from local storage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react_notes_app'));
    if (savedNotes && savedNotes.length > 0) {
      setNotes(savedNotes);
    } else {
      setNotes([
        { id: 1, text: 'Learn React fundamentals', completed: true },
        { id: 2, text: 'Build a small to-do app', completed: false }
      ]);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Uses useEffect to save data whenever notes change
  useEffect(() => {
    localStorage.setItem('react_notes_app', JSON.stringify(notes));
  }, [notes]); // Runs whenever the 'notes' state changes

  const handleAddNote = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    
    const newNote = {
      id: Date.now(), // simple unique ID
      text: inputText,
      completed: false
    };
    
    setNotes([...notes, newNote]);
    setInputText('');
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleToggle = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
  };

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '20px', 
      borderRadius: '8px', 
      marginTop: '20px',
      backgroundColor: '#f9f9f9',
      color: '#333',
      maxWidth: '400px',
      margin: '20px auto'
    }}>
      <h2 style={{ marginTop: 0 }}>Notes & To-Do App</h2>
      <form onSubmit={handleAddNote} style={{ display: 'flex', marginBottom: '15px' }}>
        <input 
          type="text" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          placeholder="Add a new note..."
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '5px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
          Add
        </button>
      </form>
      <NoteList notes={notes} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}
