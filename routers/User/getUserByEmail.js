const User = require("../../models/User");

exports.routes = {
	name: "Get User By Email",
	category: "User",
	path: "/api/user/:email",
	parameter: ["email"],
	example: {},
	method: "get",
	execution: async (req, res) => { 
		if (!req.params.email) return ResponseFalse(res, "Email harus diisi!");
		try {
			const user = await User.findOne({ email: req.params.email });
			if (!user) return ResponseFalse(res, "User tidak ditemukan!");
			ResponseTrue(res, user.id);
		} catch (err) {
			ResponseFalse(res, "User tidak ditemukan!");
		}
	},
};
