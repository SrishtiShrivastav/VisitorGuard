import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    checkInVisitor();
  }, []);

  const checkInVisitor = async () => {
    try {
      const visitorId =
        localStorage.getItem("visitor_id");

      await api.post(
         `/scan/${visitorId}`
      );
    } catch {
      console.log("Checkin error");
    }
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <h1 style={{ color: "#16a34a" }}>
          Entry Successful
        </h1>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "25px",
          }}
        >
          Visitor check-in completed successfully.
        </p>

        <button
          className="btn-primary full-btn"
          onClick={() => navigate("/")}
        >
          Back Home
        </button>
      </div>
    </div>
  );
}

export default Success;