import axios from "axios";
import { useState } from "react";

const useDeleteTask = () => {
	const [loading, setLoading] = useState(false);
	const deleteTask = async (taskId) => {
		try {
			setLoading(true);
			const res = await axios.delete(
				`http://localhost:4000/api/task/remove/${taskId}`,
				{ withCredentials: true }
			);
			if (res.data) {
				console.log("data>>>", res.data);
			}
		} catch (error) {
			console.log("err>>", error);
		} finally {
			setLoading(false);
		}
	};
	return { loading, deleteTask };
};

export default useDeleteTask;
