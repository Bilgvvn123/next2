import { Schema, model, models } from "mongoose";

const PostSchema = Schema(
	{
		title: String,
		description: String,
		createdUser: String,
		imageUrls: [],
	},
	{ timestamps: true }
);

const PostModel = models.Post || model("Post", PostSchema);
export default PostModel;
