import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetTasks = () => {
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState([]);
	const getTasks = async () => {
		try {
			setLoading(true);
			const res = await axios.get(
				"https://taskit-1hvl.onrender.com/api/task/all",
				{
					withCredentials: true,
				}
			);
			if (res.data) {
				setTasks(res.data.data);
			}
		} catch (error) {
			toast.error(error?.response?.data || error.message);
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
