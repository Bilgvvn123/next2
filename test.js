const axios = require("axios");

// Promise
const promise = new Promise((resolve, reject) => {
	const a = Math.random() * 25;

	if (a > 20) resolve(a);

	reject("cadsangvi");
});

promise.then((r) => console.log(r)).catch((e) => console.log(e));

const res = axios.get("https://jsonplaceholder.typicode.com/posts");
res.then((r) => console.log(r)).catch(e);

const fetchData = async () => {
	try {
		const res = await axios.get(
			"https://jsonplaceholder.typicode.com/posts"
		);
		console.log(res.data);
	} catch (e) {}
};
fetchData();
