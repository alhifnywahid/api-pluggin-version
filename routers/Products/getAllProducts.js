const Product = require("../../models/Product");

exports.routes = {
	name: "Get All Products",
	category: "Products",
	path: "/api/products",
	parameter: [],
	example: {},
	method: "get",
	execution: async (req, res) => {
		try {
			const products = await Product.find()
			ResponseTrue(res, products);
		} catch (err) {
			ResponseTrue(res, err.message);
		}
	},
};
