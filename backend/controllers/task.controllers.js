import Task from "../models/task.model.js";
import User from "../models/user.model.js";
export const createTask = async (req, res) => {
	try {
		const { task } = req.body;
		const userId = req.user._id;
		if (!task) {
			throw new Error("You cannot add empty task!");
		}
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found!");
		}
		const newTask = new Task({
			userId,
			task,
		});
		await newTask.save();
		res.status(201).json({ message: "Task Created", data: newTask });
	} catch (error) {
		res.status(400).send(error.message);
	}
};

export const getTasks = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found!");
		}
		const allTasks = await Task.find({ userId });
		if (!allTasks) {
			throw new Error("No task found!");
		}
		res.status(200).json({ message: "Task Created", data: allTasks });
	} catch (error) {
		res.status(400).send(error.message);
	}
};
