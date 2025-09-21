import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, user: action.payload };
    case "Logout":
      return { isAuthenticated: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = async (loginDetails) => {
    const res = await fetch("http://localhost:3420/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
    });
    if (!res.ok) return console.log("Login Failed");
    const data = await res.json();
    dispatch({ type: "LOGIN", user: data.user });
    console.log(data);
    return data;
  };

  const logout = async () => {
    const res = await fetch("http://localhost:3420/logout", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: "LOGOUT" });
    // console.log(res.json());
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);
export default useAuth;
