const User = require("../../models/User");

exports.routes = {
	name: "GET ALL USERS",
	category: "User",
	path: "/api/user",
	parameter: [],
	example: {},
	method: "get",
	execution: async (req, res) => {
		try {
			const users = await User.find();
			ResponseTrue(res, users);
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
