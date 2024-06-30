const mongoose = require("mongoose");

const SpecificationSchema = new mongoose.Schema({
	besaran_pk: { type: String, required: false, default: " - " },
	teknologi_ac: { type: String, required: false, default: " - " },
	konsumsi_daya: { type: String, required: false, default: " - " },
	dimensi_produk: { type: String, required: false, default: " - " },
	berat: { type: String, required: false, default: " - " },
	kelengkapan_paket: { type: String, required: false, default: " - " },
	nomor_pendaftaran_barang: { type: String, required: false, default: " - " },
	nomor_sertifikat_sni: { type: String, required: false, default: " - " },
	lain_lain: { type: String, required: false, default: " - " },
});

const Product = new mongoose.Schema({
	title: { type: String, required: true },
	brand: { type: String, required: true },
	category: { type: String, required: true },
	price: { type: Number, required: true },
	image: { type: [String], required: true },
	specification: { type: SpecificationSchema, required: true },
});

module.exports = mongoose.model("Product", Product);
