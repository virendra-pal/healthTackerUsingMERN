import { useState } from "react";

export default function AddEntry({ onAdd }) {
  const [calories, setCalories] = useState("");
  const [sleep, setSleep] = useState("");
  const [workout, setWorkout] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!calories && !sleep && !workout) return;
    onAdd({
      calories: Number(calories) || 0,
      sleepHours: Number(sleep) || 0,
      workoutMinutes: Number(workout) || 0,
      date: new Date(),
    });
    setCalories("");
    setSleep("");
    setWorkout("");
  };

  return (
    <form onSubmit={submit} className="card">
      <h3>Add Entry</h3>
      <input type="number" placeholder="Calories" value={calories} onChange={e=>setCalories(e.target.value)} />
      <input type="number" placeholder="Sleep (hours)" value={sleep} onChange={e=>setSleep(e.target.value)} />
      <input type="number" placeholder="Workout (mins)" value={workout} onChange={e=>setWorkout(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
