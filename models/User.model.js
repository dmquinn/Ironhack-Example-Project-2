const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/djiekzsxs/image/upload/v1668954021/ironhack/usernotound_ovmdgi.png",
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
