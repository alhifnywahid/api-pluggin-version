const Product = require("../../models/Product");

exports.routes = {
	name: "Get All Products",
	category: "Products",
	path: "/api/products",
	parameter: [],
	example: {
		wp: "/api/products",
		nwp: "/api/products?page=1&limit=20",
	},
	method: "get",
	execution: async (req, res) => {
		try {
			if (Object.keys(req.query).length === 0) {
				const products = await Product.find();
				ResponseTrue(res, products);
			} else {
				const page = parseInt(req.query.page) || 1;
				const limit = parseInt(req.query.limit) || 20;
				const skip = (page - 1) * limit;
				const products = await Product.find().skip(skip).limit(limit);
				const total = await Product.countDocuments();
				const json = {
					total,
					page,
					totalPages: Math.ceil(total / limit),
					products,
				};
				ResponseTrue(res, json);
			}
		} catch (err) {
			ResponseTrue(res, err.message);
		}
	},
};
