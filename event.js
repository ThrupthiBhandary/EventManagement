const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); 

const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));


const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: String, required: true },
  ticketType: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);


app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: "All event bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving bookings", error: error.message });
  }
});


app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, event, ticketType } = req.body;
    if (!name || !email || !event) {
      return res.status(400).json({ message: "Please provide name, email, and event details" });
    }

    const newBooking = await Booking.create({ name, email, event, ticketType });
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
});


app.get("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving booking", error: error.message });
  }
});


app.put("/api/bookings/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error: error.message });
  }
});


app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
});


app.get("/api/bookings/search", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email query parameter required" });

    const bookings = await Booking.find({ email: { $regex: email, $options: "i" } });
    if (bookings.length === 0)
      return res.status(404).json({ message: "No bookings found for this email" });

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ message: "Error searching bookings", error: error.message });
  }
});


app.get("/api/bookings/filter", async (req, res) => {
  try {
    const { event } = req.query;
    if (!event) return res.status(400).json({ message: "Event query parameter required" });

    const bookings = await Booking.find({ event: { $regex: event, $options: "i" } });
    if (bookings.length === 0)
      return res.status(404).json({ message: "No bookings found for this event" });

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ message: "Error filtering bookings", error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Synergia Event Booking API running on port ${PORT}`);
});
