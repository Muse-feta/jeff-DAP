// models/Session.js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    data: {
      presentingProblem: {
        type: String,
        required: true,
      },
      mentalStatus: {
        type: String,
        required: true,
      },
      appearance: {
        type: String,
        required: true,
      },
      interventionsUsed: {
        type: String,
        required: true,
      },
      clientResponse: {
        type: String,
        required: true,
      },
      screenerResults: {
        type: String,
      },
    },
    assessment: {
      diagnosis: {
        type: String,
        required: true,
      },
      selfHarmRisk: {
        type: String,
        enum: ["Low", "Moderate", "High"],
      },
      suicidalThoughts: {
        type: String,
        enum: ["None", "Passive", "Active"],
      },
      homicidalThoughts: {
        type: String,
        enum: ["None", "Passive", "Active"],
      },
      progress: {
        type: String,
        required: true,
      },
      goalChanges: {
        type: String,
      },
    },
    plan: {
      homework: {
        type: String,
        required: true,
      },
      referrals: {
        type: String,
      },
      takeaways: {
        type: String,
        required: true,
      },
      nextSession: {
        type: Date,
      },
    },
  },
  {
    collection: "sessions",
    timestamps: true,
  }
);

 const SessionModel = mongoose.models.Session ||
  mongoose.model("Session", sessionSchema);
export default SessionModel;