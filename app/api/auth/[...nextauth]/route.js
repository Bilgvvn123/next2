import UserModel from "@/models/User";
import { connectDb } from "@/utils/connectDb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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

export const authOptions = {
	pages: {
		signIn: "/login",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials;
				try {
					if (email && password) {
						const user = await login({ email, password });
						console.log("from credentials ==> ", user);
						return user;
					}
				} catch (e) {
					console.log("E R R O R ", e);
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
