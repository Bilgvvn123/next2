import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	name: String,
	password: String,
	email: {
		type: String,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
