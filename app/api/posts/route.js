import { connectDb } from "@/utils/connectDb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export const GET = async (req) => {
	connectDb();
	try {
		const posts = await Post.find();
		if (!posts) throw new Error("Data oldsongvi");

		return new Response(JSON.stringify(posts));
	} catch (e) {
		throw new Error(e.message);
	}
};

export const POST = async (req) => {
	try {
		const { title, description } = await req.json();
		if (!title || !description)
			throw new Error("utguudiig zaawal oruulna uu!");

		const newPost = await Post.create({ title, description });
		if (!newPost) throw new Error("nemegdsengvi");

		return new Response(JSON.stringify({ ok: true, newPost }));
	} catch (e) {
		throw new Error(e.message);
	}
};
