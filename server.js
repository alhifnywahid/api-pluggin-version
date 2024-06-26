require("dotenv").config();
require("./lib/system/config");
const express = require("express");
const cors = require("cors");
const loadRouters = require("./routers");
const connectDB = require("./config/db");
// const morgan = require("morgan");

const app = express();

// morgan.token('type', function (req, res) { return req.headers['content-type']; });

// const customFormat = ':method :url :status :response-time ms - :res[content-length]';
// app.use(morgan(customFormat));

app.set("view engine", "ejs");
app.set("views", "views");

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
