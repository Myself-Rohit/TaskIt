import { useState } from "react";
import useGetTasks from "../hooks/useGetTasks.js";
import useCreateTask from "../hooks/useCreateTask.js";

function TodosPage() {
	const { tasks } = useGetTasks();
	const { createTask } = useCreateTask();
	const [newTask, setNewTask] = useState("");
	const handleAddTask = () => {
		createTask(newTask.trim());
		window.location.reload();
	};

	return (
		<div className="min-h-screen  bg-gray-800 text-white flex flex-col items-center p-6">
			<h1 className="text-3xl font-bold flex items-center gap-2">
				<span className="border border-white p-1">✔</span> TODO
			</h1>
			<div className="bg-gray-800 p-6 mt-6 rounded-lg w-full max-w-md">
				<div className="flex justify-between items-center mb-4 border border-white p-6 rounded-lg">
					<div>
						<h2 className="text-3xl font-semibold">Task Done</h2>
						<p className="text-sm text-gray-400">Keep it up</p>
					</div>
					<div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-lg font-bold">
						{1}/{5}
					</div>
				</div>
				<div className="flex gap-2 mb-4">
					<input
						type="text"
						placeholder="Write your next task"
						className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<button
						onClick={handleAddTask}
						className="bg-green-600 p-3 rounded-lg hover:bg-green-500"
					>
						+
					</button>
				</div>
				<div className="space-y-2  max-h-72 overflow-auto">
					{tasks &&
						tasks.map((task) => (
							<div
								key={task?._id}
								className="flex justify-between items-center p-3 border border-gray-700 rounded-lg"
							>
								<div className="flex items-center gap-2">
									<div
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
								<div className="flex gap-2">
									<span className="cursor-pointer hover:text-yellow-400">
										Edit
									</span>
									<span className="cursor-pointer hover:text-red-500">Del</span>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default TodosPage;
