require("./lib/system/config"), require("dotenv").config(), require("./config/db")();
const express = require("express");
const cors = require("cors");
const loadRouters = require("./routers");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();
loadRouters(app);

app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/ejs", (req, res) => {
	res.render("index", { title: "Home Page", message: "Welkombek again!" });
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});
