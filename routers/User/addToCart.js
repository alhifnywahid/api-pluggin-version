const User = require("../../models/User");

exports.routes = {
	name: "Add to Cart",
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
	method: "put",
	execution: async (req, res) => {
		const { userId, productId, quantity } = req.body;

		try {
			const user = await User.findById(userId);
			if (!user) return ResponseFalse(res, "User dengan id tersebut tidak ditemukan!");

			const cartItem = user.cart.find(item => item.productId.toString() === productId);

			if (cartItem) {
				cartItem.quantity += quantity;
			} else {
				user.cart.push({ productId, quantity });
			}

			const updatedUser = await user.save();
			ResponseTrue(res, updatedUser);
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
