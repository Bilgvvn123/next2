import mongoose from "mongoose";

export const connectDb = async () => {
	if (mongoose.connection.readyState >= 1) return;

	await mongoose.connect(process.env.MONGO_URI);
	console.log("Connected to db");
};
