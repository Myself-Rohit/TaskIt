import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(400).send("Token not found!");
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { _id } = decoded;
		const user = await User.findById(_id);
		if (!user) {
			return res.status(400).send("User not found!");
		}
		req.user = user;
		next();
	} catch (error) {
		res.status(400).send(error);
	}
};
export default verifyToken;
