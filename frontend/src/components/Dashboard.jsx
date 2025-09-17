import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

export default function Dashboard({ entries }) {
  const sorted = [...entries].reverse();
  const labels = sorted.map((e) => new Date(e.date).toLocaleDateString());
  const calories = sorted.map((e) => e.calories);
  const sleep = sorted.map((e) => e.sleepHours);
  const workout = sorted.map((e) => e.workoutMinutes);

  const calorieTarget = 2000;
  const sleepTarget = 8;
  const workoutTarget = 60;

  const normalizedCalories = calories.map((v) => (v / calorieTarget) * 100);
  const normalizedSleep = sleep.map((v) => (v / sleepTarget) * 100);
  const normalizedWorkout = workout.map((v) => (v / workoutTarget) * 100);

  const data = {
    labels,
    datasets: [
      {
        label: "Calories (%)",
        data: normalizedCalories,
        borderColor: "red",
        tension: 0.2,
      },
      {
        label: "Sleep (%)",
        data: normalizedSleep,
        borderColor: "blue",
        tension: 0.2,
      },
      {
        label: "Workout (%)",
        data: normalizedWorkout,
        borderColor: "green",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="card">
      <h3>Trends</h3>
      <Line data={data} />
    </div>
  );
}
