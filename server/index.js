import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/api.js";
import dotenv from "dotenv";
import parseDocument from "./util/parseDocument.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
mongoose
	.connect(process.env.DB, { useNewUrlParser: true })
	.then(() => {
		console.log(`Database connected successfully`);
	})
	.catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

//handle cors related issues
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(bodyParser.json());
app.use("/api", routes);
app.use((err, req, res, next) => {
	console.log(err);
	next();
});
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
