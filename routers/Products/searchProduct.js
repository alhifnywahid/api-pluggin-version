const Product = require("../../models/Product");

exports.routes = {
	name: "Search Product",
	category: "Products",
	path: "/api/product/search",
	parameter: [],
	example: {},
	method: "get",
	execution: async (req, res) => {
		if (!req.query.q) return ResponseFalse(res, "Masukkan query product!");
		try {
			const page = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 20;
			const skip = (page - 1) * limit;
			const products = await Product.find({ title: { $regex: req.query.q, $options: 'i' } }).skip(skip).limit(limit);
			if (products.length == 0) return ResponseFalse(res, "Product tidak ditemukan!");
			const total = await Product.countDocuments({ title: { $regex: req.query.q, $options: 'i' } })
			const json = {
				total,
				page,
				totalPages: Math.ceil(total / limit),
				products,
			};
			ResponseTrue(res, json);
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
