// server/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // required for POST

// CONNECT TO MONGO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✔ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// SCHEMA + MODEL
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  capacity: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  image: { type: String, default: "" } // Optional image URL
});

const Event = mongoose.model("Event", eventSchema);

// ROUTES =================================================

// TEST route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// GET all events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE event
app.post("/api/events", async (req, res) => {
  try {
    const { title, date, capacity, image } = req.body;

    if (!title || !date || !capacity) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newEvent = await Event.create({
      title,
      date,
      capacity,
      image: image || "" 
    });

    res.status(201).json(newEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE event
app.put("/api/events/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID or Server error" });
  }
});

// DELETE event
app.delete("/api/events/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: "Invalid ID or Server error" });
  }
});

// BUY TICKET
app.post("/api/events/:id/buy", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.ticketsSold >= event.capacity) {
      return res.status(400).json({ error: "Event is full" });
    }

    event.ticketsSold += 1;
    await event.save();

    res.json({ message: "Ticket purchased", event });
  } catch (err) {
    res.status(500).json({ error: "Invalid ID or Server error" });
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
