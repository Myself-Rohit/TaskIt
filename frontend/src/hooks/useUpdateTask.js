import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTaskContext } from "../context/TaskContext";

const useUpdateTask = () => {
	const [loading, setLoading] = useState(false);
	const { tasks, setTasks } = useTaskContext();
	const updateTask = async (taskId, task, completed) => {
		try {
			setLoading(true);
			const res = await axios.patch(
				`https://taskit-1hvl.onrender.com/api/task/edit/${taskId}`,
				{ task, completed },
				{ withCredentials: true }
			);
			if (res.data) {
				const updatedTasks = tasks.map((task) => {
					if (task._id == res.data?.data._id) {
						return res.data.data;
					}
					return task;
				});
				setTasks(updatedTasks);
				toast.success("Task updated");
			}
		} catch (error) {
			toast.error(
				error?.response?.data || error?.message || "Something went wrong"
			);
		} finally {
			setLoading(false);
		}
	};
	return { loading, updateTask };
};

export default useUpdateTask;
