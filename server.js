require('dotenv').config();
require('./lib/system/config');
const express = require('express');
const cors = require("cors");
const loadRouters = require('./routers');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

connectDB();

loadRouters(app);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
