import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import TodosPage from "./pages/TodosPage";
import Auth from "./pages/Auth";
import { useAuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
function App() {
	const { authUser } = useAuthContext();

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={authUser ? <TodosPage /> : <Navigate to={"/auth"} />}
				/>
				<Route path="/auth" element={<Auth />} />
			</Routes>
			<ToastContainer position="top-right" autoClose={2006} draggable />
		</BrowserRouter>
	);
}

export default App;
