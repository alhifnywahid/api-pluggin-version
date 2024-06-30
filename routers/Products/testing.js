const Product = require("../../models/Product");

exports.routes = {
	name: "testing",
	category: "Products",
	path: "/api/testing",
	parameter: [],
	example: {},
	method: "get",
	execution: async (req, res) => {
		try {
			ResponseTrue(res, { one: req.query.page, two: req.query.limit });
			// const products = await Product.find()
			// ResponseTrue(res, products);
		} catch (err) {
			ResponseTrue(res, err.message);
		}
	},
};
