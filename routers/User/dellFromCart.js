const User = require("../../models/User");

exports.routes = {
	name: "Deleted item from Cart",
	category: "User",
	path: "/api/user/cart/",
	parameter: [
		{ name: "productId", type: "string", required: true },
		{ name: "quantity", type: "number", required: false, default: 1 },
	],
	example: {
		productId: "60c72b2f4f1a2c001c8e4d68",
		quantity: 2,
	},
	method: "delete",
	execution: async (req, res) => {
		const { userId, productId } = req.body;

		try {
			const user = await User.findById(userId);
			if (!user) return ResponseFalse(res, "User dengan id tersebut tidak ditemukan!");

			const result = await User.updateOne(
				{ _id: userId },
				{ $pull: { cart: { productId } } }
			);
			ResponseTrue(res, result);
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
