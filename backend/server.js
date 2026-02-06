const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");

const app = express();
app.use(cors());
app.use(express.static(__dirname));
app.use("/api", uploadRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
