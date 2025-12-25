import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Book, ChevronRight } from "lucide-react";

function Home() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/guides");
        setGuides(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching guides:", err);
        setError("Failed to connect to the backend.");
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "30px", borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "10px", color: "#333" }}>
          <Book color="#4F46E5" size={32} />
          Clueso Library
        </h1>
        <p style={{ color: "#666" }}>Your automated documentation repository.</p>
      </header>

      {loading && <p>Loading your guides...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {!loading && guides.length === 0 && (
        <div style={{ padding: "20px", background: "#f9fafb", borderRadius: "8px" }}>
          <p>No guides found. Start recording to create one!</p>
        </div>
      )}

      <div style={{ display: "grid", gap: "15px" }}>
        {guides.map((guide) => (
          /* This Link wrapper makes the card clickable! */
          <Link 
            to={`/guide/${guide._id}`} 
            key={guide._id} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                background: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                cursor: "pointer",
                transition: "transform 0.2s"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>{guide.title}</h3>
                  <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
                    {guide.steps.length} steps • {guide.description}
                  </p>
                </div>
                <ChevronRight color="#9ca3af" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;