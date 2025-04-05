import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useCreateTask = () => {
	const [loading, setLoading] = useState(false);
	const createTask = async (task) => {
		try {
			setLoading(true);
			const res = await axios.post(
				`https://taskit-1hvl.onrender.com/api/task/create`,
				{ task },
				{ withCredentials: true }
			);
			if (res.data) {
				window.location.reload();
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
