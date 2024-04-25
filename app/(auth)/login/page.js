"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
	const [form, setForm] = React.useState({
		email: "",
		password: "",
	});
	const [error, setError] = React.useState(null);
	const router = useRouter();

	const resetForm = () =>
		setForm({
			email: "",
			password: "",
		});

	const handleInput = (e) => {
		setForm({
			...form,
			[e.target.id]: e.target.value,
		});

		setError(null);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			if (!form.email || !form.password)
				throw new Error("Ta talbaraa bvren buglunu vv!");
			await signIn("credentials", form);
			router.replace("/");
		} catch (e) {
			console.log(e);
		}
		resetForm();
	};

	return (
		<div className="h-screen flex justify-center items-center">
			<form
				className="w-[500px] rounded-lg flex flex-col items-center py-4 shadow"
				onSubmit={handleLogin}
			>
				<Image
					src={
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrnyM1X7uSYEnPMaWhICpliqIEP6E4olt341fVqfckoA&s"
					}
					height={60}
					width={60}
					className="mt-[45px] mb-[20px]"
					alt="logo"
				/>
				<h1 className="mb-[35px] text-[30px] font-medium">Login</h1>
				<input
					type="email"
					id="email"
					placeholder="Enter Email"
					className="block border py-2 px-4 w-10/12 rounded-xl border-blue-700 my-4"
					onChange={handleInput}
					value={form.email}
					required
				/>
				<input
					type="password"
					id="password"
					placeholder="Enter Password"
					className="block border py-2 px-4 w-10/12 rounded-xl border-blue-700 my-4"
					onChange={handleInput}
					value={form.password}
					required
				/>
				<input
					type="submit"
					value={"Register"}
					className="py-3 px-8 mt-4 mb-6 bg-blue-700 w-10/12 text-white rounded-lg transition-all duration-300 hover:bg-blue-800"
				/>
				{error && (
					<div className="bg-red-700 text-yellow-200 py-2 px-4">
						{error}
					</div>
				)}
			</form>
		</div>
	);
};

export default page;
