const User = require("../../models/User");

exports.routes = {
	name: "GET USER BY ID",
	category: "User",
	path: "/api/user/:id",
	parameter: ["id"],
	example: {},
	method: "get",
	execution: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			if (!user) return ResponseFalse(res, "User tidak ditemukan!");
			// ResponseTrue(res, user);
			ResponseTrue(res, user);
		} catch (err) {
			ResponseFalse(res, "User tidak ditemukan!");
		}
	},
};
