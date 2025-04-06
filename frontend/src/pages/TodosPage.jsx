import { useEffect, useState } from "react";
import useGetTasks from "../hooks/useGetTasks.js";
import useCreateTask from "../hooks/useCreateTask.js";
import useUpdateTask from "../hooks/useUpdateTask.js";
import useDeleteTask from "../hooks/useDeleteTask.js";
import useLogout from "../hooks/useLogout.js";

function TodosPage() {
	const { tasks } = useGetTasks();
	const { createTask } = useCreateTask();
	const { updateTask } = useUpdateTask();
	const { deleteTask } = useDeleteTask();
	const [newTask, setNewTask] = useState("");
	const [taskId, setTaskId] = useState("");
	const [isAddBtn, setIsAddBtn] = useState(true);
	const [completedTasks, setCompletedTasks] = useState(0);
	const { logout } = useLogout();

	useEffect(() => {
		if (tasks) {
			const filterTask = tasks?.filter((task) => task?.completed);
			setCompletedTasks(filterTask.length);
		}
	}, [tasks]);

	const handleAddTask = (e) => {
		e.preventDefault();
		createTask(newTask.trim());
		setNewTask("");
	};
	const handleEditTask = (e, taskId, task, completed) => {
		e.preventDefault();
		updateTask(taskId, task.trim(), completed);
		setNewTask("");
		setTaskId("");
		setIsAddBtn(true);
	};
	const getTaskToEdit = (taskId, task) => {
		setNewTask(task);
		setIsAddBtn(false);
		setTaskId(taskId);
	};

	const handleDeleteTask = (taskId) => {
		deleteTask(taskId);
	};

	const handleLogout = async () => {
		logout();
	};

	return (
		<div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-6">
			<div className="flex items-center justify-center space-x-44">
				<h1 className="text-3xl font-bold flex items-center gap-2">
					<span className="border border-white p-1">✔</span> TODO
				</h1>
				<button
					className="rounded-lg px-3 py-2 bg-green-500"
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
			<div className="bg-gray-800 p-6 mt-6 rounded-lg w-full max-w-md">
				<div className="flex justify-between items-center mb-4 border border-white p-6 rounded-lg">
					<div>
						<h2 className="text-3xl font-semibold">Task Done</h2>
						<p className="text-sm text-gray-400">Keep it up</p>
					</div>
					<div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-lg font-bold">
						{completedTasks}/{tasks?.length}
					</div>
				</div>
				<form
					onSubmit={
						isAddBtn
							? handleAddTask
							: (e) => handleEditTask(e, taskId, newTask, false)
					}
					className="flex gap-2 mb-4"
				>
					<input
						type="text"
						placeholder="Write your next task"
						className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<button
						className={`rounded-lg px-3 ${
							isAddBtn
								? " bg-green-600 hover:bg-green-500 font-semibold"
								: " bg-yellow-600 hover:bg-yellow-500 "
						}`}
					>
						{isAddBtn ? "+" : "update"}
					</button>
				</form>
				<div
					className="space-y-2 max-h-72 overflow-auto [&::-webkit-scrollbar]:[width:2px]
            [&::-webkit-scrollbar-thumb]:bg-gray-500
            "
				>
					{tasks &&
						tasks.map((task) => (
							<div
								key={task?._id}
								className="flex justify-between items-center p-3 border border-gray-700 rounded-lg "
							>
								<div className="flex items-center gap-2">
									<div
										onClick={(e) =>
											handleEditTask(e, task._id, task.task, !task?.completed)
										}
										className={`w-4 h-4 rounded-full cursor-pointer ${
											task.completed ? "bg-green-500" : "border border-gray-500"
										}`}
									></div>
									<span
										className={
											task.completed ? "line-through text-gray-500" : ""
										}
									>
										{task?.task}
									</span>
								</div>
								<div className="flex gap-3">
									<span
										className="cursor-pointer hover:text-yellow-400"
										onClick={() => getTaskToEdit(task?._id, task?.task)}
									>
										<img
											className="w-6 duration-200 hover:scale-110"
											src="https://cdn-icons-png.flaticon.com/128/10573/10573603.png"
											alt="Edit"
										/>
									</span>
									<span
										onClick={() => handleDeleteTask(task._id)}
										className="cursor-pointer hover:text-red-500"
									>
										<img
											className="w-6 duration-200 hover:scale-110"
											src="https://cdn-icons-png.flaticon.com/128/16118/16118818.png"
											alt="delete"
										/>
									</span>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default TodosPage;
