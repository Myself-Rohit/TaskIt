import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		task: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{ timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
