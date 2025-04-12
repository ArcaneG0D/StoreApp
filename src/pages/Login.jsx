import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/users");
      const users = await res.json();

      const matchedUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (matchedUser) {
        setIsLoggedIn(true);
        navigate("/products");
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      alert("Login failed.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <h1 className="app-title">StoreApp</h1>
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username (e.g. johnd)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (e.g. m38rmF$)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;