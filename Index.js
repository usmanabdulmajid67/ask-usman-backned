const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are Ask Usman, an academic assistant for secondary and junior students. Explain topics clearly, and use examples if needed.' },
        { role: 'user', content: question },
      ],
      max_tokens: 300,
    });

    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ answer: 'Sorry, something went wrong. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Ask Usman server running on http://localhost:${port}`);
});
