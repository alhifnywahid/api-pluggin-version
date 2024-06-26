const User = require("../../models/User");

exports.routes = {
	name: "ADD ADDRESS",
	category: "User",
	path: "/api/user/address/:id",
	parameter: [
		{ name: "email", type: "string", required: true },
		{ name: "address", type: "object", required: true },
	],
	example: {
		email: "hifny@gmail.com",
		address: {
			kota: "Kota Contoh",
			kabupaten: "Kabupaten Contoh",
			kecamatan: "Kecamatan Contoh",
			provinsi: "Provinsi Contoh",
			kodepos: "12345",
			alamat_lengkap: "Jl. Contoh No. 1",
		},
	},
	method: "put",
	execution: async (req, res) => {
		const { id } = req.params;
		try {
			const user = await User.findById(id);
			if (!user) return ResponseFalse(res, "User dengan id tersebut tidak ditemukan!");
			user.alamat.push(req.body);
			const updatedUser = await user.save();
			ResponseTrue(res, updatedUser);
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
