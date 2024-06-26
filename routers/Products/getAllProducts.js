// const Product = require('../../models/Product');

exports.routes = {
	name: "GET ALL PRODUCTS",
	category: "Products",
	path: "/api/getallproducts",
	parameter: [],
	example: {},
	method: "get",
	execution: async (req, res) => {
		try {
			const products = await fetch("https://gist.githubusercontent.com/alhifnywahid/0d58fcea7f29b0a7dbb7526156189803/raw/57916552249b834c1b35804473f06fdee33615a8/blibli.json");
			const result = await products.json();
			ResponseTrue(res, result);
		} catch (err) {
			ResponseTrue(res, err.message);
		}
	},
};
