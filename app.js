const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = 3000;

dotenv.config();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/github.com/:username", async (req, res) => {
    const username = req.params.username;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    try {
        const response = await fetch(`https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`);
        const data = await response.json();
        res.json(data);
    }
    catch(error) {
        res.send(error.message);
    }
});

app.get("/github.com/:username/repos", async (req, res) => {
    const username = req.params.username;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?client_id=${clientId}&client_secret=${clientSecret}`);
        const data = await response.json();
        res.json(data);
    }
    catch(error) {
        res.send(error.message);
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));