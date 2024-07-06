require("./lib/system/config"), require("dotenv").config(), require("./config/db")();
const express = require("express");
const cors = require("cors");
const loadRouters = require("./routers");
const apikey = require("./middleware/authApiKey");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

// app.use(apikey);

loadRouters(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Sepertinya ada kesalahan!");
});
