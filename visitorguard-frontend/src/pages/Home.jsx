import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <nav className="top-nav">
        <h2>VisitorGuard</h2>

        <div className="nav-buttons">
          <button
            className="btn-outline"
            onClick={() => navigate("/login")}
          >
            Admin Login
          </button>

          <button
            className="btn-primary"
            onClick={() => navigate("/register")}
          >
            Visitor Registration
          </button>
        </div>
      </nav>

      <div className="hero-section">
        <p className="tag">Enterprise Security Platform</p>

        <h1>
          Smart Visitor Management
          <br />
          for Modern Workplaces
        </h1>

        <p className="subtext">
          Secure registration, OTP verification, QR access,
          facial recognition and real-time monitoring in one system.
        </p>

        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => navigate("/register")}
          >
            Register Visit
          </button>

          <button
            className="btn-outline"
            onClick={() => navigate("/login")}
          >
            Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;