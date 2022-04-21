import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    todoDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    completed: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", TodoSchema);
