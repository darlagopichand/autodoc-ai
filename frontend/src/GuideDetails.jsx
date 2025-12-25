import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, MousePointer } from "lucide-react";

const GuideDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/guides/${id}`);
        setGuide(res.data.data);
      } catch (err) {
        console.error("Error", err);
      }
    };
    fetchGuide();
  }, [id]);

  if (!guide) return <div style={{padding: "20px"}}>Loading Guide...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "sans-serif" }}>
      {/* Back Button */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "5px", textDecoration: "none", color: "#666", marginBottom: "20px" }}>
        <ArrowLeft size={16} /> Back to Library
      </Link>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #eee", paddingBottom: "20px", marginBottom: "30px" }}>
        <h1 style={{ margin: "0 0 10px 0", color: "#333" }}>{guide.title}</h1>
        <p style={{ color: "#666", margin: 0 }}>{guide.description}</p>
      </div>

      {/* The Steps List */}
      <div style={{ display: "grid", gap: "30px" }}>
        {guide.steps.length === 0 ? (
          <p style={{color: "red"}}>⚠️ No steps recorded. Did you forget to refresh the page before recording?</p>
        ) : (
          guide.steps.map((step, index) => (
            <div key={index} style={{ display: "flex", gap: "20px" }}>
              {/* Step Number */}
              <div style={{ 
                minWidth: "40px", height: "40px", 
                background: "#4F46E5", color: "white", 
                borderRadius: "50%", display: "flex", 
                alignItems: "center", justifyContent: "center", 
                fontWeight: "bold" 
              }}>
                {index + 1}
              </div>

              {/* Step Content */}
              <div style={{ flex: 1, background: "#f9fafb", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <MousePointer size={16} color="#4F46E5"/>
                  Action: {step.action}
                </h3>
                <p style={{ margin: 0, color: "#4b5563" }}>
                  {step.content || `Clicked on ${step.element}`}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuideDetails;