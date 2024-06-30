const User = require("../../models/User");

exports.routes = {
	name: "User Login",
	category: "User",
	path: "/api/user/login",
	parameter: ["email"],
	example: {},
	method: "post",
	execution: async (req, res) => {
		console.log(req.body);
		if (!req.body.email) return ResponseFalse(res, "Email harus diisi!");
		if (!req.body.password) return ResponseFalse(res, "Password harus diisi!");
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) return ResponseFalse(res, "User tidak ditemukan!");
			if (user.password !== req.body.password) return ResponseFalse(res, "Password salah!");
			ResponseTrue(res, user.id);
		} catch (err) {
			ResponseFalse(res, "User tidak ditemukan!");
		}
	},
};
