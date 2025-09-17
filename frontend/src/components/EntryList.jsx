export default function EntryList({ entries, onDelete }) {
  return (
    <div className="card">
      <h3>All Entries</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Calories</th>
            <th>Sleep</th>
            <th>Workout</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e._id || e.date}>
              <td>{new Date(e.date).toLocaleString()}</td>
              <td>{e.calories}</td>
              <td>{e.sleepHours}</td>
              <td>{e.workoutMinutes}</td>
              <td>{<button onClick={() => onDelete(e._id)}>Delete</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
