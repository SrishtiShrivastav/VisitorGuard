import { useNavigate } from "react-router-dom";
import "../App.css";

function QR() {
  const navigate = useNavigate();

  const visitorId = localStorage.getItem("visitor_id");

  return (
    <div className="form-page">
      <div className="form-box">
        <h1>Your QR Pass</h1>

        {visitorId ? (
          <img
            src={`http://127.0.0.1:8000/qr/${visitorId}?t=${Date.now()}`}
            alt="QR Code"
            style={{
              width: "230px",
              height: "230px",
              display: "block",
              margin: "20px auto",
            }}
          />
        ) : (
          <p style={{ textAlign: "center" }}>
            QR not available
          </p>
        )}

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Show this QR code at office entry gate.
        </p>

        <button
          className="btn-primary full-btn"
          onClick={() => navigate("/face")}
        >
          Continue
        </button>

        <button
          className="btn-outline full-btn"
          onClick={() => navigate("/otp")}
          style={{
            color: "#111827",
            border: "1px solid #d1d5db",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default QR;