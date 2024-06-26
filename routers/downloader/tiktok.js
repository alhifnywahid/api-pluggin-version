const scrap = require("../../lib/scrappers");

exports.routes = {
	name: "Tiktok",
	category: "Downloader",
	path: "/api/tiktok",
	parameter: ["url"],
	example: {
		url: "https://vt.tiktok.com/ZSdLbYnQ/",
	},
	method: "get",
	execution: async (req, res) => {
		if (!req.query.url) return res.status(401).json({ status: false, creator: global.creator, msg: "Url tidak boleh kosong!" });
		try {
			const result = await scrap.downloader.tiktok(req.query.url);
			res.status(200).json({ status: true, creator: global.creator, data: result });
		} catch (err) {
			res.status(500).json({ status: false, creator: global.creator, msg: err.message });
		}
	},
};
