const Product = require("../../models/Product");

exports.routes = {
	name: "Add Product",
	category: "Products",
	path: "/api/addproduct",
	parameter: [],
	example: {},
	method: "post",
	execution: async (req, res) => {
		if (!req.body) return ResponseFalse(res, "Lengkapi Body!");
		try {
			const product = new Product(req.body);
			const svProduct = await product.save();
			ResponseTrue(res, svProduct.title);
		} catch (err) {
			ResponseTrue(res, err.message);
		}
	},
};
