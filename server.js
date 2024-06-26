require('dotenv').config();
const express = require('express');
const loadRouters = require('./routers');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

connectDB();

loadRouters(app);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
