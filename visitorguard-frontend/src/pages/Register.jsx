import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import api from "../services/api";
import "../App.css";

function Register() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    purpose: "",
    person_to_meet: "",
    photo: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const capturePhoto = () => {
    const imageSrc =
      webcamRef.current.getScreenshot();

    setForm({
      ...form,
      photo: imageSrc,
    });

    alert("Photo Captured");
  };

  const submitForm = async () => {
    try {
      const res = await api.post("/register", form);

      localStorage.setItem(
        "real_otp",
        String(res.data.otp)
      );

      localStorage.setItem(
        "visitor_id",
        String(res.data.visitor_id)
      );

      navigate("/otp");
    } catch {
      alert("Backend Error");
    }
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <h1>Visitor Registration</h1>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />

        <input
          name="purpose"
          placeholder="Purpose of Visit"
          onChange={handleChange}
        />

        <input
          name="person_to_meet"
          placeholder="Person to Meet"
          onChange={handleChange}
        />

        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{
            width: "100%",
            borderRadius: "12px",
            marginTop: "10px",
          }}
        />

        <button
          className="btn-outline full-btn"
          onClick={capturePhoto}
          style={{
            color: "#111827",
            border: "1px solid #d1d5db",
            marginTop: "12px",
          }}
        >
          Capture Photo
        </button>

        <button
          className="btn-primary full-btn"
          onClick={submitForm}
        >
          Continue
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

export default Register;