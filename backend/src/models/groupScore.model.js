import mongoose from "mongoose";

const groupScoreSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    totalSolved: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const GroupScore = mongoose.model("GroupScore", groupScoreSchema);