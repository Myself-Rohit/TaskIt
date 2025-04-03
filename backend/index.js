import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import taskRoute from "./routes/task.routes.js";
const app = express();
dotenv.config();
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 4001;

connectDB().then(() => {
	console.log("Database Connected!!");
	app.listen(port, () => {
		console.log(`app is up  and running at port:${port}`);
	});
});

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);
