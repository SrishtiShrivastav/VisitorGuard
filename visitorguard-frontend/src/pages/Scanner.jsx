import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../services/api";
import "../App.css";

function Scanner() {
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin_logged_in");

    if (admin !== "yes") {
      navigate("/login");
      return;
    }

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          const parts = decodedText.match(/\d+/);
          const visitorId = parts ? parts[0] : null;

          if (visitorId) {
            await api.post(`/scan/${visitorId}`);

            const video =
              document.querySelector("video");

            if (video) {
              const canvas =
                document.createElement("canvas");

              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;

              const ctx =
                canvas.getContext("2d");

              ctx.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height
              );

              canvas.toBlob(
                async (blob) => {
                  const formData =
                    new FormData();

                  formData.append(
                    "file",
                    blob,
                    "face.jpg"
                  );

                  await api.post(
                    `/upload-face/${visitorId}`,
                    formData
                  );
                },
                "image/jpeg"
              );
            }

            alert("Scan Successful");

            scanner.clear();

            navigate("/dashboard");
          }
        } catch {
          alert("Scan Error");
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="form-page">
      <div className="form-box">
        <h1>Secure Scanner</h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          QR Scan + Face Capture Enabled
        </p>

        <div id="reader"></div>

        <button
          className="btn-outline full-btn"
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "20px",
            color: "#111827",
            border: "1px solid #d1d5db",
          }}
        >
          Back Dashboard
        </button>
      </div>
    </div>
  );
}

export default Scanner;