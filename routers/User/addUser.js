const User = require("../../models/User");

exports.routes = {
	name: "Add User",
	category: "User",
	path: "/api/user",
	parameter: ["name", "email", "password"],
	example: {
		name: "John Doe",
		email: "john@example.com",
		password: "@JohnDoe123",
	},
	method: "post",
	execution: async (req, res) => {
		const ex = await User.findOne({ email: req.body.email });
		if (ex) return ResponseFalse(res, "Email tersebut sudah terdaftar!");
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		try {
			const newUser = await user.save();
			ResponseTrue(res, newUser);
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
