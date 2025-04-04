import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useDeleteTask = () => {
	const [loading, setLoading] = useState(false);
	const deleteTask = async (taskId) => {
		try {
			setLoading(true);
			const res = await axios.delete(
				`https://taskit-1hvl.onrender.com/api/task/remove/${taskId}`,
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
	return { loading, deleteTask };
};

export default useDeleteTask;
