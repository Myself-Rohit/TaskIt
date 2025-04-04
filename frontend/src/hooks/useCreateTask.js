import axios from "axios";
import { useState } from "react";

const useCreateTask = () => {
	const [loading, setLoading] = useState(false);
	const createTask = async (task) => {
		try {
			setLoading(true);
			const res = await axios.post(
				`http://localhost:4000/api/task/create`,
				{ task },
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
	return { loading, createTask };
};

export default useCreateTask;
