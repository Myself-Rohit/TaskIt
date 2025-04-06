import { createContext, useContext, useState } from "react";

export const TaskContext = createContext(null);

export const useTaskContext = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error(
			"useTaskContext must be used within an TaskContextProvider"
		);
	}
	return context;
};

export const TaskContextProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);
	return (
		<TaskContext.Provider value={{ tasks, setTasks }}>
			{children}
		</TaskContext.Provider>
	);
};
