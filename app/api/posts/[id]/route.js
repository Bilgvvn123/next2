export const GET = (req, { params }) => {
	return new Response(JSON.stringify({ title: "title123", _id: params.id }), {
		status: 200,
	});
};
