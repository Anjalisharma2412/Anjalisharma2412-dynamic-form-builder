import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/forms");
      setForms(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#f3f4f6",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "2rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          padding: "2rem 2rem 2.5rem",
          boxSizing: "border-box",
        }}
      >

        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: "0 0 4px", fontSize: "22px", color: "#111" }}>
            User Dashboard
          </h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            Available forms for you to fill
          </p>
        </div>

        {loading ? (
          <p style={{ color: "#6b7280" }}>Loading forms...</p>
        ) : forms.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No forms available</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            {forms.map((form) => (
              <div
                key={form._id}
                style={{
                  background: "#f9fafb",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h3 style={{ margin: "0 0 6px", color: "#111" }}>{form.title}</h3>
                <p style={{ color: "#6b7280", margin: "0 0 12px", fontSize: "13px" }}>
                  {form.description}
                </p>
                <button
                  onClick={() => navigate(`/form/${form._id}`)}
                  style={{
                    padding: "6px 14px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Fill Form
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;