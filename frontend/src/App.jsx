import { useState, useEffect } from "react";
import AddEntry from "./components/AddEntry";
import EntryList from "./components/EntryList";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/entries")
      .then((res) => res.json())
      .then(setEntries)
      .catch(console.error);
  }, []);

  const addEntry = async (entry) => {
    const res = await fetch("http://localhost:5000/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    const newEntry = await res.json();
    setEntries(prev => [newEntry, ...prev]);
  };

  const removeEntry = async (id) => {
    await fetch(`http://localhost:5000/entries/${id}`, { method: "DELETE" });
    setEntries(prev => prev.filter(e => e._id !== id));
  };

  return (
    <div className="container">
      <h1>Health Tracker</h1>
      <AddEntry onAdd={addEntry} />
      <Dashboard entries={entries} />
      <EntryList entries={entries} onDelete={removeEntry} />
    </div>
  );
}