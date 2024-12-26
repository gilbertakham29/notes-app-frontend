import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  name: string;
  email: string;
}
interface Note {
  _id: string;
  content: string;
}
const Welcome: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  console.log(notes);

  const [newNote, setNewNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      try {
        const response = await axios.get(
          "https://notes-app-api-4elh.onrender.com/api/notes/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.user);
        setNotes(response.data.notes);
      } catch (err) {
        console.error(err);
        navigate("/signin");
      }
    };
    fetchUserData();
  }, [navigate]);

  const createNote = async () => {
    if (!newNote.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://notes-app-api-4elh.onrender.com/api/notes/",
        { content: newNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);

      setNotes((prev) => [...prev, response.data]);
      setNewNote("");
    } catch (err) {
      console.error(err);
    }
  };
  const deleteNote = async (noteId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://notes-app-api-4elh.onrender.com/api/notes/${noteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-blue-600 underline text-sm"
        >
          Sign Out
        </button>
      </div>
      <div className="bg-gray-100 p-4 mt-4 rounded-md">
        <h2 className="text-lg font-semibold">
          Welcome,{user?.name || "User"}!
        </h2>
        <p className="text-sm mt-4 text-gray-600">
          Email:{user?.email || "N/A"}
        </p>
      </div>
      <div className="mt-6">
        <button
          onClick={createNote}
          className="bg-blue-600 w-full text-white px-4 py-2 rounded-md"
        >
          Create Note
        </button>
        <input
          className="w-full mt-2 px-4 py-2 border rounded-md"
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
        />
      </div>
      <div className="mt-6">
        <h3 className="text-md font-normal">Notes</h3>
        {notes.map((note) => (
          <div
            key={note._id}
            className="flex justify-between items-center bg-gray-50 p-2 mt-2 border rounded-md"
          >
            <p>{note.content}</p>
            <button
              onClick={() => deleteNote(note._id)}
              className="text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Welcome;
