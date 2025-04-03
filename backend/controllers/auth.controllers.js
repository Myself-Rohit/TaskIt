import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			throw new Error("All fields are required!");
		}

		const isUser = await User.findOne({ username });
		if (isUser) {
			throw new Error("User already exist!");
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const user = new User({
			username,
			password: passwordHash,
		});
		await user.save();
		const { password: pass, ...rest } = user._doc;

		const token = await generateToken(res, user._id);
		res.cookie("token", token, { secure: true, httpOnly: true });
		res
			.status(201)
			.json({ message: "Account created sucessfully!", data: rest });
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const signin = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			throw new Error("All fields are required!");
		}
		const user = await User.findOne({ username });
		if (!user) {
			throw new Error("User not found");
		}

		const comparePassword = await bcrypt.compare(password, user.password);
		if (!comparePassword) {
			throw new Error("Invalid credentials!");
		}
		const { password: pass, ...rest } = user._doc;

		const token = await generateToken(res, user._id);
		res.cookie("token", token, { secure: true, httpOnly: true });
		res.status(200).send(rest);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const signout = async (req, res) => {
	try {
		res.cookie("token", null, { expiresIn: Date.now() });
		res.status(200).send("Logout successfully!");
	} catch (error) {
		console.log("error:", error);
		res.status(400).send("ERROR : " + error);
	}
};
