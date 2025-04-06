import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const useLogout = () => {
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();
	const logout = async () => {
		try {
			const res = await axios.get(
				`https://taskit-1hvl.onrender.com/api/auth/signout`,
				{
					withCredentials: true,
				}
			);

			if (res.data) {
				localStorage.removeItem("user");
				setAuthUser(null);
				navigate("/auth");
			}
		} catch (error) {
			toast.error(
				error?.response?.data || error?.message || "failed to logout"
			);
		}
	};
	return { logout };
};
export default useLogout;
