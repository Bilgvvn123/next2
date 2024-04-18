"use client";

import { storage } from "@/utils/firebase";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
	const [files, setFiles] = useState([]);
	const [inputValues, setInputValues] = useState({
		title: "",
		description: "",
	});
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);

	const handleInput = (e) => {
		// setInputValues()
		setInputValues({
			...inputValues,
			[e.target.id]: e.target.value,
		});
	};

	const add = async (e) => {
		e.preventDefault();

		try {
			console.log(inputValues);
			setLoading(true);
			// server
			const res = await axios.post("/api/posts", {
				...inputValues,
			});

			if (!res.status === 200) {
				setLoading(false);
				setError(res.data.message);
				toast.error(error);
			} else {
				setLoading(false);
				toast.success("hereglegchiin post amjilttai nemgdlee");
			}
		} catch (e) {
			setLoading(false);
			toast.error("=======>", e.message);
		}

		setInputValues({ title: "", description: "" });
	};

	const handleUploadImage = () => {
		if (files.length > 0 && files.length <= 5) {
			const promises = [];
			for (let i = 0; i < files.length; i++) {
				promises[i] = storageImage(files[i]);
			}

			Promise.all(promises)
				.then((r) => console.log(r))
				.catch((e) => {
					console.log(e);
				});
		}
	};

	const storageImage = async (file) => {
		return new Promise((resolve, reject) => {
			const filename = new Date().getTime() + file.name;
			const storageRef = ref(storage, filename);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					console.log(
						`Upload is ${
							(snapshot.bytesTransferred / snapshot.totalBytes) *
							100
						}% done`
					);
				},
				(error) => {
					reject(error);
				}
			);
			resolve("Hello");
		});
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<form onSubmit={add}>
				<div className="flex gap-4">
					<label htmlFor="file">Choose file</label>
					<input
						id="file"
						type="file"
						multiple
						hidden
						onChange={(e) => {
							setFiles(e.target.files);
						}}
					/>
					<button onClick={handleUploadImage}>upload</button>
				</div>
				<br />
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
