function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      borderBottom: "1px solid #eee"
    }}>
      <h2>VisitorGuard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;