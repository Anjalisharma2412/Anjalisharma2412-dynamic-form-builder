import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [view, setView] = useState("dashboard");

  const [forms, setForms] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);

  const [themeConfig] = useState({
    primaryColor: "#2563eb",
    font: "Arial",
    layout: "single-column",
  });

  const fetchForms = async () => {
    try {
      setLoadingForms(true);
      const res = await axios.get("http://localhost:5000/api/forms");
      setForms(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingForms(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const openCreateView = () => {
    setTitle("");
    setDescription("");
    setFields([]);
    setView("create");
  };

  const openDashboard = async () => {
    await fetchForms();
    setView("dashboard");
  };


  const deleteForm = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/forms/${id}`);
      fetchForms();
    } catch (err) {
      console.log(err);
    }
  };

  const addField = (type) => {
    setFields((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        label: `${type} field`,
        fieldType: type,
        placeholder: `Enter ${type}`,
        required: false,
        options:
          type === "dropdown" || type === "checkbox" || type === "radio"
            ? ["Option 1", "Option 2"]
            : [],
      },
    ]);
  };

  const updateLabel = (id, value) =>
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, label: value } : f))
    );

  const deleteField = (id) =>
    setFields((prev) => prev.filter((f) => f.id !== id));

  const updateOption = (fieldId, index, value) =>
    setFields((prev) =>
      prev.map((f) =>
        f.id === fieldId
          ? { ...f, options: f.options.map((opt, i) => (i === index ? value : opt)) }
          : f
      )
    );

  const addOption = (fieldId) =>
    setFields((prev) =>
      prev.map((f) =>
        f.id === fieldId
          ? { ...f, options: [...f.options, `Option ${f.options.length + 1}`] }
          : f
      )
    );

  const deleteOption = (fieldId, index) =>
    setFields((prev) =>
      prev.map((f) =>
        f.id === fieldId
          ? { ...f, options: f.options.filter((_, i) => i !== index) }
          : f
      )
    );


  const saveForm = async () => {
    try {
      await axios.post("http://localhost:5000/api/forms", {
        title,
        description,
        themeConfig,
        fields,
      });
      await fetchForms();      
      setView("dashboard");   
    } catch (err) {
      console.log(err);
      alert("Error saving form");
    }
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

  const fieldTypeBtn = (color) => ({
    padding: "7px 14px",
    background: color,
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "13px",
  });


  if (view === "dashboard") {
    return (
      <div style={pageWrapper}>
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
              Admin Dashboard
            </h1>
            <p style={{ margin: "0 0 1rem", color: "#6b7280", fontSize: "14px" }}>
              Manage your dynamic forms
            </p>
            <button
              onClick={openCreateView}
              style={{
                padding: "10px 15px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              + Create New Form
            </button>
          </div>

          {loadingForms ? (
            <p style={{ color: "#6b7280" }}>Loading forms...</p>
          ) : forms.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No forms found</p>
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
                  <div style={{ display: "flex", gap: "8px" }}>
                   <Link to={`/form/${form._id}?role=admin`}>
                      <button style={{ padding: "6px 10px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
                        Open
                      </button>
                    </Link>
                    <Link to={`/responses/${form._id}`}>
                      <button style={{ padding: "6px 10px", background: "#6366f1", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
                        Responses
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteForm(form._id)}
                      style={{ padding: "6px 10px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
          <button
            onClick={openDashboard}
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
          <div>
            <h1 style={{ margin: "0 0 2px", fontSize: "22px", color: "#111" }}>Create Form</h1>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "13px" }}>
              Add fields and save your dynamic form
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Form Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Form Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "14px 16px",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ margin: "0 0 10px", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
            Add Field
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button style={fieldTypeBtn("#2563eb")} onClick={() => addField("text")}>+ Text</button>
            <button style={fieldTypeBtn("#7c3aed")} onClick={() => addField("dropdown")}>+ Dropdown</button>
            <button style={fieldTypeBtn("#0891b2")} onClick={() => addField("checkbox")}>+ Checkbox</button>
            <button style={fieldTypeBtn("#059669")} onClick={() => addField("radio")}>+ Radio</button>
          </div>
        </div>

        {fields.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "1.5rem" }}>
            {fields.map((field) => (
              <div
                key={field.id}
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "14px 16px",
                }}
              >
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
                  <input
                    value={field.label}
                    onChange={(e) => updateLabel(field.id, e.target.value)}
                    style={{ ...inputStyle, fontWeight: "500" }}
                  />
                  <button
                    onClick={() => deleteField(field.id)}
                    style={{ padding: "7px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "7px", cursor: "pointer", fontSize: "13px", whiteSpace: "nowrap" }}
                  >
                    Delete
                  </button>
                </div>

                {field.fieldType === "text" && (
                  <input placeholder={field.placeholder} style={{ ...inputStyle, background: "white" }} disabled />
                )}

                {(field.fieldType === "dropdown" || field.fieldType === "checkbox" || field.fieldType === "radio") && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {field.fieldType === "dropdown" && (
                      <select style={{ ...inputStyle, background: "white" }}>
                        {field.options.map((opt, i) => <option key={i}>{opt}</option>)}
                      </select>
                    )}
                    {field.options.map((opt, i) => (
                      <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        {field.fieldType === "checkbox" && <input type="checkbox" disabled />}
                        {field.fieldType === "radio" && <input type="radio" name={field.id} disabled />}
                        <input
                          value={opt}
                          onChange={(e) => updateOption(field.id, i, e.target.value)}
                          style={{ ...inputStyle, background: "white" }}
                        />
                        <button
                          onClick={() => deleteOption(field.id, i)}
                          style={{ padding: "7px 10px", background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "7px", cursor: "pointer", fontSize: "13px" }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addOption(field.id)}
                      style={{ alignSelf: "flex-start", padding: "6px 12px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "7px", cursor: "pointer", fontSize: "13px" }}
                    >
                      + Add Option
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1.25rem" }}>
          <button
            onClick={saveForm}
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
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;