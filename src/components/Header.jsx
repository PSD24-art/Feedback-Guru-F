import useAuth from "../store/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  let username;
  if (user) {
    username = user.username.charAt(0).toUpperCase();
  }

  const handlLogOut = async () => {
    const confirmed = confirm("Are you sure want to log out");
    if (!confirmed) return;
    await logout();
    navigate("/login");
  };

  // Check if current path matches /faculty/:id/feedback/:subject
  const hideButtons = /^\/faculty\/[^/]+\/feedback\/[^/]+$/.test(
    location.pathname
  );

  return (
    <>
      <div className="bg-orange-400 fixed top-0 min-w-full h-15 flex justify-between items-center shadow">
        <div className="text-3xl text-black p-1 flex flex-row ms-2 great-vibes-regular">
          feedback_guru
        </div>

        {user && !hideButtons && (
          <div className="flex">
            <button
              onClick={handlLogOut}
              className="flex items-center gap-2 h-10 me-4 justify-center px-4 text-white font-semibold rounded-lg shadow-md active:scale-95 bg-orange-600 hover:bg-orange-700 transition duration-200"
            >
              Logout
              <LogOut className="w-5 h-5" />
            </button>

            <div className="w-10 text-2xl flex h-10 me-2 justify-center items-center rounded-full transition duration-200 text-white shadow-lg bg-pink-500">
              <button>{username}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
