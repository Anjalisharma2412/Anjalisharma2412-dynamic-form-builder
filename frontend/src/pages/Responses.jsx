import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Responses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResponses();
  }, [id]);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/responses/${id}`);
      setResponses(res.data);
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
          maxWidth: "760px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "6px 12px",
              background: "#f3f4f6",
              color: "#374151",
              border: "1px solid #e5e7eb",
              borderRadius: "7px",
              cursor: "pointer",
              fontSize: "13px",
              marginBottom: "1rem",
            }}
          >
            ← Back
          </button>
          <h1 style={{ margin: "0 0 4px", fontSize: "22px", color: "#111" }}>
            Responses
          </h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            {responses.length} submission{responses.length !== 1 ? "s" : ""} received
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <p style={{ color: "#6b7280" }}>Loading responses...</p>
        ) : responses.length === 0 ? (
          <div
            style={{
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#6b7280", margin: 0 }}>No responses yet</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {responses.map((response, index) => (
              <div
                key={response._id || index}
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "14px 16px",
                }}
              >
                {/* Submission Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#111",
                    }}
                  >
                    Submission #{index + 1}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                      borderRadius: "20px",
                      padding: "2px 10px",
                    }}
                  >
                    {response.submittedBy || "guest"}
                  </span>
                </div>

                {/* Response Data */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {Object.entries(response.responseData).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        gap: "8px",
                        fontSize: "13px",
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "7px",
                        padding: "8px 12px",
                      }}
                    >
                      <span style={{ color: "#6b7280", minWidth: "120px", flexShrink: 0 }}>
                        {key}
                      </span>
                      <span style={{ color: "#111", fontWeight: "500" }}>
                        {Array.isArray(value) ? value.join(", ") : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Responses;