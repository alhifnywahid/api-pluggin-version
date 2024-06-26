const scrap = require("../../lib/scrappers");

exports.routes = {
	name: "Tiktok",
	category: "Downloader",
	path: "/api/downloader/tiktok",
	parameter: ["url"],
	example: {
		url: "https://vt.tiktok.com/ZSdLbYnQ/",
	},
	method: "get",
	execution: async (req, res) => {
		if (!req.query.url) return ResponseFalse(res, "Parameter url is required!");
		try {
			const result = await scrap.downloader.tiktok(req.query.url);
			ResponseTrue(res, result);
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
