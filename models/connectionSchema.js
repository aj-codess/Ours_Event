import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  socket_id: {
    type: String,
    required: true,
    trim: true
  },
  ip: {
    type: String,
    required: true,
    trim: true
  },
  port: {
    type: Number,
    required: true
  },
  connected_at: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Connection = mongoose.model("Connection", connectionSchema);

export default Connection;