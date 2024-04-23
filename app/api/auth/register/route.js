import UserModel from "@/models/User";
import { connectDb } from "@/utils/connectDb";
import bcrypt from "bcrypt";

export const POST = async (req) => {
	try {
		const { name, email, password, confirmPassword } = await req.json();
		connectDb();

		if (!name || !email || !password || !confirmPassword)
			throw new Error("Talbaruudaa bvren buglunu vv!");

		if (password !== confirmPassword)
			throw new Error("Batalgaajuulah password buruu baina!");

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = await UserModel.create({
			name,
			email,
			password: hashedPassword,
		});

		if (!newUser)
			return new Response(
				JSON.stringify({
					ErrorMessage:
						"Hereglegchiig bvrtgej cadsangvi. Ta dahin oroldono uu",
				}),
				{ status: 400 }
			);

		return new Response(JSON.stringify(newUser), { status: 201 });
	} catch (e) {
		return new Response(
			JSON.stringify({
				ErrorMessage: e.message,
			}),
			{
				status: 400,
			}
		);
	}
};
