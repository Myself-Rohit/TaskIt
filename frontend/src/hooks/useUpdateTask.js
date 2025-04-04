import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useUpdateTask = () => {
	const [loading, setLoading] = useState(false);
	const updateTask = async (taskId, task, completed) => {
		try {
			setLoading(true);
			const res = await axios.patch(
				`http://localhost:4000/api/task/edit/${taskId}`,
				{ task, completed },
				{ withCredentials: true }
			);
			if (res.data) {
				window.location.reload();
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
