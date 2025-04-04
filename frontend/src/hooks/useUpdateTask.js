import axios from "axios";
import { useState } from "react";

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
				console.log("data>>>", res.data);
			}
		} catch (error) {
			console.log("err>>", error);
		} finally {
			setLoading(false);
		}
	};
	return { loading, updateTask };
};

export default useUpdateTask;
