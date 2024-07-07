const nodemailer = require("nodemailer");

exports.routes = {
	name: "Email Subscirption",
	category: "Email",
	path: "/api/email", 
	parameter: ["subject", "to", "from", "text", "message"],
	example: {},
	method: "post",
	authorization: true,
	execution: async (req, res) => {
		const { subject, to, from, text, message } = req.body;
		if (!subject || !to || !from || !text || !message) return ResponseFalse(res, "subject, to, from, text & message harus di isi");
		try {
			const transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false,
				auth: {
					user: "akucuyyy1@gmail.com",
					pass: "gwrs stdz zsag ntot ",
				},
			});

			async function main() {
				const info = await transporter.sendMail({
					from: `${from} <akucuyyy1@gmail.com>`,
					to: to,
					subject: subject,
					text: text,
					html: message,
				});
				// console.log("Message sent: %s", info);
				ResponseTrue(res, "Email berhasil di kirim");
			}

			main().catch(console.error);
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
