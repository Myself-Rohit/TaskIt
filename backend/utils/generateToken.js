import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
	try {
		const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
			expiresIn: "10d",
		});

		return token;
	} catch (error) {
		res.status(400).send(error);
	}
};

export default generateToken;
