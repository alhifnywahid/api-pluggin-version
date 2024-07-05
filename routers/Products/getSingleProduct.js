const Product = require("../../models/Product");

exports.routes = {
	name: "Get Single Product",
	category: "Products",
	path: "/api/product/id/",
	parameter: [],
	example: {},
	method: "get",
	execution: async (req, res) => {
		if (!req.params.id) return ResponseFalse(res, "Masukkan id product!");
		try {
			const product = await Product.findById(req.params.id);
			if (!product) return ResponseFalse(res, "Product tidak ditemukan!");
			ResponseTrue(res, product);
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
