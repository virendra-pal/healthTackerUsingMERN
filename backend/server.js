// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Schema & model
const entrySchema = new mongoose.Schema({
  calories: Number,
  sleepHours: Number,
  workoutMinutes: Number,
  date: { type: Date, default: Date.now },
});
const Entry = mongoose.model("Entry", entrySchema);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});


app.get("/entries", async (req, res) => {
  const entries = await Entry.find().sort({ date: -1 });
  res.json(entries);
});

app.post("/entries", async (req, res) => {
  const entry = new Entry(req.body);
  await entry.save();
  res.json(entry);
});

app.delete("/entries/:id", async (req, res) => {
  await Entry.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));