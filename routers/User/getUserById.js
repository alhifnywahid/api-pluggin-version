const User = require("../../models/User");

exports.routes = {
	name: "Get User By Id",
	category: "User",
	path: "/api/user/:id",
	parameter: ["id"],
	example: {},
	method: "get",
	execution: async (req, res) => {
		if (!req.params.id) return ResponseFalse(res, "Masukkan id user!");
		try {
			const user = await User.findById(req.params.id);
			if (!user) return ResponseFalse(res, "User tidak ditemukan!");
			ResponseTrue(res, user);
		} catch (err) {
			ResponseFalse(res, "User tidak ditemukan!");
		}
	},
};
