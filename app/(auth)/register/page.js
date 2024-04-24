"use client";

import React from "react";
import Image from "next/image";
import axios from "axios";

const page = () => {
	const [form, setForm] = React.useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = React.useState(null);
	const [success, setSuccess] = React.useState(null);

	const resetForm = () =>
		setForm({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		});

	const handleInput = (e) => {
		setForm({
			...form,
			[e.target.id]: e.target.value,
		});

		setError(null);
	};

	const register = async (e) => {
		e.preventDefault();
		try {
			if (form.password !== form.confirmPassword)
				throw new Error("Batalgaajuulah password buruu baina!");

			const res = await axios.post("api/auth/register", form);
			if (res.status !== 201)
				throw new Error("Bvrtgel amjiltgvi bolloo!");
			setSuccess(res.data);
		} catch (e) {
			setError(e.message);
		}
		resetForm();
	};

	return (
		<div className="h-screen flex justify-center items-center">
			{success && (
				<div className="absolute top-4">{JSON.stringify(success)}</div>
			)}
			<form
				className="w-[500px] rounded-lg flex flex-col items-center py-4 shadow"
				onSubmit={register}
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
				<h1 className="mb-[35px] text-[30px] font-medium">Register</h1>
				<input
					type="text"
					id="name"
					placeholder="Enter Name"
					className="block border py-2 px-4 w-10/12 rounded-xl border-blue-700 my-4"
					onChange={handleInput}
					value={form.name}
					required
				/>
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
					type="password"
					id="confirmPassword"
					placeholder="Enter Confirm Password"
					className="block border py-2 px-4 w-10/12 rounded-xl border-blue-700 my-4"
					onChange={handleInput}
					value={form.confirmPassword}
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
