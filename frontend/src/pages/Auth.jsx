import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
const Auth = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isSignIn, setIsSignIn] = useState(true);
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`https://taskit-1hvl.onrender.com/api/auth/${
					isSignIn ? "signin" : "signup"
				}`,
				{ username, password },
				{ withCredentials: true }
			);

			if (res.data) {
				localStorage.setItem("user", JSON.stringify(res.data));
				setAuthUser(res.data);
				navigate("/");
			}
		} catch (error) {
			toast.error(
				error?.response?.data || error?.message || "failed to Signin"
			);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6"
		>
			<h1 className="text-3xl font-bold">{isSignIn ? "Sign In" : "Sign Up"}</h1>
			<div className="bg-gray-800 p-6 mt-6 rounded-lg w-full max-w-md shadow-lg">
				<div className="flex flex-col gap-4">
					<div className="flex items-center bg-gray-900 p-2 rounded-lg border border-gray-700">
						<input
							type="username"
							placeholder="username"
							className="flex-1 bg-transparent focus:outline-none text-white"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="flex items-center bg-gray-900 p-2 rounded-lg border border-gray-700">
						<input
							type="password"
							placeholder="Password"
							className="flex-1 bg-transparent focus:outline-none text-white"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button className="bg-green-600 p-3 rounded-lg hover:bg-green-500 w-full text-center font-semibold">
						{isSignIn ? "Sign In" : "Sign Up"}
					</button>
					<p className="text-gray-400 text-sm text-center mt-2">
						{isSignIn ? "Don't have an account? " : "Already have an account? "}
						<span
							onClick={() => setIsSignIn(!isSignIn)}
							className="text-green-500 cursor-pointer"
						>
							{isSignIn ? "Sign Up" : "Sign In"}
						</span>
					</p>
				</div>
			</div>
		</form>
	);
};
export default Auth;
