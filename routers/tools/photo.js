// const Product = require('../../models/Product');

exports.routes = {
	name: "Photos",
	category: "Tools",
	path: "/api/photo",
	parameter: [
		{ name: "orientation", type: "string", required: false },
		{ name: "page", type: "string", required: false },
		{ name: "search", type: "string", required: false },
	],
	example: {
		"Without Parameters": "/api/photo",
		"With Parameters": "/api/photo?orientation=landscape&page=1&search=cat",
	},
	method: "get",
	execution: async (req, res) => {
		try {
			// orientation = landscape || square || portrait || panoramic
			fetch(`https://www.freepik.com/api/regular/search?filters[ai-generated][only]=1&filters[content_type]=photo&filters[orientation]=${req.query.orientation || "square"}&locale=en&page=${req.query.page || 1}&term=${req.query.search || "random"}`)
				.then((e) => e.json())
				.then((e) => {
					let data = [];
					e.items.forEach((item) => {
						data.push(item.preview.url);
					});
					ResponseTrue(res, data);
				})
				.catch((err) => {
					ResponseFalse(res, err.message);
				});
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
