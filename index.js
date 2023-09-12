// app.js

const express = require('express');
require("dotenv").config();
const { OpenAIApi } = require('openai');
const cors = require("cors");


const app = express();
const port = process.env.PORT || 3000;

// Set up your OpenAI API key
const openai = new OpenAIApi({ key: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(cors());

app.get('/joke', async (req, res) => {
  try {
    const { keyword } = req.query;

    // Define the prompt for ChatGPT
    const prompt = `Tell me a joke about ${keyword}`;

    // Generate a joke using ChatGPT
    const response = await openai.createCompletion({
      engine: 'davinci',
      prompt,
      max_tokens: 50, // You can adjust the length of the response
    });

    const joke = response.choices[0].text;
    res.json({ joke });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating the joke.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});