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
        navigate("/admin");
      }
      if (data.user.role === "faculty") {
        navigate(`/faculty/${id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[calc(100dvh-53px)] mt-15">
      <div className="flex flex-col p-5">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="p-3">
          <input type="text" placeholder="Username" ref={usernameRef} />
          <br />
          <br />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <br />
          <div className="flex justify-center mt-4 p-2">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
