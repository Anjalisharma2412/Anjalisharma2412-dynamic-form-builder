import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function FillForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // URL mein ?role=admin hai toh admin hai
  const isAdmin = new URLSearchParams(location.search).get("role") === "admin";

  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/forms/${id}`);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (label, value) => {
    setResponses((prev) => ({ ...prev, [label]: value }));
  };

  const submitForm = async () => {
    try {
      await axios.post("http://localhost:5000/api/responses", {
        formId: id,
        submittedBy: "guest",
        responseData: responses,
      });
      setResponses({});
      setSubmitted(true);
    } catch (err) {
      console.log(err);
      alert("Submission failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    background: "#f9fafb",
    color: "#111",
  };

  const pageWrapper = {
    minHeight: "100vh",
    width: "100vw",
    background: "#f3f4f6",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "2rem 1rem",
    boxSizing: "border-box",
  };

  // Loading state
  if (!form) {
    return (
      <div style={pageWrapper}>
        <div
          style={{
            width: "100%",
            maxWidth: "680px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            padding: "2rem",
            boxSizing: "border-box",
          }}
        >
          <p style={{ color: "#6b7280" }}>Loading form...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (submitted) {
    return (
      <div style={pageWrapper}>
        <div
          style={{
            width: "100%",
            maxWidth: "680px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            padding: "2rem",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#d1fae5",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "24px",
            }}
          >
            ✓
          </div>
          <h2 style={{ margin: "0 0 8px", color: "#111", fontSize: "20px" }}>
            Response Submitted!
          </h2>
          <p style={{ color: "#6b7280", margin: "0 0 1.5rem", fontSize: "14px" }}>
            Your response has been recorded successfully.
          </p>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "9px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
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
              }}
            >
              ← Back
            </button>

            {/* Admin badge */}
            {isAdmin && (
              <span
                style={{
                  fontSize: "12px",
                  background: "#fef3c7",
                  color: "#92400e",
                  border: "1px solid #fde68a",
                  borderRadius: "20px",
                  padding: "3px 10px",
                }}
              >
                Preview Mode
              </span>
            )}
          </div>

          <h1 style={{ margin: "0 0 4px", fontSize: "22px", color: "#111" }}>
            {form.title}
          </h1>
          {form.description && (
            <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
              {form.description}
            </p>
          )}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {form.fields.map((field) => (
            <div
              key={field.id}
              style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "14px 16px",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#111",
                }}
              >
                {field.label}
              </p>

              {/* Text */}
              {field.fieldType === "text" && (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={responses[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                  style={{ ...inputStyle, background: "white" }}
                  disabled={isAdmin}
                />
              )}

              {/* Dropdown */}
              {field.fieldType === "dropdown" && (
                <select
                  value={responses[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                  style={{ ...inputStyle, background: "white" }}
                  disabled={isAdmin}
                >
                  <option value="">Select an option</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              )}

              {/* Checkbox */}
              {field.fieldType === "checkbox" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {field.options.map((opt, i) => (
                    <label
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "#374151",
                        cursor: isAdmin ? "default" : "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        disabled={isAdmin}
                        checked={responses[field.label]?.includes(opt) || false}
                        onChange={(e) => {
                          const prev = responses[field.label] || [];
                          handleChange(
                            field.label,
                            e.target.checked
                              ? [...prev, opt]
                              : prev.filter((x) => x !== opt)
                          );
                        }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {/* Radio */}
              {field.fieldType === "radio" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {field.options.map((opt, i) => (
                    <label
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "#374151",
                        cursor: isAdmin ? "default" : "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name={field.id}
                        disabled={isAdmin}
                        checked={responses[field.label] === opt}
                        onChange={() => handleChange(field.label, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button — admin ko nahi dikhega */}
        {!isAdmin && (
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1.25rem", marginTop: "1.5rem" }}>
            <button
              onClick={submitForm}
              style={{
                width: "100%",
                padding: "11px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "9px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              Submit Response
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FillForm;