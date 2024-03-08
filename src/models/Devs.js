import mongoose from "mongoose";

const { Schema } = mongoose;

const devSchema = new Schema(
  {
    lastName: String,
    firstName: String,
    email: { type: String, required: "un nom est obligatoire:)", unique: true },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skills",
      },
    ],
    password: { type: String },
    role: String,
    refreshToken: String,
  },
  { timestamps: true }
);

const Dev = mongoose.model("Dev", devSchema);

export default Dev;
