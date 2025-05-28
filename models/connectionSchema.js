import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  ip: {
    type: String,
    required: false,
    trim: true
  },
  port: {
    type: Number,
    required: false
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