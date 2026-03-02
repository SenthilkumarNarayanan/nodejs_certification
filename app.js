const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// ✅ SAME path as yargs file
const RECORD_FILE = path.join(__dirname, "recordfiles.txt");

app.get("/files", (req, res) => {
  try {
    if (!fs.existsSync(RECORD_FILE)) {
      return res.json([]);
    }

    const data = fs.readFileSync(RECORD_FILE, "utf-8");
    res.json(JSON.parse(data));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to read files" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});