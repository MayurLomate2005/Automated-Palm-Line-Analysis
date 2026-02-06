import { useState } from "react";

function App() {
  const [original, setOriginal] = useState("");
  const [processed, setProcessed] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("palm", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setOriginal("http://localhost:5000/" + data.original);
    setProcessed("http://localhost:5000/" + data.processed);
    setAnalysis(data.analysis);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Automated Palm Line Analysis</h2>

      <input type="file" onChange={uploadImage} />

      <div style={{ display: "flex", marginTop: "20px", gap: "30px" }}>
        {original && (
          <div>
            <h4>Original Palm Image</h4>
            <img src={original} width="250" />
          </div>
        )}

        {processed && (
          <div>
            <h4>Detected Palm Lines</h4>
            <img src={processed} width="250" />
          </div>
        )}
      </div>

      {analysis && (
        <div style={{ marginTop: "30px" }}>
          <h3>AI-Based Palm Analysis</h3>
          <ul>
            <li><b>Life Line:</b> {analysis.lifeLine}</li>
            <li><b>Head Line:</b> {analysis.headLine}</li>
            <li><b>Heart Line:</b> {analysis.heartLine}</li>
            <li><b>Personality:</b> {analysis.personality}</li>
            <li><b>Career Insight:</b> {analysis.career}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
