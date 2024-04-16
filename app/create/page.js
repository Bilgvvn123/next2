"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
	const currentUser = localStorage["loggedInUser"];

	const [inputValues, setInputValues] = useState({
		title: "",
		description: "",
	});
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);

	const handleInput = (e) => {
		// setInputValues()
		console.log(e.target.id);
		setInputValues({
			...inputValues,
			[e.target.id]: e.target.value,
		});
		console.log(inputValues);
	};

	const add = async (e) => {
		e.preventDefault();
		setInputValues({ title: "", description: "" });

		try {
			setLoading(true);
			const res = await axios.post("/api/posts", {
				...inputValues,
				createdUser: currentUser,
			});
			console.log(res);
			if (!res.status === 200) {
				setLoading(false);
				setError(res.data.message);
				toast.error(error);
			} else {
				toast.success(
					currentUser +
						" id-tai hereglegchiin post amjilttai nemgdlee"
				);
				setLoading(false);
			}
		} catch (e) {
			setLoading(false);
			toast.error(e.message);
		}
	};

	return (
		<div>
			<form onSubmit={add}>
				<input
					type="text"
					id="title"
					placeholder="title - 1"
					value={inputValues.title}
					required
					onChange={handleInput}
				/>
				<input
					type="text"
					id="description"
					placeholder="description - 1"
					value={inputValues.description}
					required
					onChange={handleInput}
				/>
				<button
					type="submit"
					disabled={loading}
					className={`${
						loading ? "bg-gray-500 text-white" : "bg-red-600"
					}`}
				>
					{loading ? "adding" : "add"}
				</button>
			</form>
		</div>
	);
};

export default page;
