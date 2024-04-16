import React from "react";
import Link from "next/link";

const notFound = () => {
	return (
		<div>
			not-found <Link href="/">Home</Link>
		</div>
	);
};

export default notFound;
