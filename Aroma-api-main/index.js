require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

mongoose.connect("mongodb://localhost:27017/User")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const user = await UserModel.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.password !== password) { // Note: In production, use bcrypt for password hashing
            return res.status(401).json({ error: "Incorrect password" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const history = req.body.history || [];  // Get history from request

        const chatSession = model.startChat({
            generationConfig,
            history: history, // Use the provided history
        });

        const result = await chatSession.sendMessage(userMessage);

        res.json({ response: result.response.text(), history: history });
    } catch (error) {
        console.error("Error in /api/chat:", error.stack); // Log the full error stack trace!
        res.status(500).json({ error: error.message }); // Send the error message to the frontend
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
