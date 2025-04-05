import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import taskRoute from "./routes/task.routes.js";
import path from "path";

const app = express();
dotenv.config();
app.use(
	cors({
		origin: "https://taskit-1hvl.onrender.com",
		methods: ["GET", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 4001;
const __dirname = path.resolve();

connectDB().then(() => {
	console.log("Database Connected!!");
	app.listen(port, () => {
		console.log(`app is up  and running at port:${port}`);
	});
});

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get(/^\/(?!api).*/, (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
