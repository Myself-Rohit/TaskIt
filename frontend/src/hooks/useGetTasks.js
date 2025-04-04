import axios from "axios";
import { useEffect, useState } from "react";

const useGetTasks = () => {
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState([]);
	const getTasks = async () => {
		try {
			setLoading(true);
			const res = await axios.get("http://localhost:4000/api/task/all", {
				withCredentials: true,
			});
			if (res.data) {
				console.log("d>>", res.data);
				setTasks(res.data.data);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getTasks();
	}, []);
	return { loading, tasks };
};

export default useGetTasks;
