function App() {
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("palm", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Automated Palm Line Analysis</h2>
      <p>Select your palm image:</p>
      <input type="file" onChange={uploadImage} />
    </div>
  );
}

export default App;
