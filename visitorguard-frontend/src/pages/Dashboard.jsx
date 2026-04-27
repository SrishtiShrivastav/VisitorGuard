import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    inside: 0,
    pending: 0,
    exited: 0,
    alerts: 0,
    visitors: [],
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await api.get("/dashboard");
    setStats(res.data);
  };

  const filtered = stats.visitors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <div className="logo-box">
          <div className="logo-icon">V</div>
          <h2>VisitorGuard</h2>
        </div>

        <div className="menu-section">
          <button className="side-btn active">
            Dashboard
          </button>

          <button
            className="side-btn"
            onClick={() => navigate("/scanner")}
          >
            Scanner
          </button>

          <button
            className="side-btn"
            onClick={() => navigate("/reports")}
          >
            Reports
          </button>
        </div>

        <div className="sidebar-footer">
          <p>Signed in as</p>
          <h4>admin@visitorguard.com</h4>

          <button
            className="logout-link"
            onClick={() => navigate("/")}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Visitor Monitoring Center</p>
          </div>

          <button
            className="small-btn"
            onClick={loadData}
          >
            Refresh
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p>Total</p>
            <h2>{stats.total}</h2>
          </div>

          <div className="stat-card">
            <p>Inside</p>
            <h2 className="green">{stats.inside}</h2>
          </div>

          <div className="stat-card">
            <p>Pending</p>
            <h2 className="orange">{stats.pending}</h2>
          </div>

          <div className="stat-card">
            <p>Exited</p>
            <h2>{stats.exited}</h2>
          </div>

          <div className="stat-card">
            <p>Alerts</p>
            <h2 className="red">{stats.alerts}</h2>
          </div>
        </div>

        <div className="table-box">
          <div className="table-top">
            <h2>Visitor Records</h2>

            <input
              placeholder="Search visitor..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Purpose</th>
                <th>Meet</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{v.mobile}</td>
                  <td>{v.email}</td>
                  <td>{v.purpose}</td>
                  <td>{v.person_to_meet}</td>
                  <td>{v.check_in}</td>
                  <td>{v.check_out}</td>
                  <td>{v.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;