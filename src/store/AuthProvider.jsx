import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuthenticated: !!storedUser,
  user: storedUser || null,
};
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      fetch("http://localhost:3420/me", { credentials: "include" })
        .then((res) => {
          if (!res.ok) throw new Error("Session invalid");
          return res.json();
        })
        .then(() => {
          dispatch({ type: "LOGIN", payload: user });
        })
        .catch(() => {
          dispatch({ type: "LOGOUT" });
        });
    }
  }, []);
  const login = async (loginDetails) => {
    const res = await fetch("http://localhost:3420/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
    });
    if (!res.ok) return console.log("Login Failed");
    const data = await res.json();
    dispatch({ type: "LOGIN", payload: data.user });
    console.log(data);
    return data;
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:3420/logout", {
        method: "GET",
        credentials: "include",
      });
    } catch (err) {
      console.error("Server logout failed, but clearing local state anyway");
    }
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);
export default useAuth;
