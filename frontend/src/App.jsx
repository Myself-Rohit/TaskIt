import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import TodosPage from "./pages/TodosPage";
import Auth from "./pages/Auth";
import { useAuthContext } from "./context/AuthContext";
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
		</BrowserRouter>
	);
}

export default App;
