import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTaskContext } from "../context/TaskContext";

const useDeleteTask = () => {
	const [loading, setLoading] = useState(false);
	const { tasks, setTasks } = useTaskContext();
	const deleteTask = async (taskId) => {
		try {
			setLoading(true);
			const res = await axios.delete(
				`https://taskit-1hvl.onrender.com/api/task/remove/${taskId}`,
				{ withCredentials: true }
			);
			if (res.data) {
				const filterTask = tasks.filter(
					(task) => task._id !== res.data?.data._id
				);
				setTasks(filterTask);
				toast.success("Task Deleted");
			}
		} catch (error) {
			toast.error(
				error?.response?.data || error?.message || "Something went wrong"
			);
		} finally {
			setLoading(false);
		}
	};
	return { loading, deleteTask };
};

export default useDeleteTask;
