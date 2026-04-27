import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../services/api";
import "../App.css";

function Reports() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    total: 0,
    inside: 0,
    exited: 0,
    pending: 0,
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const res = await api.get("/reports");
    setData(res.data);
  };

  const chartData = [
    { name: "Total", value: data.total },
    { name: "Inside", value: data.inside },
    { name: "Exited", value: data.exited },
    { name: "Pending", value: data.pending },
  ];

  const exportCSV = () => {
    const rows = [
      ["Type", "Count"],
      ["Total", data.total],
      ["Inside", data.inside],
      ["Exited", data.exited],
      ["Pending", data.pending],
    ];

    const csv =
      rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "visitor_report.csv";
    a.click();
  };

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <div className="logo-box">
          <div className="logo-icon">V</div>
          <h2>VisitorGuard</h2>
        </div>

        <div className="menu-section">
          <button
            className="side-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="side-btn"
            onClick={() => navigate("/scanner")}
          >
            Scanner
          </button>

          <button className="side-btn active">
            Reports
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="topbar">
          <div>
            <h1>Reports</h1>
            <p>Visitor Analytics</p>
          </div>

          <button
            className="small-btn"
            onClick={exportCSV}
          >
            Export CSV
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p>Total</p>
            <h2>{data.total}</h2>
          </div>

          <div className="stat-card">
            <p>Inside</p>
            <h2>{data.inside}</h2>
          </div>

          <div className="stat-card">
            <p>Exited</p>
            <h2>{data.exited}</h2>
          </div>

          <div className="stat-card">
            <p>Pending</p>
            <h2>{data.pending}</h2>
          </div>
        </div>

        <div className="table-box">
          <h2>Visitor Status Chart</h2>

          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;