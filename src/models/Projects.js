import mongoose, { now } from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dev",
      },
    ],
  },
  { timestamps: true }
);

const projectModel = mongoose.model("projects", projectSchema);

export default projectModel;
