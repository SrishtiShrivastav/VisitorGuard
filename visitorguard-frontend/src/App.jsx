import { Routes, Route } from "react-router-dom";
import Scanner from "./pages/Scanner";
import Home from "./pages/Home";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import QR from "./pages/QR";
import Face from "./pages/Face";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/qr" element={<QR />} />
      <Route path="/face" element={<Face />} />
      <Route path="/success" element={<Success />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/scanner" element={<Scanner />} />
    </Routes>
  );
}

export default App;