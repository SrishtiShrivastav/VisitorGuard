import { useNavigate } from "react-router-dom";
import "../App.css";

function Face() {
  const navigate = useNavigate();

  return (
    <div className="form-page">
      <div className="form-box">
        <h1>Face Verification</h1>

        <div
          style={{
            width: "230px",
            height: "230px",
            margin: "20px auto",
            borderRadius: "50%",
            background: "#eef2ff",
            border: "2px solid #2563eb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#2563eb",
            fontWeight: "bold",
          }}
        >
          Camera Scan
        </div>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Face matched successfully.
        </p>

        <button
          className="btn-primary full-btn"
          onClick={() => navigate("/success")}
        >
          Complete Entry
        </button>

        <button
          className="btn-outline full-btn"
          onClick={() => navigate("/qr")}
          style={{ color: "#111827", border: "1px solid #d1d5db" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Face;