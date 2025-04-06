import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTaskContext } from "../context/TaskContext";

const useCreateTask = () => {
	const [loading, setLoading] = useState(false);
	const { tasks, setTasks } = useTaskContext();
	const createTask = async (task) => {
		try {
			setLoading(true);
			const res = await axios.post(
				`https://taskit-1hvl.onrender.com/api/task/create`,
				{ task },
				{ withCredentials: true }
			);
			if (res.data) {
				console.log("create", res.data);
				setTasks([...tasks, res.data.data]);
				toast.success("Task Created");
			}
		} catch (error) {
			toast.error(
				error?.response?.data || error?.message || "failed to create task"
			);
		} finally {
			setLoading(false);
		}
	};
	return { loading, createTask };
};

export default useCreateTask;
