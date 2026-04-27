import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "80px 60px"
    }}>
      
      {/* Left Content */}
      <div style={{ maxWidth: "520px" }}>
        <h1 style={{
          fontSize: "48px",
          fontWeight: "700",
          marginBottom: "20px",
          lineHeight: "1.2"
        }}>
          Smart Visitor <br /> Management System
        </h1>

        <p style={{
          marginBottom: "25px",
          color: "#666",
          fontSize: "16px"
        }}>
          Secure, fast and modern way to manage visitors in your organization.
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "14px 26px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Get Started
        </button>
      </div>

      {/* Right Image Placeholder */}
      <div style={{
        width: "420px",
        height: "320px",
        background: "#f5f5f5",
        borderRadius: "12px"
      }}>
      </div>

    </section>
  );
}

export default Hero;