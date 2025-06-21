const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 9876;
const WINDOW_SIZE = 10;
let windowState = [];

const API_MAP = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand',
};

const AUTH_BODY = {
  email: "midhumala04@gmail.com",
  name: "midhuna r",
  rollNo: "22bcs063",
  accessCode: "WcTSKv",
  clientID: "dc2bbeb8-cc31-4595-becd-fb02d59434fd",
  clientSecret: "xsxFBczGqhJVKbdz",
};

const AVERAGE_API_URL = 'http://20.244.56.144/evaluation-service';
let accessToken = "";

async function fetchToken() {
  try {
    const response = await axios.post(`${AVERAGE_API_URL}/auth`, AUTH_BODY);
    accessToken = response.data.access_token;
    console.log("Token fetched successfully");
  } catch (err) {
    console.error("Failed to fetch token:", err.message);
  }
}

// Fetch token initially
fetchToken();

app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;
  const endpoint = API_MAP[type];

  if (!endpoint) {
    return res.status(400).json({ error: 'Invalid number type' });
  }

  const url = `${AVERAGE_API_URL}/${endpoint}`;

  try {
    const result = await axios.get(url, {
      timeout: 500,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const newNumbers = result.data.numbers.filter(
      (num) => !windowState.includes(num)
    );

    const updatedWindow = [...windowState, ...newNumbers].slice(-WINDOW_SIZE);
    const avg =
      updatedWindow.length > 0
        ? updatedWindow.reduce((sum, num) => sum + num, 0) / updatedWindow.length
        : 0;

    const response = {
      windowPrevState: [...windowState],
      windowCurrState: updatedWindow,
      numbers: result.data.numbers,
      avg: avg.toFixed(2),
    };

    windowState = updatedWindow;
    res.json(response);
  } catch (error) {
    res.json({
      windowPrevState: [...windowState],
      windowCurrState: [...windowState],
      numbers: [],
      avg:
        windowState.length > 0
          ? (windowState.reduce((sum, num) => sum + num, 0) / windowState.length).toFixed(2)
          : '0.00',
      error: 'Request timed out or failed'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
