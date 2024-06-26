// models/User.js
const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
	kota: {
		type: String,
		required: false,
	},
	kabupaten: {
		type: String,
		required: false,
	},
	kecamatan: {
		type: String,
		required: false,
	},
	provinsi: {
		type: String,
		required: false,
	},
	kodepos: {
		type: String,
		required: false,
	},
	alamat_lengkap: {
		type: String,
		required: false,
	},
});

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone_number: {
			type: String,
			required: false,
		},
		profile_pic: {
			type: String,
			required: false,
			default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
		},
		alamat: [AddressSchema],
		cart: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
		orders: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
		toObject: {
			virtuals: true,
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

module.exports = mongoose.model("User", UserSchema);
