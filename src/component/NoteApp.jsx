import React, { useState, useEffect } from "react";

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addOrUpdateNote = () => {
    if (title.trim() === "" || content.trim() === "") return;
    if (editingIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === editingIndex ? { title, content } : note
      );
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, { title, content }]);
    }
    setTitle("");
    setContent("");
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    setTitle(notes[index].title);
    setContent(notes[index].content);
    setEditingIndex(index);
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center p-6 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-300 text-gray-900 "
      }`}
    >
      <h1 className="text-4xl font-bold mb-18">Note Taking App</h1>

      <div className="mb-4 p-4 border border-gray-300 rounded w-full max-w-2xl bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 border border-gray-400 p-2 rounded w-full bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100"
        />
        <textarea
          placeholder="Write note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-2 border border-gray-400 p-2 rounded w-full bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100"
        />
        <button
          onClick={addOrUpdateNote}
          className="bg-blue-500 text-white px-4 py-2 rounded bg-gradient-to-r from-red-400 to-purple-500 hover:from-blue-600 hover:to-purple-600 "
        >
          {editingIndex !== null ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="space-y-4 w-full max-w-2xl">
        {notes.map((note, index) => (
          <div
            key={index}
            className="p-4 border border-gray-400 rounded bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          >
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="mb-2">{note.content}</p>
            <button
              onClick={() => editNote(index)}
              className="bg-yellow-500 text-white px-4 py-1 rounded mr-2 bg-gradient-to-r from-red-400 to-purple-500 hover:from-blue-600 hover:to-purple-600 "
            >
              Edit
            </button>
            <button
              onClick={() => deleteNote(index)}
              className="bg-red-500 text-white px-4 py-1 rounded bg-gradient-to-r from-red-400 to-purple-500 hover:from-blue-600 hover:to-purple-600  "
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-6 h-12 w-12 rounded-lg p-2 hover:bg-gray-400 dark:hover:bg-gray-700 duration-150"
      >
        {darkMode ? (
          <svg className="fill-yellow-400" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
          </svg>
        ) : (
          <svg className="fill-blue-600" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default NoteApp;
