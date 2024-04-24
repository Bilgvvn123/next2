import UserModel from "@/models/User";
import { connectDb } from "@/utils/connectDb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const authOptions = {
	pages: {
		signIn: "/login",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			async authorize(credentials) {
				const { email, password } = credentials;
				if (email && password) {
					const user = await login({ email, password });
					console.log("from credentials ==> ", user);
					return user;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			console.log("from callbacks => ", user);
			if (user) {
				token.id = user._id;
				token.email = user.email;
			}
			console.log("TOKEN OBJECT ====== ", token);
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.email = token.email;
			}
			return session;
		},
	},
};

async function login({ email, password }) {
	console.log("from login function ========> ", email, password);
	try {
		connectDb();
		if (email && password) {
			const existUser = await UserModel.findOne({ email }).select(
				"+password"
			);
			console.log("tuhain hereglegch baigaa? ========> ", existUser);

			if (existUser) {
				const ok = await bcrypt.compare(password, existUser.password);
				console.log("OKAY ========> ", ok);

				if (ok) return existUser;
			}
		}
	} catch (e) {
		throw new Error(e.message);
	}
}

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
