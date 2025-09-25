import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/AuthProvider";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const data = await login({ username, password });
      const id = data.user.id;
      if (data.user.role === "admin") {
        navigate(`/admin/${id}`);
      }
      if (data.user.role === "faculty") {
        navigate(`/faculty/${id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-15 flex justify-center items-center w-full h-[calc(100dvh-53px)] bg-orange-50 flex-col">
      <div className="mb-4 text-2xl font-bold text-orange-500">
        Welcome back!
      </div>
      <div className="bg-white border-2 border-orange-300 shadow-lg rounded-xl flex flex-col p-6 w-full max-w-sm">
        <h2 className="mb-4 pb-2 border-b-2 border-orange-300 text-orange-600 text-2xl font-bold text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              ref={usernameRef}
              id="username"
              className="w-full border-2 border-orange-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              id="password"
              className="w-full border-2 border-orange-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-orange-400 text-white font-semibold py-2 rounded-lg shadow-md active:scale-95 hover:bg-orange-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
