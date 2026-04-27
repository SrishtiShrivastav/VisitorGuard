import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
  try {
    const res = await api.post("/login", {
      email,
      password,
    });

    if (res.data.success) {
      localStorage.setItem("admin_logged_in", "yes");
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  } catch (error) {
    alert("Backend Error");
  }
};

  return (
    <div className="form-page">
      <div className="form-box">
        <h1>Admin Login</h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn-primary full-btn"
          onClick={loginUser}
        >
          Login
        </button>

        <button
          className="btn-outline full-btn"
          onClick={() => navigate("/")}
          style={{
            color: "#111827",
            border: "1px solid #d1d5db",
          }}
        >
          Back Home
        </button>
      </div>
    </div>
  );
}

export default Login;