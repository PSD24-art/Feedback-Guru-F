import useAuth from "../store/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  let username;
  if (user) {
    username = user.username.charAt(0).toUpperCase();
  }

  const handlLogOut = async () => {
    await logout();
    navigate("/login");
  };

  // Check if current path matches /faculty/:id/feedback/:subject
  const hideButtons = /^\/faculty\/[^/]+\/feedback\/[^/]+$/.test(
    location.pathname
  );

  return (
    <>
      <div className="fixed min-w-full h-13 flex justify-between items-center bg-white shadow">
        <div className="p-1 h-8 flex flex-row ms-2">Logo</div>

        {user && !hideButtons && (
          <div className="flex">
            <div className="flex h-10 me-4 justify-center border-2">
              <button onClick={handlLogOut}>Logout</button>
            </div>
            <div className="w-8 flex h-10 me-2 justify-center border-2">
              <button>{username}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
