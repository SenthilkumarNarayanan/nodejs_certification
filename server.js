const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/files", (req, res) => {
    try {
        const filenames = JSON.parse(
            fs.readFileSync("filenames.txt", "utf-8")
        );

        const result = filenames.map(name => {
            const content = fs.readFileSync(
                path.join("files", name),
                "utf-8"
            );

            return {
                filename: name,
                content: content
            };
        });

        res.json(result);

    } catch (err) {
        res.status(500).json({ error: "Failed to read files" });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});