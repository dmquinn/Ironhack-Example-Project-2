const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    category: {
      type: String,
      enum: ["punk", "electronic", "rockAndPop", "folk", "other"],
      required: true,
    },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    photo: { type: String, required: false },
    price: { type: Number, required: true },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
