import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function OTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const verifyOTP = () => {
    const savedOTP = localStorage.getItem("real_otp");

    if (otp.trim() === savedOTP?.trim()) {
      alert("OTP Verified Successfully");
      navigate("/qr");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <h1>OTP Verification</h1>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Enter OTP sent to your registered email
        </p>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          className="btn-primary full-btn"
          onClick={verifyOTP}
        >
          Verify OTP
        </button>

        <button
          className="btn-outline full-btn"
          onClick={() => navigate("/register")}
          style={{ color: "#111827", border: "1px solid #d1d5db" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default OTP;