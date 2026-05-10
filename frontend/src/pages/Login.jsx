import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "123456") {
      navigate("/dashboard");
    } else if (email === "user@gmail.com" && password === "123456") {
      navigate("/user");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #dbeafe, #f8fafc)",
      }}
    >
      <div
        style={{
          width: "360px",
          padding: "30px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "5px", color: "black" }}
        >
          Welcome!
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#6b7280",
          }}
        >
          Please login to continue
        </p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "94%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: "#f0f9ff",
            color: "#111827",
            outline: "none",
          }}
        />

        <div style={{ position: "relative", marginBottom: "15px" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              paddingRight: "40px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              outline: "none",
              background: "#f0f9ff",
              color: "#111827",
              boxSizing: "border-box",
            }}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "60%",
            padding: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            display: "block",
            margin: "0 auto",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
