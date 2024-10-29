// models/Client.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Non-Binary", "Other"],
      required: true,
    },
    referralSource: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "clients",
    timestamps: true,
  }
);

const ClientModel = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default ClientModel;
