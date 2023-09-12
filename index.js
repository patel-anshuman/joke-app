const express = require("express");
const path = require("path");
require("dotenv").config();
const { OpenAIApi, Configuration } = require("openai");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'Frontend')));

app.get("/joke", async (req, res) => {
  try {
    const { keyword } = req.query;
    const prompt = `Tell me a joke about ${keyword}`;

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY, // Use apiKey instead of key
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      engine: "gpt-3.5-turbo",
      prompt,
      max_tokens: 50,
    });

    const joke = response.choices[0].text.trim();
    res.json({ joke });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the joke." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
