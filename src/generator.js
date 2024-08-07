export function generateRandomData(numRoutes) {
	const data = [];
	for (let i = 1; i <= numRoutes; i++) {
		data.push({
			route: `Route ${i}`,
			trips: Math.floor(Math.random() * 200) + 50,
			distance: Math.floor(Math.random() * 500) + 50,
			duration: (Math.random() * 4 + 1).toFixed(1),
			items: Math.floor(Math.random() * 2000) + 500,
		});
	}
	return data;
}
