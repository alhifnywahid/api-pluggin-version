require("dotenv").config();
require("./lib/system/config");
const express = require("express");
const cors = require("cors");
const loadRouters = require("./routers");
const connectDB = require("./config/db");

const app = express();
app.set("view engine", "ejs");

app.get("/ejs", (req, res) => {
	res.render("index", { title: "Home Page", message: "Welcome to Express with EJS!" });
});

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

connectDB();

loadRouters(app);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
	console.log(req)
	console.error(err.stack);
	res.status(500).send('Something broke!');
});