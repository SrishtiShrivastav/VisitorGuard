function Features() {
  return (
    <section style={{ padding: "60px 40px" }}>
      
      <h2 style={{
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "32px"
      }}>
        Features
      </h2>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap"
      }}>

        {[
          {
            title: "Visitor Check-in",
            desc: "Quick and secure visitor registration system."
          },
          {
            title: "Real-time Tracking",
            desc: "Track visitors inside your premises easily."
          },
          {
            title: "Secure Data",
            desc: "Your visitor data is safe and encrypted."
          }
        ].map((item, index) => (
          <div key={index} style={{
            width: "260px",
            padding: "25px",
            borderRadius: "12px",
            background: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            transition: "0.3s"
          }}>
            <h3 style={{ marginBottom: "10px" }}>
              {item.title}
            </h3>

            <p style={{ color: "#666", fontSize: "14px" }}>
              {item.desc}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;