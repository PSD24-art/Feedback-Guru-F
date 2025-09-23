import useAuth from "../store/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  console.log(isAuthenticated);
  let username;
  if (user) {
    username = user.username.charAt(0).toUpperCase();
  }
  const handlLogOut = async () => {
    console.log("before logout");
    await logout();
    console.log("after logout");
    navigate("/login");
  };

  return (
    <>
      <div className="fixed min-w-full h-13 flex justify-between items-center">
        <div className="p-1 h-8 flex flex-row ms-2">Logo</div>
        {!isAuthenticated && <Navigate to="/login" replace />}
        {user && (
          <div className="flex">
            <div className=" flex h-10 me-4 justify-center border-2">
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
